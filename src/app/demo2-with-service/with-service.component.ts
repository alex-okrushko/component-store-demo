import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-with-service',
  template: `
    <p>
      with-service works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
