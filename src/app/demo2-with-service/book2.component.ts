import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Book2Store, BookState } from './book2.store';

@Component({
  selector: 'book2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./book.scss'],
  template: ` <mat-form-field color="primary" appearance="outline">
      <mat-label>Title</mat-label>
      <input
        matInput
        autocomplete="off"
        [ngModel]="title$ | async"
        (ngModelChange)="updateTitle($event)"
      />
    </mat-form-field>
    <div class="pageCount">
      <mat-form-field color="primary" appearance="outline">
        <mat-label>Number of pages</mat-label>
        <input
          matInput
          autocomplete="off"
          [ngModel]="pageCount$ | async"
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
      <h3 class="display-title">{{ displayTitle$ | async }}</h3>
      <h5 class="display-page-count">
        {{ pageCount$ | async }} pages of awesomeness
      </h5>
    </div>
    <pre>
      Local State:
  {{ localState$ | async | json }}
  </pre
    >`,
})
export class Book2Component extends Book2Store {
  @Input()
  set book(initState: BookState) {
    this.setState(() => initState);
  }

  readonly localState$ = this.state$;

  readonly title$ = this.select((state) => state.title);
  readonly author$ = this.select((state) => state.author);
  readonly displayTitle$ = this.select(
    this.title$,
    this.author$,
    (title, author) => author && `${title} by ${author}`
  );
  readonly pageCount$ = this.select((state) => state.pageCount);

  constructor() {
    super();
  }

  updateTitle(title: string) {
    this.setState((state) => ({ ...state, title }));
  }

  updatePageCount(pageCount: string) {
    this.setState((state) => ({ ...state, pageCount: Number(pageCount) }));
  }

  increasePageCount() {
    this.setState((state) => ({
      ...state,
      pageCount: (state.pageCount || 0) + 1,
    }));
  }
}
