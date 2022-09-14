import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Question } from '../shared/models/question.model';

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('/api/questions');
  }

  countQuestions(): Observable<number> {
    return this.http.get<number>('/api/questions/count');
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>('/api/question', question);
  }

  getQuestion(questionID: number|undefined, deviceID:string|undefined): Observable<Question> {
    // La ? indica que si deviceID es true, lo que sería si no es undefined, define options como {params: ....}
    // mientras que si es false, hace lo que pone despues de los : del final, que es dejar el options como un objeto vacío
   // const options = deviceID ?
    //{ params: new HttpParams().set('deviceID', deviceID) } : {};
    //Añadir el objeto options como segundo parámetro del get
    return this.http.get<Question>(`/api/question/${questionID}`);
  }

  editQuestion(question: Question): Observable<any> {
    return this.http.put(`/api/question/${question._id}`, question, { responseType: 'text' });
  }

  deleteQuestion(question: Question): Observable<any> {
    return this.http.delete(`/api/question/${question._id}`, { responseType: 'text' });
  }

}
