import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { BasicComponent } from './basic.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-demo1-extends-component-store',
  template: `<basic></basic>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo1ExtendsComponentStoreComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule],
  exports: [Demo1ExtendsComponentStoreComponent],
  declarations: [Demo1ExtendsComponentStoreComponent, BasicComponent],
})
export class Demo1ExtendsComponentStoreModule {}
