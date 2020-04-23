import { Component } from '@angular/core';

@Component({
  selector: 'chooser',
  template: `<h2>👆 👆 👆 Choose one 👆 👆 👆</h2>`,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class ChooserComponent {}
