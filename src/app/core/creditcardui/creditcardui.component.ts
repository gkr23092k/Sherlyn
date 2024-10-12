import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-creditcardui',
  templateUrl: './creditcardui.component.html',
  styleUrls: ['./creditcardui.component.scss']
})
export class CreditcarduiComponent implements OnChanges {

  
  @Input('Creditcards') carddetails:any;
  
  ngOnChanges(changes: SimpleChanges): void {

  }


}
