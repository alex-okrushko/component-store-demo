import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Author } from '../models';
import { filter, tap, switchMap } from 'rxjs/operators';
import { AuthorService } from '../author.service';

type Status = 'unsaved' | 'loading' | 'loaded';
export interface AuthorState extends Author {
  status: Status;
}

@Injectable()
export class Author5Store extends ComponentStore<AuthorState> {
  constructor(private readonly authorService: AuthorService) {
    super({ id: '', name: '', status: 'unsaved' });
  }

  getAuthorViewModel() {
    return this.select((state) => ({
      name: state.name,
      bookIds: state.bookIds,
      status: state.status,
      localState: state,
    }));
  }

  readonly name$ = this.select((state) => state.name);

  createNewBook = this.updater((state) => ({
    ...state,
    bookIds: (state.bookIds || []).concat(''),
  }));

  private readonly updateStatus = this.updater(
    (state: AuthorState, status: Status) => ({
      ...state,
      status,
    })
  );

  readonly setName = this.updater((state: AuthorState, name: string) => ({
    ...state,
    name,
  }));

  readonly setAuthor = this.updater(
    (state: AuthorState, { id, name, bookIds }: Author) => ({
      ...state,
      id,
      name,
      bookIds,
    })
  );

  readonly getAuthor = this.effect<string | undefined>((ids$) =>
    ids$.pipe(
      filter((id): id is string => !!id),
      tap(() => this.updateStatus('loading')),
      switchMap((id) =>
        this.authorService
          .getAuthor(id)
          .pipe(tap((author) => this.setAuthor(author)))
      ),
      tap(() => this.updateStatus('loaded'))
    )
  );
}
