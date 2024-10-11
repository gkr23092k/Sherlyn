// entry-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';

const routes: Routes = [
  { path: '', component: EntryComponent },
  { path: '**', redirectTo: 'entry', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule {
  constructor() {
    // console.log('reached routing');

  }
}
