import { ResetComponent } from './../reset/reset.component';
import { AuthGuardService } from './../services/auth-guard.service';
import { LawnComponent } from './../lawn/lawn.component';
import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './../login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'lawns/:id', component: LawnComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'resetPassword', component: ResetComponent}
];
