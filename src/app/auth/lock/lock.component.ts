import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmCardContentDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card-content.directive';
import { HlmCardDescriptionDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card-description.directive';
import { HlmCardDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card.directive';
import { HlmCardFooterDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card-footer.directive';
import { HlmCardHeaderDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card-header.directive';
import { HlmCardTitleDirective } from '../../../../spartan-ui/ui-card-helm/src/lib/hlm-card-title.directive';
import { HlmInputDirective } from '../../../../spartan-ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmLabelDirective } from '../../../../spartan-ui/ui-label-helm/src/lib/hlm-label.directive';
import { HlmButtonDirective } from '../../../../spartan-ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmCheckboxComponent } from '../../../../spartan-ui/ui-checkbox-helm/src/lib/hlm-checkbox.component';
import { HlmCheckboxCheckIconComponent } from '../../../../spartan-ui/ui-checkbox-helm/src/lib/hlm-checkbox-checkicon.component';

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
  styleUrl: './lock.component.css',
})
export class LockComponent implements OnInit {

  lockForm: FormGroup
  email: any;
  isOn = true

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.lockForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(12)]]
    })
  }
  ngOnInit(): void {
    this.email = history.state.email
    console.log(this.email)
  }

  hasErrors(controlName: string, errorType: string) {
    return this.lockForm.get(controlName)?.hasError(errorType) && this.lockForm.get(controlName)?.touched;
  }

  toggleState() {
    this.isOn = !this.isOn
  }
}
