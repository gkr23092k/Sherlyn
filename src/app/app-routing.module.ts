// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/login/login.component';
import { guardGuard } from './core/guards/guard.guard';

const routes: Routes = [
  {
    path: 'user', component: LoginComponent
  },
  {
    path: 'entry', loadChildren: () => import('./module/pages/entry/entry.module').then(m => m.EntryModule),
    canActivate: [guardGuard]
  },
  {
    path: 'summary', loadChildren: () => import('./module/pages/summary/summary.module').then(m => m.SummaryModule),
    canActivate: [guardGuard]

  },
  {
    path: 'dashboard', loadChildren: () => import('./module/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [guardGuard]
  },
  { path: '**', redirectTo: 'user' }  // Redirect to 'dashboard' path for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }