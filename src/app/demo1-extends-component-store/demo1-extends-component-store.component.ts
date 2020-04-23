import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { Book1Component } from './book1.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-demo1-extends-component-store',
  template: `<book1></book1>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo1ExtendsComponentStoreComponent implements OnInit {
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
  exports: [Demo1ExtendsComponentStoreComponent],
  declarations: [Demo1ExtendsComponentStoreComponent, Book1Component],
})
export class Demo1ExtendsComponentStoreModule {}
