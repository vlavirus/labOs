import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../../main.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private httpClient: HttpClient,
  ) {}

  getData<T>(path: string): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${path}`);
  };
}

