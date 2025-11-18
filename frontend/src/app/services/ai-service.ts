import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AiCompletionResponse } from '../models/ai-completion-response';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private http: HttpClient) {}

  getCompletion(codeContext: string): Observable<AiCompletionResponse> {
    const payLoad = { code: codeContext };

    return this.http
      .post<AiCompletionResponse>(environment.apiUrl, payLoad)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of({ suggestion: '' } as AiCompletionResponse);
        })
      );
  }
}
