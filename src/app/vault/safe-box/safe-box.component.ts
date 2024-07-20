import { Component } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideTrash2, lucideEdit, lucideKey, lucideUser2 } from '@ng-icons/lucide';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { Clipboard } from "@angular/cdk/clipboard"
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
@Component({
  selector: 'app-safe-box',
  standalone: true,
  providers: [provideIcons({ lucideTrash2, lucideEdit, lucideKey, lucideUser2 })],
  imports: [
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmIconComponent,
    HlmButtonDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,

  ],
  templateUrl: './safe-box.component.html',
  styleUrl: './safe-box.component.css'
})
export class SafeBoxComponent {

  usuario = '20.568.823-8'
  password = '*********'

  constructor(private clipboard: Clipboard) {

  }

  copyToClipBoard(content: string) {
    this.clipboard.copy(content)
  }
}
