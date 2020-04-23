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
import { Book3Component } from './book3.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentState } from './book3.store';
import { authorNames, bookTitles } from '../fake_data';

@Component({
  selector: 'app-demo3-with-service-provided',
  template: `<book3 [book]="initialBook"></book3>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo3WithServiceProvidedComponent implements OnInit {
  initialBook: ComponentState = {
    author: authorNames[2],
    title: bookTitles[2],
    pageCount: 100,
  };
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
  ],
  exports: [Demo3WithServiceProvidedComponent],
  declarations: [Demo3WithServiceProvidedComponent, Book3Component],
})
export class Demo3WithServiceProvidedModule {}
