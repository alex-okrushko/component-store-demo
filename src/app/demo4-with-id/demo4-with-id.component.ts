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
import { Book4Component } from './book4.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-demo4-with-id',
  template: `<book4 [id]="bookId"></book4>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo4WithIdComponent implements OnInit {
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
  exports: [Demo4WithIdComponent],
  declarations: [Demo4WithIdComponent, Book4Component],
})
export class Demo4WithIdModule {}
