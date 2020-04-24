import { Component, Input } from '@angular/core';
import { Author6Store } from './author6.store';

@Component({
  selector: 'author6',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        width: 260px;
        margin: 10px;
      }
    `,
  ],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <mat-form-field color="primary" appearance="outline">
        <mat-label>Author Name</mat-label>
        <input
          matInput
          autocomplete="off"
          [ngModel]="vm.name"
          (ngModelChange)="updateName($event)"
        />
      </mat-form-field>
      <mat-progress-bar
        *ngIf="vm.status == 'loading'"
        color="accent"
        mode="indeterminate"
      ></mat-progress-bar>
      <pre>
      Local Author State:
  {{ vm.localState | json }}
  </pre>
      <book6 [id]="bookId" *ngFor="let bookId of vm.bookIds"></book6>
      <button
        mat-mini-fab
        class="add"
        color="primary"
        (click)="createNewBook()"
      >
        <mat-icon>plus_one</mat-icon>
      </button>
    </ng-container>
  `,
  providers: [Author6Store],
})
export class Author6Component {
  @Input()
  set id(authorId: string | undefined) {
    this.authorStore.getAuthor(authorId);
  }

  readonly vm$ = this.authorStore.getAuthorViewModel();

  constructor(private readonly authorStore: Author6Store) {}

  createNewBook() {
    this.authorStore.createNewBook();
  }

  updateName(name: string) {
    this.authorStore.setName(name);
  }
}
