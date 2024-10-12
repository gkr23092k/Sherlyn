import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditmainComponent } from './creditmain/creditmain.component';

const routes: Routes = [
  {
    path: 'main', component: CreditmainComponent
  },
  {
    path: '**', redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditcardRoutingModule { }
