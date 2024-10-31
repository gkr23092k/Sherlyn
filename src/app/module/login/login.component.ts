import { Component, Inject, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';
// import { ViewChild, ElementRef } from '@angular/fire/compat/auth';

import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private Sfirebase: FirebaseService, @Inject(DOCUMENT) private documnent: Document,
    private render: Renderer2, private router: Router) { }

  @ViewChild('username') username!: ElementRef
  @ViewChild('password') password!: ElementRef


  ngOnInit() {
    this.render.addClass(this.documnent.body, 'bluetheme')
    this.autologin()
  }

  login() {
    let userdetails = {
      name: this.username.nativeElement.value,
      key: this.password.nativeElement.value
    }
    this.Sfirebase.getAllusers(userdetails.name, userdetails.key).subscribe((el: any) => {
      console.log(el)
      if (el.length > 0) {
        localStorage.setItem('usercode', userdetails.name)
        localStorage.setItem('key', userdetails.key)
        this.router.navigate(['../newentry']);
      }
    })
  }

  autologin() {
    if (localStorage.getItem('usercode') &&
      localStorage.getItem('key')) {
      let userdetails = {
        name: localStorage.getItem('usercode'),
        key: localStorage.getItem('key')
      }
      this.Sfirebase.getAllusers(userdetails.name, userdetails.key).subscribe((el: any) => {
        console.log(el)
        if (el.length > 0) {
          this.router.navigate(['../newentry']);
        }
      })
    }
  }
  signup() {
    let userdetails = {
      name: this.username.nativeElement.value,
      key: this.password.nativeElement.value
    }
    this.Sfirebase.adduser(userdetails)
  }

}
