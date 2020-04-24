import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Book2Component } from './book2.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookState } from './book2.store';
import { authorNames, bookTitles } from '../fake_data';

@Component({
  selector: 'app-demo2-with-service',
  template: '',
  // template: `<book2 [book]="initialBook"></book2>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo2WithServiceComponent {
  initialBook: BookState = {
    author: authorNames[1],
    title: bookTitles[1],
    pageCount: 100,
  };
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [Demo2WithServiceComponent],
  declarations: [Demo2WithServiceComponent, Book2Component],
})
export class Demo2WithServiceModule {}
