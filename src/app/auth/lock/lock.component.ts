import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmButtonDirective } from '../../../../spartan-ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmCheckboxCheckIconComponent } from '../../../../spartan-ui/ui-checkbox-helm/src/lib/hlm-checkbox-checkicon.component';
import { HlmCheckboxComponent } from '../../../../spartan-ui/ui-checkbox-helm/src/lib/hlm-checkbox.component';
import { HlmLabelDirective } from '../../../../spartan-ui/ui-label-helm/src/lib/hlm-label.directive';
import { HlmInputDirective } from '../../../../spartan-ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmCardTitleDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card-title.directive';
import { HlmCardHeaderDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card-header.directive';
import { HlmCardFooterDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card-footer.directive';
import { HlmCardDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card.directive';
import { HlmCardDescriptionDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card-description.directive';
import { HlmCardContentDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card-content.directive';
import { provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-lock',
  standalone: true,
  providers: [provideIcons({ lucideEye, lucideEyeOff })],
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
    RouterLinkActive,
    HlmIconComponent
  ],
  templateUrl: './lock.component.html',
  styleUrl: './lock.component.css'
})
export class LockComponent {

  lockForm: FormGroup
  isOn = true

  constructor(private formBuilder: FormBuilder) {
    this.lockForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(12)]]
    })
  }

  hasErrors(controlName: string, errorType: string) {
    return this.lockForm.get(controlName)?.hasError(errorType) && this.lockForm.get(controlName)?.touched;
  }

  toggleState() {
    this.isOn = !this.isOn
  }
}
