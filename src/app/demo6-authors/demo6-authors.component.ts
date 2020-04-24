import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Book6Component } from './book6.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Author6Component } from './author6.component';

@Component({
  selector: 'app-demo6-authors',
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
      }
    `,
  ],
  template: `
    <author6 [id]="authorId" *ngFor="let authorId of authorIds"></author6>
    <button mat-fab color="primary" (click)="addAuthor()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo6AuthorsComponent {
  authorIds = ['5', '6'];

  addAuthor() {
    this.authorIds = this.authorIds.concat('');
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  exports: [Demo6AuthorsComponent],
  declarations: [Demo6AuthorsComponent, Book6Component, Author6Component],
})
export class Demo6AuthorsModule {}
