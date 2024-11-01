import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';
import * as _ from 'lodash';

export interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-liability-main',
  templateUrl: './liability-main.component.html',
  styleUrls: ['./liability-main.component.scss']
})
export class LiabilityMainComponent implements OnInit {
  allentries: any = [];
  parsedData: any = [];
  constructor(private fb: FirebaseService) { }

  ngOnInit(): void {
    this.fb.getAllpreviousentries('Liability Get', "in", 'Liability Give').subscribe((el: any) => {
      [this.allentries[0], this.allentries[1]] = _.partition(el, item => item.matgroup === 'Liability Get');

      // Group by matname
      const groupedGet = _.groupBy(this.allentries[0], 'matname');
      const groupedGive = _.groupBy(this.allentries[1], 'matname');


      const allEntries = [...this.allentries[0], ...this.allentries[1]];
      const uniqueMatNames = _.uniqBy(allEntries, 'matname').map(item => item.matname);
      this.parsedData = uniqueMatNames.map((el: any) => {
        return { name: el, get: groupedGet[el], give: groupedGive[el] }
      })


      console.log(this.parsedData);
      
    });
  }


}
