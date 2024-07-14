import { Component } from '@angular/core';
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
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmToggleDirective } from '@spartan-ng/ui-toggle-helm';
import { BrnToggleDirective } from '@spartan-ng/ui-toggle-brain';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff } from '@ng-icons/lucide';

@Component({
  selector: 'app-register',
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
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    HlmIconComponent,
    BrnToggleDirective,
    HlmToggleDirective
  ],
  providers: [provideIcons({ lucideEye, lucideEyeOff })],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  isOn = true
  isOnConfirmation = true

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      masterPassword: ['', [Validators.required, Validators.minLength(12)]],
      masterPasswordConfirmation: ['', [Validators.required, Validators.minLength(12)]],
    });
  }

  hasErrors(controlName: string, errorType: string) {
    console.log(this.registerForm)
    return this.registerForm.get(controlName)?.hasError(errorType) && this.registerForm.get(controlName)?.touched;
  }

  toggleState() {
    this.isOn = !this.isOn
  }

  toggleStateConfirmation() {
    this.isOnConfirmation = !this.isOnConfirmation
  }

  asswordMatchValidator(): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: boolean } | null => {
      const password = formGroup.get('masterPassword');
      const confirmPassword = formGroup.get('masterPasswordConfirmation');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }
}
