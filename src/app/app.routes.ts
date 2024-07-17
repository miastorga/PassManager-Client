import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SafeBoxComponent } from './vault/safe-box/safe-box.component';
import { LockComponent } from './auth/lock/lock.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lock', component: LockComponent, canActivate: [authGuard] },
  { path: 'vault', component: SafeBoxComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
