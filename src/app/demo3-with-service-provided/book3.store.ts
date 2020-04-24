import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface BookState {
  author?: string;
  title?: string;
  pageCount: number;
}

@Injectable()
export class Book3Store extends ComponentStore<BookState> {
  constructor() {
    super({ pageCount: 0 });
  }

  readonly title$ = this.select((state) => state.title);
  readonly author$ = this.select((state) => state.author);
  readonly displayTitle$ = this.select(
    this.title$,
    this.author$,
    (title, author) => author && `${title} by ${author}`
  );
  readonly pageCount$ = this.select((state) => state.pageCount);

  // (1) explain this service
  // (2) create a ViewModel {
  //   title,
  //   displayTitle,
  //   pageCount,
  //   localState,
  // }

  setBook(book: BookState) {
    this.setState(() => book);
  }

  updateTitle(title: string) {
    this.setState((state) => ({ ...state, title }));
  }

  updatePageCount(pageCount: string) {
    this.setState((state) => ({ ...state, pageCount: Number(pageCount) }));
  }

  increasePageCount() {
    this.setState((state) => ({
      ...state,
      pageCount: (state.pageCount || 0) + 1,
    }));
  }
}
