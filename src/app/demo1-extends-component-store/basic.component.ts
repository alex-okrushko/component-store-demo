import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs/operators';

interface ComponentState {
  data: { value: string };
  extra?: number;
}

@Component({
  selector: 'basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <input
      matInput
      (keyup)="update($event.target.value)"
      autocomplete="off"
    />
    <button color="primary" mat-icon-button (click)="clear()">
      <mat-icon>delete</mat-icon>
    </button>
    <h4>
      {{ transformed$ | async }}
    </h4>
    <h3>
      <button mat-mini-fab color="accent" (click)="add()">
        <mat-icon>plus_one</mat-icon>
      </button>
      Extra: {{ (getExtra() | async) || 'not set' }}
    </h3>
    <h2>Total: {{ getTotal() | async }}</h2>
    <pre>
  {{ localState$ | async | json }}
  </pre
    >`,
})
export class BasicComponent extends ComponentStore<ComponentState> {
  readonly localState$ = this.state$;

  readonly transformed$ = this.localState$.pipe(
    map((state) => state.data.value),
    map((value) => (value ? `input ${value} transformed` : ''))
  );

  readonly getExtra = this.selector((state) => state.extra);
  readonly getInputLenght = this.selector((state) => state.data.value.length);

  readonly getTotal = this.selector(
    this.getInputLenght,
    this.getExtra,
    (inputLength, extra) => inputLength + (extra ?? 0)
  );

  constructor() {
    super({ data: { value: '' } });
  }

  update(value: string): void {
    this.setState((state) => ({ ...state, data: { value } }));
  }

  clear() {
    this.setState(() => ({ data: { value: '' } }));
  }

  add() {
    this.setState((state) => ({ ...state, extra: (state.extra ?? 0) + 1 }));
  }
}
