import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Answer } from '../shared/models/answer.model';

@Injectable()
export class AnswerService {

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>('/api/answers');
  }

  countAnswers(): Observable<number> {
    return this.http.get<number>('/api/answers/count');
  }

  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>('/api/answer', answer);
  }

  getAnswer(answerID: number|undefined, deviceID:string|undefined): Observable<Answer> {
    // La ? indica que si deviceID es true, lo que sería si no es undefined, define options como {params: ....}
    // mientras que si es false, hace lo que pone despues de los : del final, que es dejar el options como un objeto vacío
    const options = deviceID ?
    { params: new HttpParams().set('deviceID', deviceID) } : {};
    
    return this.http.get<Answer>(`/api/answer/${answerID}`, options);
  }

  editAnswer(answer: Answer): Observable<any> {
    return this.http.put(`/api/answer/${answer._id}`, answer, { responseType: 'text' });
  }

  deleteAnswer(answer: Answer): Observable<any> {
    return this.http.delete(`/api/answer/${answer._id}`, { responseType: 'text' });
  }

}
