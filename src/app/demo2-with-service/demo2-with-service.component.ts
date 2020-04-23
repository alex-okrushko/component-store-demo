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
import { WithServiceComponent } from './with-service.component';

@Component({
  selector: 'app-demo2-with-service',
  template: `
    <p>
      demo2-with-service works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo2WithServiceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule],
  exports: [Demo2WithServiceComponent],
  declarations: [Demo2WithServiceComponent, WithServiceComponent],
})
export class Demo2WithServiceModule {}
