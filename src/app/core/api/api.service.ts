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

  getData(path: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${path}`, {
      // responseType: 'text'
    });
  }
}

