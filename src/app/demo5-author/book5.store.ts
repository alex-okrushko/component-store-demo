import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap, filter, switchMap } from 'rxjs/operators';
import { Book } from '../models';
import { BookService } from '../book.service';
import { Author5Store } from './author5.store';

type Status = 'unsaved' | 'loading' | 'loaded';
export interface BookState extends Book {
  status: Status;
}

@Injectable()
export class Book4Store extends ComponentStore<BookState> {
  constructor(
    private readonly bookService: BookService,
    private readonly author5Store: Author5Store
  ) {
    super({ pageCount: 0, status: 'unsaved' });

    // (2) updater listing to name$
  }

  readonly title$ = this.select((state) => state.title);
  readonly author$ = this.select((state) => state.author);
  readonly displayTitle$ = this.select(
    this.title$,
    this.author$,
    (title, author) => author && `${title} by ${author}`
  );
  readonly pageCount$ = this.select((state) => state.pageCount);

  /** Creates a View Model for Book3 Component */
  getBookViewModel() {
    return this.select(
      this.title$,
      this.displayTitle$,
      this.pageCount$,
      this.state$,
      (title, displayTitle, pageCount, localState) => ({
        title,
        displayTitle,
        pageCount,
        localState,
        status: localState.status,
      })
    );
  }

  readonly setBookId = this.updater((state: BookState, id?: string) => ({
    ...state,
    id,
  }));

  readonly setBook = this.updater(
    (state: BookState, { id, title, pageCount }: Book) => ({
      ...state,
      id,
      title,
      pageCount,
    })
  );

  readonly updateTitle = this.updater((state: BookState, title: string) => ({
    ...state,
    title,
  }));

  readonly updatePageCount = this.updater(
    (state: BookState, pageCount: string) => ({
      ...state,
      pageCount: Number(pageCount),
    })
  );

  readonly increasePageCount = this.updater((state) => ({
    ...state,
    pageCount: (state.pageCount || 0) + 1,
  }));

  private readonly updateStatus = this.updater(
    (state: BookState, status: Status) => ({
      ...state,
      status,
    })
  );

  readonly getBook = this.effect<string | undefined>((ids$) =>
    ids$.pipe(
      filter((id): id is string => !!id),
      tap(() => this.updateStatus('loading')),
      switchMap((id) =>
        this.bookService.getBook(id).pipe(tap((book) => this.setBook(book)))
      ),
      tap(() => this.updateStatus('loaded'))
    )
  );
}
