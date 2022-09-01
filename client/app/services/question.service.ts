import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getQuestion(question: Question): Observable<Question> {
    return this.http.get<Question>(`/api/question/${question._id}`);
  }

  editQuestion(question: Question): Observable<any> {
    return this.http.put(`/api/question/${question._id}`, question, { responseType: 'text' });
  }

  deleteQuestion(question: Question): Observable<any> {
    return this.http.delete(`/api/question/${question._id}`, { responseType: 'text' });
  }

}
