import { Injectable } from '@angular/core';
import { Author } from './models';
import { Observable, timer } from 'rxjs';
import { authorBookMap, authorNames } from './fake_data';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  getAuthor(id: string): Observable<Author> {
    return timer(Math.floor(Math.random() * 1000) + 1000).pipe(
      map(() => ({
        id,
        name: authorNames[Number(id)],
        bookIds: authorBookMap[Number(id)],
      }))
    );
  }
}
