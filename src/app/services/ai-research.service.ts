import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiResearchService {

  private apiUrl = 'http://localhost:8080/api/ai/research';

  constructor(private http: HttpClient) {}

  getResearch(prompt: string): Observable<string> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.get(this.apiUrl, { params, responseType: 'text' });
  }
}
