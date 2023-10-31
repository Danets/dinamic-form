import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl =
    ' https://global.lakmus.org/Dictionaries/icpc2?IsPublic=true';

  private http = inject(HttpClient);

  doctors$ = of(['John', 'Bob', 'Carl', 'Eleonora']).pipe(delay(3000));

  data$ = of([
    {
      id: 1477,
      chapterNumber: null,
      chapterName: '',
      blockNumber: '',
      blockName: '',
      code: '-50',
      name: 'Призначення ліків/ін’єкції ',
      shortName: '',
      isPublic: true,
    },
    {
      id: 1478,
      chapterNumber: null,
      chapterName: '',
      blockNumber: '',
      blockName: '',
      code: '-51',
      name: 'Розсічення /дренаж/промивання/аспірація ',
      shortName: '',
      isPublic: true,
    },
  ]);

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Client-side Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Server-side Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getDiagnoses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
