import { Injectable } from '@angular/core';
import { Book } from './model';
import { Observable, defer, of, timer } from 'rxjs';
import { authorNames, bookTitles } from '../fake_data';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Book4Service {
  getBook(id: string): Observable<Book> {
    return timer(Math.floor(Math.random() * 1000) + 1000).pipe(
      map(() => ({
        title: bookTitles[Number(id)],
        author: authorNames[Number(id)],
        pageCount: Math.floor(Math.random() * 1000),
      }))
    );
  }
}
