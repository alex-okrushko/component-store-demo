import { Injectable } from '@angular/core';
import { Book } from './models';
import { Observable, timer } from 'rxjs';
import { getAuthorName, bookTitles } from './fake_data';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookService {
  getBook(id: string): Observable<Book> {
    return timer(Math.floor(Math.random() * 1000) + 1000).pipe(
      map(() => ({
        title: bookTitles[Number(id)],
        author: getAuthorName(id),
        pageCount: Math.floor(Math.random() * 1000),
      }))
    );
  }
}
