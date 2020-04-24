import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface BookState {
  author?: string;
  title?: string;
  pageCount: number;
}

@Injectable()
export class Book2Store extends ComponentStore<BookState> {
  constructor() {
    super({ pageCount: 0 });
  }
}
