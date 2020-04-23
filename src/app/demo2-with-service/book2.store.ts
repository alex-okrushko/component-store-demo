import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface ComponentState {
  author?: string;
  title?: string;
  pageCount: number;
}

@Injectable()
export class Book2Store extends ComponentStore<ComponentState> {
  constructor() {
    super({ pageCount: 0 });
  }
}
