import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-creditcardui',
  templateUrl: './creditcardui.component.html',
  styleUrls: ['./creditcardui.component.scss']
})
export class CreditcarduiComponent  {

  
  @Input('Creditcards') carddetails:any;
  @Output() buttonClicked = new EventEmitter<void>();

  notifyParent() {
    this.buttonClicked.emit();
  }

}
