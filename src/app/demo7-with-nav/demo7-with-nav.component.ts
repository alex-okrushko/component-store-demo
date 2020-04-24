import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Book7Component } from './book7.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-demo7-with-nav',
  template: ` <button
      *ngFor="let index of [0, 1, 2, 3, 4, 5, 6]"
      mat-mini-fab
      [routerLink]="['../' + index]"
    >
      {{ index }}
    </button>
    <book7></book7>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo7WithNavComponent {}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  exports: [Demo7WithNavComponent],
  declarations: [Demo7WithNavComponent, Book7Component],
})
export class Demo7WithNavModule {}
