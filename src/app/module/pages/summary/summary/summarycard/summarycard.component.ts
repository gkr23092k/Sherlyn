import { Component, OnInit, Input } from '@angular/core';
import { dataservice } from 'src/app/shared/data.service';

@Component({
  selector: 'app-summarycard',
  templateUrl: './summarycard.component.html',
  styleUrls: ['./summarycard.component.scss']
})
export class SummarycardComponent implements OnInit {

  cardsdata: any = []
  @Input() carddetails: any
  ngOnInit() {
  }
  ngOnChanges() {
    this.cardsdata = this.carddetails
    // console.log('component called',this.cardsdata)
  }
}
