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
import { Book5Component } from './book5.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-demo5-author',
  template: `<book5 [id]="bookId"></book5>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo5AuthorComponent implements OnInit {
  bookId = 4;
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  exports: [Demo5AuthorComponent],
  declarations: [Demo5AuthorComponent, Book5Component],
})
export class Demo5AuthorModule {}
