import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Answer } from '../shared/models/answer.model';

@Injectable()
export class HistoricAnswerService {

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>('/api/historicAnswer');
  }

  countAnswers(): Observable<number> {
    return this.http.get<number>('/api/historicAnswer/count');
  }

  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>('/api/historicAnswer', answer);
  }

  getLastAnswer(deviceID:string|undefined): Observable<Answer> { 
    return this.http.get<Answer>(`/api/historicAnswer/${deviceID}`);
  }

  editAnswer(answer: Answer): Observable<any> {
    return this.http.put(`/api/historicAnswer/${answer._id}`, answer, { responseType: 'text' });
  }

  deleteAnswer(answer: Answer): Observable<any> {
    return this.http.delete(`/api/historicAnswer/${answer._id}`, { responseType: 'text' });
  }
}
