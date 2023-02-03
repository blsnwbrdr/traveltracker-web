import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private currentApiStatus: BehaviorSubject<boolean>;
  obsCurrentApiStatus: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.currentApiStatus = new BehaviorSubject(false);
    this.obsCurrentApiStatus = this.currentApiStatus.asObservable();

    // SEND GOOGLE API KEY
    httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-N28oDuRuNqy9ScUMxMTVpOSZCbQ1EO8',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
      .subscribe((loaded) => {
        this.currentApiStatus.next(loaded);
      });
  }
}
