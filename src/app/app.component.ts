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
  isnewentry: boolean = false

  iscrdit: boolean = false
  Tokenlive: any = '';
  SubTokenlive: string;

  closeDrawer(token: string) {
    // this.drawer.close();
    // this.isdashboard = false; 
    this.fb.updateViewTokem(token)
    this.Tokenlive = localStorage.getItem('currentMainToken') || 'newentry'
    this.SubTokenlive = localStorage.getItem('currentToken') || 'NEWENTRY'
  }

  @ViewChild('drawer') drawer!: MatDrawer;

  // Method to close the drawer



  constructor(public dialog: MatDialog, private fb: FirebaseService, private router: Router) {
    this.Tokenlive = localStorage.getItem('currentMainToken') || 'newentry'
    this.SubTokenlive = localStorage.getItem('currentToken') || 'NEWENTRY'
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
    // debugger
    this.router.navigate([`../${this.Tokenlive}`])

    this.fb.emitcanaccess().subscribe((res: boolean) => {
      this.canAccess = res
      this.loggeduser = localStorage.getItem('usercode');
    })
    this.toggleMenu(this.Tokenlive)
    this.closeDrawer(this.SubTokenlive)
  }
  toggleMenu(menu: string): void {
    console.log(menu);
    localStorage.setItem('currentMainToken', menu)
    this.isdashboard = menu === 'dashboard' ? !this.isdashboard : false;
    this.isnewentry = menu === 'newentry' ? !this.isnewentry : false;
    this.issummary = menu === 'summary' ? !this.issummary : false;
    this.iscrdit = menu === 'credit' ? !this.iscrdit : false;
  }




  isFullScreen(): boolean {
    return document.fullscreenElement != null;
  }

  toggleFullScreen(): void {
    if (this.isFullScreen()) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

}
