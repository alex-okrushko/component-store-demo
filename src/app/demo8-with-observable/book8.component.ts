import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Book8Store } from './book8.store';
import { timer, Subscription } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'book8',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./book.scss'],
  template: ` <ng-container *ngIf="vm$ | async as vm">
    <mat-form-field color="primary" appearance="outline">
      <mat-label>Title</mat-label>
      <input
        matInput
        autocomplete="off"
        [ngModel]="vm.title"
        (ngModelChange)="updateTitle($event)"
      />
    </mat-form-field>
    <div class="pageCount">
      <mat-form-field color="primary" appearance="outline">
        <mat-label>Number of pages</mat-label>
        <input
          matInput
          autocomplete="off"
          [ngModel]="vm.pageCount"
          (ngModelChange)="updatePageCount($event)"
          type="number"
          min="0"
        />
      </mat-form-field>
      <button
        mat-mini-fab
        class="add"
        color="accent"
        (click)="increasePageCount()"
      >
        <mat-icon>plus_one</mat-icon>
      </button>
    </div>

    <div *ngIf="vm.status == 'loading'; else bookImage" class="book-spacer">
      <mat-spinner></mat-spinner>
    </div>
    <button mat-raised-button (click)="stopBananas()">
      Stop Bananas!!!
    </button>
    <ng-template #bookImage>
      <div class="book-image">
        <svg
          width="260"
          height="196"
          viewBox="0 0 40 49"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.405 48.9773H32.064C33.442 48.9773 34.564 47.8563 34.564 46.4773V43.1683C34.721 43.2243 34.887 43.2603 35.063 43.2603H37.393C38.771 43.2603 39.893 42.1393 39.893 40.7603V3.01027C39.893 1.63127 38.771 0.510269 37.393 0.510269H8.734C7.795 0.510269 6.661 0.960269 5.978 1.60527C5.951 1.6306 5.92498 1.65695 5.9 1.68427L1.298 6.71427C0.935999 7.11027 0.851999 7.64327 0.986999 8.12527C0.935136 8.32182 0.907596 8.524 0.904999 8.72727V46.4773C0.904999 47.8563 2.026 48.9773 3.405 48.9773ZM32.064 47.186H2.666V27.6556V8.12527H19.773H32.064L32.065 27.6023L32.064 47.186ZM7.405 3.01027C10.749 2.25327 10.904 2.01027 8.734 2.51027L38 2.51028V21.5V41.5H34.564L34.565 8.72727C34.565 7.34827 33.443 6.22727 32.065 6.22727L3.893 6.49999L7.405 3.01027Z"
          />
        </svg>
        <h3 class="display-title">{{ vm.displayTitle }}</h3>
        <h5 class="display-page-count">
          {{ vm.pageCount }} pages of awesomeness
        </h5>
      </div>
    </ng-template>
    <pre>
      Local State:
  {{ vm.localState | json }}
  </pre>
  </ng-container>`,
  providers: [Book8Store],
})
export class Book8Component {
  @Input()
  set id(bookId: string | undefined) {
    this.bookStore.getBook(bookId);
  }

  readonly subscription: Subscription;

  readonly vm$ = this.bookStore.getBookViewModel();

  applesTitle$ = timer(1000, 3000).pipe(mapTo('apples'));
  orangesTitle$ = timer(2000, 3000).pipe(mapTo('oranges'));
  bananasTitle$ = timer(3000, 3000).pipe(mapTo('bananas'));

  constructor(private readonly bookStore: Book8Store) {
    this.bookStore.updateTitle(this.applesTitle$);
    this.bookStore.updateTitle(this.orangesTitle$);
    this.subscription = this.bookStore.updateTitle(this.bananasTitle$);
  }

  updateTitle(title: string) {
    this.bookStore.updateTitle(title);
  }

  updatePageCount(pageCount: string) {
    this.bookStore.updatePageCount(pageCount);
  }

  increasePageCount() {
    this.bookStore.increasePageCount();
  }

  stopBananas() {
    this.subscription.unsubscribe();
  }
}
