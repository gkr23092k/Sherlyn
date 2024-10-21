import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './module/login/login.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {getStorage,provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';

import { firebaseConfig } from 'src/app/shared/firebase.config';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// 
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { DialogComponent } from './core/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage()),
    AngularFirestoreModule,
    BrowserAnimationsModule,


    // material
    MatButtonModule,MatInputModule,MatIconModule,MatMenuModule,MatDialogModule,FormsModule,MatSidenavModule,MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
