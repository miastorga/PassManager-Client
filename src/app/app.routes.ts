import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SafeBoxComponent } from './vault/safe-box/safe-box.component';
import { LockComponent } from './auth/lock/lock.component';
import { authGuard } from './guards/auth.guard';
import { SidebarComponent } from './vault/vault-layout/sidebar/sidebar.component';
import { ConfigComponent } from './vault/config/config.component';
import { GeneratorComponent } from './vault/generator/generator.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lock', component: LockComponent, canActivate: [authGuard] },
  {
    path: 'vault', component: SidebarComponent, children: [
      { path: 'safe-box', component: SafeBoxComponent },
      { path: 'config', component: ConfigComponent },
      { path: 'generator', component: GeneratorComponent },
      { path: '', redirectTo: '/vault/safe-box', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
