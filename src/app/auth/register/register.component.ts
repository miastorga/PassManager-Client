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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      masterPassword: ['', [Validators.required, Validators.minLength(12)]],
      masterPasswordConfirmation: ['', [Validators.required, Validators.minLength(12)]],
    }, {
      validators: this.passwordMatchValidator
    }
    );
  }

  hasErrors(controlName: string, errorType: string) {
    return this.registerForm.get(controlName)?.hasError(errorType) && this.registerForm.get(controlName)?.touched;
  }

  toggleState() {
    this.isOn = !this.isOn
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('masterPassword')?.value;
    const confirmPassword = formGroup.get('masterPasswordConfirmation')?.value;

    if (password !== confirmPassword) {
      formGroup.get('masterPasswordConfirmation')?.setErrors({ mistmatch: true });
      return { mistmatch: true };
    } else {
      if (formGroup.get('masterPasswordConfirmation')?.hasError('mistmatch')) {
        formGroup.get('masterPasswordConfirmation')?.setErrors(null);
      }
      return null;
    }
  }
}
