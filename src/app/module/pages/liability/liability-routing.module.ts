import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiabilityMainComponent } from './liability-main/liability-main.component';

const routes: Routes = [
  {
    path: 'main', component: LiabilityMainComponent
  },
  {
    path: '**', redirectTo: 'main', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiabilityRoutingModule { }
