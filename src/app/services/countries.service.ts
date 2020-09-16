import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

// INTERFACES
import { Countries } from '../interfaces/countries';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {
  // DEFINE PRIVATE DATA LOCATION
  private dataUrl = 'assets/data/countries.json';

  constructor(
    private http: HttpClient
  ) { }

  // PRIVATE HTTP ERROR HANDLING METHOD
  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    // console.error(errorMessage);
    return throwError(errorMessage);
  }

  // GET COUNTRIES METHOD
  getCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(this.dataUrl)
      .pipe(
        tap(),
        catchError(this.handleError)
      );
  }
}
