import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, forkJoin, from, map, Observable } from 'rxjs';
import { collection, Firestore, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'; // If you're using the modular SDK
import * as _ from 'lodash';
import { groupBy, sumBy } from 'lodash';
import { subDays } from 'date-fns';



interface GroupedData {
  [key: string]: number; // This allows indexing by category name
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db: Firestore; // Declare db
  usercode: string | null;

  public canaccess: BehaviorSubject<boolean> = new BehaviorSubject(false)

  emitcanaccess() {
    return this.canaccess
  }
  public getcurrentbalance: BehaviorSubject<any> = new BehaviorSubject('')


  emitbalance() {
    return this.getcurrentbalance.asObservable(); // Return an observable for subscriptions
  }

  // Fetch the balance and update the BehaviorSubject
  updatebalance() {
    // console.log('Updating balance in service');

    this.getBalance().subscribe({
      next: (val: any) => {
        this.getcurrentbalance.next(val); // Update the BehaviorSubject value
      },
      error: (err) => {
        console.error('Error getting balance:', err);
      }
    });
  }

  constructor(private firestore: AngularFirestore) {
    this.usercode = localStorage.getItem('usercode');
    this.db = getFirestore(); // Use the modular SDK approach

  }
  adduser(data: any) {
    return this.firestore.collection('UserList').add(data);
  }

  getAllusers(user: any, key: any): Observable<any[]> {
    const citiesRef = collection(this.db, "UserList");
    const q = query(
      citiesRef,
      where("key", "==", key),
      where("usercode", "==", user),
      // where("matgroup", "!=", "Liability Get"),
      // where("matgroup", "not-in", ["Investment", "Liability Give", "Liability Get"]),
      // orderBy("dateentry", "asc")
    );
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map(doc => {
          const data: any = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getAllItems(): Observable<any[]> {
    return this.firestore.collection('SpendList', ref =>
      ref)
      .snapshotChanges();
  }
  getAllAllocation(): Observable<any[]> {
    const citiesRef = collection(this.db, "AllocationList");
    const q = query(
      citiesRef,
      // where("matgroup", "!=", "Investment"),
      // where("matgroup", "!=", "Liability Give"),
      // where("matgroup", "!=", "Liability Get"),
      // where("matgroup", "not-in", ["Investment", "Liability Give", "Liability Get"]),
      // where("usercode", "==", this.usercode),
      // orderBy("dateentry", "asc")
    );
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map(doc => {
          const data: any = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
      })
    );
  }

  dataentry(data: any) {
    return this.firestore.collection('SpendList').add({ ...data, datecr: new Date(), usercode: this.usercode });

  }
  Loandataentry(data: any) {
    return this.firestore.collection('CCRepayList').add({ ...data, datecr: new Date(), usercode: this.usercode });

  }

  LendDataentry(data: any) {
    return this.firestore.collection('CCLendList').add({ ...data, datecr: new Date(), usercode: this.usercode });

  }

  creditdataentry(data: any) {
    return from(this.firestore.collection('CreditList').add({ ...data, datecr: new Date(), usercode: this.usercode }));
  }
  getAllCCrepayItems(): Observable<any[]> {
    const citiesRef = collection(this.db, "CCRepayList");
    const q = query(
      citiesRef,
      // where("matgroup", "!=", "Investment"),
      // where("matgroup", "!=", "Liability Give"),
      // where("matgroup", "!=", "Liability Get"),
      // where("matgroup", "not-in", ["Investment", "Liability Give", "Liability Get"]),
      where("usercode", "==", this.usercode),
      orderBy("dateentry", "asc")
    );
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map(doc => {
          const data: any = doc.data();
          const id = doc.id;
          return { id, ...data, date: this.formatDate(new Date(data.dateentry?.seconds * 1000)) };
        });
      })
    );
  }

  getAllspendItems(): Observable<any[]> {
    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        where("matgroup", "not-in", ['Liability Give', 'Liability Get', 'Investment']),
        where("usercode", "==", this.usercode)
      );

      return from(getDocs(q)).pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data: any = doc.data();
            const id = doc.id;
            return {
              id,
              ...data,
              date: this.formatDate(new Date(data.dateentry?.seconds * 1000)) // Store as Date object
            };
          });
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => {
        const combinedResults = results.flat(); // Flatten the array of results

        // Group by date (only keep the date part)
        const groupedByDate = groupBy(combinedResults, item => item.date);

        // Sum matprice for each group
        const summedResults = Object.entries(groupedByDate).map(([date, items]) => {
          return {
            date,
            matprice: sumBy(items, 'matprice') // Sum matprice for the grouped items
          };
        });

        // Sort by date
        summedResults.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return summedResults;
      })
    );
  }


  getAllspendItemsforbalance(): Observable<any[]> {
    const collections = ['SpendList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        where("matgroup", "not-in", ['Liability Give', 'Liability Get', 'Investment']),
        where("usercode", "==", this.usercode)
      );

      return from(getDocs(q)).pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data: any = doc.data();
            const id = doc.id;
            return {
              id,
              ...data,
              date: this.formatDate(new Date(data.dateentry?.seconds * 1000)) // Store as Date object
            };
          });
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => {
        const combinedResults = results.flat(); // Flatten the array of results

        // Group by date (only keep the date part)
        const groupedByDate = groupBy(combinedResults, item => item.date);

        // Sum matprice for each group
        const summedResults = Object.entries(groupedByDate).map(([date, items]) => {
          return {
            date,
            matprice: sumBy(items, 'matprice') // Sum matprice for the grouped items
          };
        });

        // Sort by date
        summedResults.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return summedResults;
      })
    );
  }




  getAllspendItemsgrid(): Observable<any[]> {
    const collections = ['SpendList', 'CCLendList', 'CreditList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        // where("matgroup", "==", groupname),
        where("usercode", "==", this.usercode),
        orderBy("dateentry", "asc")
      );

      return from(getDocs(q)).pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data: any = doc.data();
            const id = doc.id;
            return { id, ...data, iscreditcard: data.iscreditcard ? 'Yes' : 'No', date: this.formatDate(new Date(data.dateentry?.seconds * 1000)) };
          });
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => {
        let combinedResults = results.flat(); // Flatten the array of results

        // Group by date (only keep the date part)


        // Sort by date
        combinedResults = combinedResults.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return combinedResults;
      })
    );
  }


  getAllliabilitygive(): Observable<any[]> {
    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        where("matgroup", "==", "Liability Give"),
        where("usercode", "==", this.usercode),
        orderBy("dateentry", "asc")
      );

      return from(getDocs(q)).pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data: any = doc.data();
            const id = doc.id;
            return { id, ...data, iscreditcard: data.iscreditcard ? 'Yes' : 'No', date: this.formatDate(new Date(data.dateentry?.seconds * 1000)) };
          });
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => results.flat()) // Flatten the array of results
    );
  }

  getAllliabilityget(): Observable<any[]> {
    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        where("matgroup", "==", "Liability Get"),
        where("usercode", "==", this.usercode),
        orderBy("dateentry", "asc")
      );

      return from(getDocs(q)).pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data: any = doc.data();
            const id = doc.id;
            return { id, ...data, iscreditcard: data.iscreditcard ? 'Yes' : 'No', date: this.formatDate(new Date(data.dateentry?.seconds * 1000)) };
          });
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => results.flat()) // Flatten the array of results
    );
  }

  getAlllinvestment(): Observable<any[]> {
    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        where("matgroup", "==", "Investment"),
        where("usercode", "==", this.usercode),
        orderBy("dateentry", "asc")
      );

      return from(getDocs(q)).pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data: any = doc.data();
            const id = doc.id;
            return { id, ...data, iscreditcard: data.iscreditcard ? 'Yes' : 'No', date: this.formatDate(new Date(data.dateentry?.seconds * 1000)) };
          });
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => results.flat()) // Flatten the array of results
    );
  }


  getAllcreditItems(): Observable<any[]> {
    const citiesRef = collection(this.db, "CreditList");
    const q = query(
      citiesRef,
      // where("matgroup", "!=", "Investment"),
      // where("matgroup", "!=", "Liability Give"),
      // where("matgroup", "!=", "Liability Get"),
      // where("matgroup", "not-in", ["Investment", "Liability Give", "Liability Get"]),
      where("usercode", "==", this.usercode),
      orderBy("datecr", "asc")
    );
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map(doc => {
          const data: any = doc.data();
          const id = doc.id;
          return { id, ...data, date: this.formatDate(new Date(data.dateentry?.seconds * 1000)) };
        });
      })
    );
  }
  getBalance(): Observable<number> {
    return combineLatest([
      this.getAllspendItemsforbalance().pipe(
        map(res => _.sumBy(res, 'matprice')) // Calculate total spend
      ),
      this.getAllcreditItems().pipe(
        map(res => _.sumBy(res, 'matprice')) // Calculate total credit
      ),
      this.getAllliabilitygive().pipe(
        map(res => _.sumBy(res, 'matprice')) // Calculate total credit
      ),
      this.getAllliabilityget().pipe(
        map(res => _.sumBy(res, 'matprice')) // Calculate total credit
      ),
      this.getAlllinvestment().pipe(
        map(res => _.sumBy(res, 'matprice')) // Calculate total credit
      ),
      this.getAllCCrepayItems().pipe(
        map(res => _.sumBy(res, 'matprice')) // Calculate total credit
      )
    ]).pipe(
      map(([totalSpend, totalCredit, totalliablegive, totalliableget, totalinvestment, totalrepaid]) => {
        const balance = (totalCredit + totalliableget) - (totalSpend + totalliablegive + totalinvestment + totalrepaid); // Calculate the balance
        // console.log(balance, 'total balance');
        return balance; // Return the calculated balance
      })
    );
  }


  formatDate(dateString: any) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }


  getAllinvestItems(): Observable<any[]> {
    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        where("matgroup", "==", "Investment"),
        where("usercode", "==", this.usercode),
        orderBy("dateentry", "asc")

      );

      return from(getDocs(q)).pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data: any = doc.data();
            const id = doc.id;
            return {
              id,
              ...data,
              date: this.formatDate(new Date(data.dateentry?.seconds * 1000)) // Store as Date object
            };
          });
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => {
        const combinedResults = results.flat(); // Flatten the array of results

        // Group by date (only keep the date part)
        const groupedByDate = groupBy(combinedResults, item => item.date);

        // Sum matprice for each group
        const summedResults = Object.entries(groupedByDate).map(([date, items]) => {
          return {
            date,
            matprice: sumBy(items, 'matprice') // Sum matprice for the grouped items
          };
        });

        // Sort by date
        summedResults.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return summedResults;
      })
    );
  }


  getAllpreviousentries(groupname: string): Observable<any[]> {
    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        where("matgroup", "==", groupname),
        where("usercode", "==", this.usercode),
        orderBy("dateentry", "asc")
      );

      return from(getDocs(q)).pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data: any = doc.data();
            const id = doc.id;
            return { id, item_id: id, item_text: data.matname };
          });
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => results.flat()) // Flatten the array of results
    );
  }



  getAllSpendItemsMonthly(): Observable<any[]> {
    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const ref = collection(this.db, collectionName);
      const q = query(
        ref,
        where("matgroup", "not-in", ["Investment", "Liability Give", "Liability Get"]),
        where("usercode", "==", this.usercode),
        orderBy("dateentry", "asc")
      );

      return from(getDocs(q)).pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data: any = doc.data();
            const id = doc.id;
            return {
              id,
              ...data,
              date: new Date(data.dateentry?.seconds * 1000)
            };
          });
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => {
        const allItems = results.flat();
        const groupedData: { [key: string]: { totalMatPrice: number; month: number; year: number } } = allItems.reduce((acc, item) => {
          const monthYear = `${item.date.getFullYear()}-${item.date.getMonth() + 1}`;
          if (!acc[monthYear]) {
            acc[monthYear] = { totalMatPrice: 0, month: item.date.getMonth() + 1, year: item.date.getFullYear() };
          }
          acc[monthYear].totalMatPrice += item.matprice;
          return acc;
        }, {} as { [key: string]: { totalMatPrice: number; month: number; year: number } });

        return Object.values(groupedData).map(({ month, year, totalMatPrice }) => ({
          date: `${month < 10 ? `0${month}` : month}-01-${year}`,
          matprice: totalMatPrice
        }));
      })
    );
  }




  getAllInvestItemsMonthly(): Observable<any[]> {
    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const ref = collection(this.db, collectionName);
      const q = query(
        ref,
        where("matgroup", "==", "Investment"),
        where("usercode", "==", this.usercode),
        orderBy("dateentry", "asc")
      );

      return from(getDocs(q)).pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data: any = doc.data();
            const id = doc.id;
            return {
              id,
              ...data,
              date: new Date(data.dateentry?.seconds * 1000)
            };
          });
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => {
        const allItems = results.flat();
        const groupedData: { [key: string]: { totalMatPrice: number; month: number; year: number } } = allItems.reduce((acc, item) => {
          const monthYear = `${item.date.getFullYear()}-${item.date.getMonth() + 1}`;
          if (!acc[monthYear]) {
            acc[monthYear] = { totalMatPrice: 0, month: item.date.getMonth() + 1, year: item.date.getFullYear() };
          }
          acc[monthYear].totalMatPrice += item.matprice;
          return acc;
        }, {} as { [key: string]: { totalMatPrice: number; month: number; year: number } });

        return Object.values(groupedData).map(({ month, year, totalMatPrice }) => ({
          date: `${month < 10 ? `0${month}` : month}-01-${year}`,
          matprice: totalMatPrice
        }));
      })
    );
  }


  getmatgroupspendItems(startdate: Date = subDays(new Date(), 30), enddate: Date = new Date()): Observable<any[]> {
    // Convert startdate and enddate to Firestore Timestamps
    const startTimestamp = Timestamp.fromDate(startdate);
    const endTimestamp = Timestamp.fromDate(enddate);
    // console.log(startTimestamp,endTimestamp);

    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        where("matgroup", "not-in", ["Liability Give", "Liability Get"]),
        where("usercode", "==", this.usercode),
        where("dateentry", ">", startTimestamp), // Use Timestamp for start date
        where("dateentry", "<=", endTimestamp), // Use Timestamp for end date
        orderBy("dateentry", "asc")
      );

      return from(getDocs(q)).pipe(
        map((querySnapshot) => {
          const groupedData: { [key: string]: number } = {};

          querySnapshot.docs.forEach(doc => {
            const data: any = doc.data();
            const matgroup = data.matgroup;
            const price = data.matprice || 0;

            // Initialize the group if not present
            if (!groupedData[matgroup]) {
              groupedData[matgroup] = 0;
            }
            // Sum the amount for the matgroup
            groupedData[matgroup] += price;
          });

          return Object.keys(groupedData).map(key => ({
            matgroup: key,
            totalPrice: groupedData[key]
          }));
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => {
        const finalGroupedData: { [key: string]: number } = {};

        results.forEach(groupedArray => {
          groupedArray.forEach(item => {
            const { matgroup, totalPrice } = item;

            if (!finalGroupedData[matgroup]) {
              finalGroupedData[matgroup] = 0;
            }
            finalGroupedData[matgroup] += totalPrice;
          });
        });

        return Object.keys(finalGroupedData).map(key => ({
          matgroup: key,
          totalPrice: finalGroupedData[key]
        }));
      })
    );
  }

  getmatnamespendItems(matgroup:string,startdate: Date = subDays(new Date(), 30), enddate: Date = new Date()): Observable<any[]> {
    // Convert startdate and enddate to Firestore Timestamps
    const startTimestamp = Timestamp.fromDate(startdate);
    const endTimestamp = Timestamp.fromDate(enddate);
    // console.log(startTimestamp,endTimestamp);

    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        where("matgroup", "==", matgroup),
        where("usercode", "==", this.usercode),
        where("dateentry", ">", startTimestamp), // Use Timestamp for start date
        where("dateentry", "<=", endTimestamp), // Use Timestamp for end date
        orderBy("dateentry", "asc")
      );

      return from(getDocs(q)).pipe(
        map((querySnapshot) => {
          const groupedData: { [key: string]: number } = {};

          querySnapshot.docs.forEach(doc => {
            const data: any = doc.data();
            const matgroup = data.matname;
            const price = data.matprice || 0;

            // Initialize the group if not present
            if (!groupedData[matgroup]) {
              groupedData[matgroup] = 0;
            }
            // Sum the amount for the matgroup
            groupedData[matgroup] += price;
          });

          return Object.keys(groupedData).map(key => ({
            matgroup: key,
            totalPrice: groupedData[key]
          }));
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => {
        const finalGroupedData: { [key: string]: number } = {};

        results.forEach(groupedArray => {
          groupedArray.forEach(item => {
            const { matgroup, totalPrice } = item;

            if (!finalGroupedData[matgroup]) {
              finalGroupedData[matgroup] = 0;
            }
            finalGroupedData[matgroup] += totalPrice;
          });
        });

        return Object.keys(finalGroupedData).map(key => ({
          matgroup: key,
          totalPrice: finalGroupedData[key]
        }));
      })
    );
  }




  getmatgroupAllItems(startdate: Date = subDays(new Date(), 10), enddate: Date = new Date()): Observable<any[]> {
    const startTimestamp = Timestamp.fromDate(startdate);
    const endTimestamp = Timestamp.fromDate(enddate);
    console.log(startdate,startTimestamp,enddate,endTimestamp);

    const collections = ['SpendList', 'CCLendList'];
    const observables = collections.map(collectionName => {
      const citiesRef = collection(this.db, collectionName);
      const q = query(
        citiesRef,
        where("matgroup", "not-in", ["Liability Give", "Liability Get"]),
        where("usercode", "==", this.usercode),
        where("dateentry", ">=", startTimestamp), // Use Timestamp for start date
        where("dateentry", "<=", endTimestamp), // Use Timestamp for end date
        orderBy("dateentry", "asc")
      );


      return from(getDocs(q)).pipe(
        map((querySnapshot) => {
          const groupedData: { [key: string]: number } = {}; // Initialize an object to hold grouped data

          querySnapshot.docs.forEach(doc => {
            const data: any = doc.data();
            const matgroup = data.matgroup; // Field to group by
            const price = data.matprice || 0; // Field to sum, default to 0 if undefined
console.log(data);

            // Initialize the group if not present
            if (!groupedData[matgroup]) {
              groupedData[matgroup] = 0;
            }
            // Sum the amount for the matgroup
            groupedData[matgroup] += price;
          });

          // Convert groupedData object to an array
          return Object.keys(groupedData).map(key => ({
            matgroup: key,
            totalPrice: groupedData[key] // Sum of prices for this matgroup
          }));
        })
      );
    });

    return forkJoin(observables).pipe(
      map(results => {
        const finalGroupedData: { [key: string]: number } = {};

        // Combine the results from each collection
        results.forEach(groupedArray => {
          groupedArray.forEach(item => {
            const { matgroup, totalPrice } = item;

            // Initialize the group if not present
            if (!finalGroupedData[matgroup]) {
              finalGroupedData[matgroup] = 0;
            }
            // Sum the amounts for this matgroup
            finalGroupedData[matgroup] += totalPrice;
          });
        });

        // Convert finalGroupedData object to an array
        return Object.keys(finalGroupedData).map(key => ({
          category: key,
          second: finalGroupedData[key] // Total sum of prices for this matgroup across collections
        }));
      })
    );
  }

}
