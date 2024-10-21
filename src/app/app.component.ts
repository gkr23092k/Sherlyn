import { Component, inject, ViewChild } from '@angular/core';
import { DialogComponent } from './core/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from './shared/firebase.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sherlyn';
  addbalance: any;
  canAccess: boolean = false;
  loggeduser: string | null | undefined;
  isdashboard: boolean = false;
  issummary: boolean = false
  iscrdit:boolean=false

  closeDrawer(token: string) {
    // this.drawer.close();
    // this.isdashboard = false; 
    this.fb.updateViewTokem(token)
  }

  @ViewChild('drawer') drawer!: MatDrawer;

  // Method to close the drawer



  constructor(public dialog: MatDialog, private fb: FirebaseService, private router: Router) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: this.addbalance },
      height: '50vh',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result = {
          ...result,
          matprice: parseInt(result.newaccbalance),
          matname: 'credit',
          matgroup: 'credit'
        };

        console.log('The dialog was closed', result);

        // Call creditdataentry and handle the observable
        this.fb.creditdataentry(result).subscribe({
          next: () => {
            console.log('Credit entry added');
            this.fb.updatebalance(); // Update balance
          },
          error: (err) => {
            console.error('Error adding credit entry:', err);
          }
        });
      } else {
        console.log('Dialog was closed with no result');
      }
    });
  }



  logout() {
    localStorage.removeItem('name')
    localStorage.removeItem('key')
    localStorage.removeItem('usercode')
    // localStorage.setItem('key',userdetails.key) 
    this.canAccess = false
    this.drawer.toggle()
    this.router.navigate(['../user'])

  }

  ngOnInit() {

    this.fb.emitcanaccess().subscribe((res: boolean) => {
      this.canAccess = res
      this.loggeduser = localStorage.getItem('usercode');
    })
  }
  toggleMenu(menu: string): void {
    this.isdashboard = menu === 'dashboard' ? !this.isdashboard : false;
    this.issummary = menu === 'summary' ? !this.issummary : false;
    this.iscrdit = menu === 'credit' ? !this.iscrdit : false;
  }


}
