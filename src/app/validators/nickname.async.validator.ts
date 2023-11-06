import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NicknameAsyncValidator implements AsyncValidator {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  private http = inject(HttpClient);

  validate(
    control: AbstractControl<string | null>
  ): Observable<ValidationErrors | null> {
    return this.http
      .get<unknown[]>(`${this.apiUrl}?username=${control.value}`)
      .pipe(
        map((users) => (users.length === 0 ? null : { uniqueName: true })),
        catchError(() => of({ uniqueName: true }))
      );
  }
}
