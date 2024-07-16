import { Component, TrackByFunction, computed, effect, signal } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { lucideArrowUpDown, lucideChevronDown, lucideMoreHorizontal } from '@ng-icons/lucide';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmCheckboxCheckIconComponent, HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnTableModule, PaginatorState, useBrnColumnManager } from '@spartan-ng/ui-table-brain';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { debounceTime, map } from 'rxjs';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

const PAYMENT_DATA: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
  },
  {
    id: 'p0r8sd2f',
    amount: 123,
    status: 'failed',
    email: 'john.doe@example.com',
  },
  {
    id: '8uyv3n1x',
    amount: 589,
    status: 'processing',
    email: 'emma.smith@gmail.com',
  },
  {
    id: '2zqo6ptr',
    amount: 456,
    status: 'success',
    email: 'jackson78@hotmail.com',
  },
  {
    id: 'l7we9a3m',
    amount: 632,
    status: 'success',
    email: 'grace_22@yahoo.com',
  },
  {
    id: 'o9p2v3qk',
    amount: 987,
    status: 'failed',
    email: 'robert.adams@gmail.com',
  },
  {
    id: 'q1o8r7mz',
    amount: 321,
    status: 'processing',
    email: 'alexander34@gmail.com',
  },
  {
    id: 'i5n3s0tv',
    amount: 555,
    status: 'failed',
    email: 'olivia_morris@hotmail.com',
  },
  {
    id: '3xr7s2nl',
    amount: 789,
    status: 'success',
    email: 'michael_cole@yahoo.com',
  },
  {
    id: 'u9v2p1qy',
    amount: 234,
    status: 'success',
    email: 'lily.jones@gmail.com',
  },
  {
    id: 'b4q0e1cp',
    amount: 876,
    status: 'failed',
    email: 'ryan_14@hotmail.com',
  },
  {
    id: 's1z8m7op',
    amount: 456,
    status: 'success',
    email: 'sophia.green@gmail.com',
  },
  {
    id: 'n5a3v0lt',
    amount: 987,
    status: 'failed',
    email: 'david.miller@yahoo.com',
  },
  {
    id: '2qr7v9sm',
    amount: 654,
    status: 'processing',
    email: 'emma_jones@hotmail.com',
  },
  {
    id: 'y9b2h8qq',
    amount: 789,
    status: 'success',
    email: 'jacob_89@gmail.com',
  },
  {
    id: 'c4a0r1xp',
    amount: 123,
    status: 'failed',
    email: 'samantha.richards@yahoo.com',
  },
];

@Component({
  selector: 'app-safe-box',
  standalone: true,
  imports: [
    HlmTableModule,
    BrnTableModule,
    HlmInputDirective,
    HlmCheckboxComponent,
    HlmCheckboxCheckIconComponent,
    HlmButtonModule,
    FormsModule,
    BrnTableModule,
    HlmTableModule,

    HlmButtonModule,

    DecimalPipe,
    TitleCasePipe,
    HlmIconComponent,
    HlmInputDirective,

    HlmCheckboxCheckIconComponent,
    HlmCheckboxComponent,
  ],
  templateUrl: './safe-box.component.html',
  styleUrl: './safe-box.component.css'
})
export class SafeBoxComponent {
  protected readonly _rawFilterInput = signal('');
  protected readonly _emailFilter = signal('');
  private readonly _debouncedFilter = toSignal(toObservable(this._rawFilterInput).pipe(debounceTime(300)));

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<Payment>(true);
  protected readonly _isPaymentSelected = (payment: Payment) => this._selectionModel.isSelected(payment);
  protected readonly _selected = toSignal(this._selectionModel.changed.pipe(map((change) => change.source.selected)), {
    initialValue: [],
  });

  protected readonly _brnColumnManager = useBrnColumnManager({
    status: { visible: true, label: 'Status' },
    email: { visible: true, label: 'Email' },
    amount: { visible: true, label: 'Amount ($)' },
  });
  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  private readonly _payments = signal(PAYMENT_DATA);
  private readonly _filteredPayments = computed(() => {
    const emailFilter = this._emailFilter()?.trim()?.toLowerCase();
    if (emailFilter && emailFilter.length > 0) {
      return this._payments().filter((u) => u.email.toLowerCase().includes(emailFilter));
    }
    return this._payments();
  });
  private readonly _emailSort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedPayments = computed(() => {
    const sort = this._emailSort();
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const payments = this._filteredPayments();
    if (!sort) {
      return payments.slice(start, end);
    }
    return [...payments]
      .sort((p1, p2) => (sort === 'ASC' ? 1 : -1) * p1.email.localeCompare(p2.email))
      .slice(start, end);
  });
  protected readonly _allFilteredPaginatedPaymentsSelected = computed(() =>
    this._filteredSortedPaginatedPayments().every((payment) => this._selected().includes(payment)),
  );
  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allFilteredPaginatedPaymentsSelected() ? true : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected readonly _trackBy: TrackByFunction<Payment> = (_: number, p: Payment) => p.id;
  protected readonly _totalElements = computed(() => this._filteredPayments().length);
  protected readonly _onStateChange = ({ startIndex, endIndex }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  constructor() {
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    effect(() => this._emailFilter.set(this._debouncedFilter() ?? ''), { allowSignalWrites: true });
  }

  protected togglePayment(payment: Payment) {
    this._selectionModel.toggle(payment);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedPayments());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedPayments());
    }
  }

  protected handleEmailSortChange() {
    const sort = this._emailSort();
    if (sort === 'ASC') {
      this._emailSort.set('DESC');
    } else if (sort === 'DESC') {
      this._emailSort.set(null);
    } else {
      this._emailSort.set('ASC');
    }
  }
}
