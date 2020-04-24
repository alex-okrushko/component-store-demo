import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Book8Component } from './book8.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-demo8-with-observable',
  template: `<book8 [id]="bookId"></book8>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo8WithObservableComponent {
  bookId = '8';
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
  exports: [Demo8WithObservableComponent],
  declarations: [Demo8WithObservableComponent, Book8Component],
})
export class Demo8WithObservableModule {}
