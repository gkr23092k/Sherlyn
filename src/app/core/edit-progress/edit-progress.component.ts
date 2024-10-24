import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/firebase.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-progress',
  templateUrl: './edit-progress.component.html',
  styleUrls: ['./edit-progress.component.scss'], 
  providers: [MessageService]
})
export class EditProgressComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});
  allocationdata: any[] = [];
  saveButtonEnabled: { [key: string]: boolean } = {}; // Track button states

  constructor(private formBuilder: FormBuilder, private fb: FirebaseService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.fb.getAllAllocation().subscribe((res: any) => {
      this.allocationdata = _.sortBy(res, 'category');

      this.allocationdata.forEach((el: any) => {
        this.form.addControl(el.category, this.formBuilder.control(el.first || 50));

        // Initialize the save button state to false
        this.saveButtonEnabled[el.category] = false;

        // Listen for changes on each form control
        this.form.get(el.category)?.valueChanges.subscribe(value => {
          // Enable the button if the current value is different from the original value
          this.saveButtonEnabled[el.category] = value !== el.first;
        });
      });
    });
  }

  submit(): void {
    console.log('Slider Values:', this.form.value);
  }

  findCategoryId(category: string): string | '' {
    const match = this.allocationdata.find(el => el.category === category);
    return match ? match.id : '';
  }

  updateAllocation(category: string): void {
    const updatedValue = this.form.get(category)?.value;
    const id = this.findCategoryId(category);

    this.fb.updateAllocation(id, { first: updatedValue })
      .then(() => {
        console.log('Allocation updated successfully');
        // Reset the button state after update
        this.saveButtonEnabled[category] = false;
       this.showSuccess('Allocation updated successfully')
      })
      .catch((error) => {
        console.error('Error updating allocation:', error);
      });
  }
  showSuccess(msg:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
}

}
