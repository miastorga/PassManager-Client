import { Component, OnInit } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmCheckboxComponent, HlmCheckboxCheckIconComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmCheckboxComponent,
    HlmCheckboxCheckIconComponent,
    HlmButtonDirective,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private localStorageService: LocalStorageService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      isCheck: [false]
    });
  }

  ngOnInit(): void {
    const isRememberEmail = this.getIsRememberEmailLocalStorage();
    if (isRememberEmail === 'true') {
      const emailLocalStorage = this.getEmailLocalStorage();
      this.loginForm.get('email')?.setValue(emailLocalStorage);
      this.loginForm.get('isCheck')?.setValue(true);
    }
  }

  saveEmailLocalStorage() {
    if (this.loginForm.get('isCheck')?.value) {
      this.localStorageService.setItem('loginEmail', this.loginForm.get('email')?.value);
    }
  }

  saveIsRememberEmailLocalStorage() {
    this.localStorageService.setItem('isRememberEmail', this.loginForm.get('isCheck')?.value.toString());
  }

  getEmailLocalStorage() {
    console.log(this.localStorageService.getItem('loginEmail'))
    return this.localStorageService.getItem('loginEmail');
  }

  getIsRememberEmailLocalStorage() {
    return this.localStorageService.getItem('isRememberEmail');
  }

  navigateToLock() {
    const email = this.loginForm.get('email')?.value
    this.router.navigate(['lock'], { state: { email } })
  }

  signIn() {
    this.saveIsRememberEmailLocalStorage();
    this.saveEmailLocalStorage();
    const email = this.loginForm.get('email')?.value
    this.router.navigate(['lock'], { state: { email } })
  }

  hasErrors(controlName: string, errorType: string) {
    return this.loginForm.get(controlName)?.hasError(errorType) && this.loginForm.get(controlName)?.touched;
  }
}
