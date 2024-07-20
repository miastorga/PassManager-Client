import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [provideIcons({ lucidePlus })],
  imports: [
    HlmIconComponent,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  safeBoxForm: FormGroup;
  folderForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.safeBoxForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      carpeta: [''],
      usuario: ['', [Validators.required]],
      contraseña: ['', [Validators.required]],
      notas: ['', [Validators.required, Validators.maxLength(500)]]
    })

    this.folderForm = this.formBuilder.group({
      carpeta: ['', [Validators.required]]
    })
  }

  onSubmit() {
    console.warn(this.safeBoxForm.value);
  }

  onSubmitFolder() {
    console.warn(this.folderForm.value);
  }

  hasErrors(controlName: string, errorType: string) {
    return this.safeBoxForm.get(controlName)?.hasError(errorType) && this.safeBoxForm.get(controlName)?.touched;
  }
}
