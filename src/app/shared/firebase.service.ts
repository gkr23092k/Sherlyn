import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, forkJoin, from, map, Observable } from 'rxjs';
import { collection, Firestore, getDocs, orderBy, query, where } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'; // If you're using the modular SDK
import * as _ from 'lodash';



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
    return this.firestore.collection('CreditList').add({ ...data, datecr: new Date(), usercode: this.usercode });
  }


  getAllspendItems(): Observable<any[]> {
    const citiesRef = collection(this.db, "SpendList");
    const q = query(
      citiesRef,
      // where("matgroup", "!=", "Investment"),
      // where("matgroup", "!=", "Liability Give"),
      // where("matgroup", "!=", "Liability Get"),
      where("matgroup", "not-in", ["Investment", "Liability Give", "Liability Get"]),
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



  getAllspendItemsgrid(): Observable<any[]> {
    const citiesRef = collection(this.db, "SpendList");
    const q = query(
      citiesRef,
      // where("matgroup", "!=", "Investment"),
      // where("matgroup", "!=", "Liability Give"),
      // where("matgroup", "!=", "Liability Get"),
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


  getAllliabilitygive(): Observable<any[]> {
    const citiesRef = collection(this.db, "SpendList");
    const q = query(
      citiesRef,
      // where("matgroup", "!=", "Investment"),
      where("matgroup", "==", "Liability Give"),
      // where("matgroup", "!=", "Liability Get"),
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

  getAllliabilityget(): Observable<any[]> {
    const citiesRef = collection(this.db, "SpendList");
    const q = query(
      citiesRef,
      // where("matgroup", "!=", "Investment"),
      // where("matgroup", "==", "Liability Give"),
      where("matgroup", "==", "Liability Get"),
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

  getAlllinvestment(): Observable<any[]> {
    const citiesRef = collection(this.db, "SpendList");
    const q = query(
      citiesRef,
      where("matgroup", "==", "Investment"),
      // where("matgroup", "==", "Liability Give"),
      // where("matgroup", "==", "Liability Get"),
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
      this.getAllspendItems().pipe(
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
      )
    ]).pipe(
      map(([totalSpend, totalCredit, totalliablegive, totalliableget, totalinvestment]) => {
        const balance = (totalCredit + totalliableget) - (totalSpend + totalliablegive + totalinvestment); // Calculate the balance
        console.log(balance, 'total balance');
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
    const citiesRef = collection(this.db, "SpendList");
    const q = query(
      citiesRef,
      where("matgroup", "==", "Investment"),
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
    const citiesRef = collection(this.db, "SpendList");
    const q = query(
      citiesRef,
      // where("matgroup", "!=", "Investment"),
      // where("matgroup", "!=", "Liability Give"),
      // where("matgroup", "!=", "Liability Get"),
      where("matgroup", "not-in", ["Investment", "Liability Give", "Liability Get"]),
      where("usercode", "==", this.usercode),
      orderBy("dateentry", "asc")
    );

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const items = querySnapshot.docs.map(doc => {
          const data: any = doc.data();
          const id = doc.id;
          return {
            id,
            ...data,
            date: new Date(data.dateentry?.seconds * 1000)
          };
        });
        const groupedData: { month: string, year: string, totalMatPrice: string }[] = items.reduce((acc, item) => {
          const monthYear = `${item.date.getFullYear()}-${item.date.getMonth() + 1}`;

          if (!acc[monthYear]) {
            acc[monthYear] = {
              totalMatPrice: 0,
              month: item.date.getMonth() + 1,
              year: item.date.getFullYear()
            };
          }

          acc[monthYear].totalMatPrice += item.matprice;

          return acc;
        }, {});

        return Object.entries(groupedData).map(([key, value]) => ({
          date: `${(parseInt(value.month) < 10) ? `0${value.month}` : value.month}-01-${value.year}`,
          matprice: value.totalMatPrice
        }));
      })
    );
  }



  getAllInvestItemsMonthly(): Observable<any[]> {
    const citiesRef = collection(this.db, "SpendList");
    const q = query(
      citiesRef,
      // where("matgroup", "!=", "Investment"),
      // where("matgroup", "!=", "Liability Give"),
      // where("matgroup", "!=", "Liability Get"),
      where("matgroup", "in", ["Investment"]),
      where("usercode", "==", this.usercode),
      orderBy("dateentry", "asc")
    );

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const items = querySnapshot.docs.map(doc => {
          const data: any = doc.data();
          const id = doc.id;
          return {
            id,
            ...data,
            date: new Date(data.dateentry?.seconds * 1000)
          };
        });
        const groupedData: { month: string, year: string, totalMatPrice: string }[] = items.reduce((acc, item) => {
          const monthYear = `${item.date.getFullYear()}-${item.date.getMonth() + 1}`;

          if (!acc[monthYear]) {
            acc[monthYear] = {
              totalMatPrice: 0,
              month: item.date.getMonth() + 1,
              year: item.date.getFullYear()
            };
          }

          acc[monthYear].totalMatPrice += item.matprice;

          return acc;
        }, {});

        return Object.entries(groupedData).map(([key, value]) => ({
          date: `${(parseInt(value.month) < 10) ? `0${value.month}` : value.month}-01-${value.year}`,
          matprice: value.totalMatPrice
        }));
      })
    );
  }






  getmatgroupspendItems(): Observable<any[]> {
    const citiesRef = collection(this.db, "SpendList");

    const q = query(
      citiesRef,
      where("matgroup", "not-in", ["Investment", "Liability Give", "Liability Get"]), // Exclude these groups
      where("usercode", "==", this.usercode),
      orderBy("dateentry", "asc")
    );

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const groupedData: GroupedData = {}; // Initialize an object to hold grouped data

        querySnapshot.docs.forEach(doc => {
          const data: any = doc.data();
          const matgroup = data.matgroup; // Field to group by
          const price = data.matprice || 0; // Field to sum, default to 0 if undefined

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
  }



  getmatgroupAllItems(): Observable<any[]> {
    const citiesRef = collection(this.db, "SpendList");

    const q = query(
      citiesRef,
      // where("matgroup", "not-in", ["Investment", "Liability Give", "Liability Get"]), // Exclude these groups
      where("usercode", "==", this.usercode),
      orderBy("dateentry", "asc")
    );

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const groupedData: GroupedData = {}; // Initialize an object to hold grouped data

        querySnapshot.docs.forEach(doc => {
          const data: any = doc.data();
          const matgroup = data.matgroup; // Field to group by
          const price = data.matprice || 0; // Field to sum, default to 0 if undefined

          // Initialize the group if not present
          if (!groupedData[matgroup]) {
            groupedData[matgroup] = 0;
          }
          // Sum the amount for the matgroup
          groupedData[matgroup] += price;
        });

        // Convert groupedData object to an array
        return Object.keys(groupedData).map(key => ({
          category: key,
          second: groupedData[key] // Sum of prices for this matgroup
        }));
      })
    );
  }

}
