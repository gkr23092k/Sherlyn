import { Component, inject } from '@angular/core';
import { DialogComponent } from './core/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from './shared/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sherlyn';
  addbalance: any;
  canAccess: boolean = false;

  constructor(public dialog: MatDialog, private fb: FirebaseService, private router: Router) {

  }


  openDialog(): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: this.addbalance },
      height: '310px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      result = { ...result, matprice: parseInt(result.newaccbalance), matname: 'credit', matgroup: 'credit' }
      console.log('The dialog was closed', result);
      // console.log(data.value);
      this.fb.creditdataentry(result)
      // }
    });
  }
  logout() {
    localStorage.removeItem('name')
    localStorage.removeItem('key')
    // localStorage.setItem('key',userdetails.key) 
    this.canAccess = false
    this.router.navigate(['../user'])

  }

  ngOnInit() {

    this.fb.emitcanaccess().subscribe((res: boolean) => {
      this.canAccess = res
    })
  }



}
