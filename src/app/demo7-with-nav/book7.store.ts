import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap, filter, switchMap, map } from 'rxjs/operators';
import { Book } from '../models';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

type Status = 'unsaved' | 'loading' | 'loaded';
export interface BookState extends Book {
  status: Status;
}

@Injectable()
export class Book7Store extends ComponentStore<BookState> {
  constructor(
    private readonly bookService: BookService,
    activatedRoute: ActivatedRoute
  ) {
    super({ pageCount: 0, status: 'unsaved' });

    const bookId$: Observable<string> = activatedRoute.paramMap.pipe(
      map((params) => params.get('bookId') || '0')
    );
    this.getBook(bookId$);
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
    (state: BookState, { title, pageCount, author }: Book) => ({
      ...state,
      title,
      pageCount,
      author,
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
      tap(() => this.setBook({ pageCount: 0 })),
      switchMap((id) =>
        this.bookService.getBook(id).pipe(tap((book) => this.setBook(book)))
      ),
      tap(() => this.updateStatus('loaded'))
    )
  );
}
