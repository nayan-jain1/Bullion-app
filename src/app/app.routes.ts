import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

    { path: '', component: DashboardComponent }, // Show Dashboard by default
  { path: 'login', component: LoginComponent }, // Load Login separately
  { path: '**', redirectTo: '' }
];
