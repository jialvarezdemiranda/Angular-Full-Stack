import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../services/question.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Question } from '../shared/models/question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  question = new Question();
  questions: Question[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private questionService: QuestionService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe({
      next: data => this.questions = data,
      error: error => console.log(error),
      complete: () => this.isLoading = false
    });
  }

  enableEditing(question: Question): void {
    this.isEditing = true;
    this.question = question;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.question = new Question();
    this.toast.setMessage('Item editing cancelled.', 'warning');
    // reload the questions to reset the editing
    this.getQuestions();
  }

  editQuestion(question: Question): void {
    this.questionService.editQuestion(question).subscribe({
      next: () => {
        this.isEditing = false;
        this.question = question;
        this.toast.setMessage('Item edited successfully.', 'success');
      },
      error: error => console.log(error)
    });
  }

  deleteQuestion(question: Question): void {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.questionService.deleteQuestion(question).subscribe({
        next: () => {
          this.questions = this.questions.filter(elem => elem._id !== question._id);
          this.toast.setMessage('Item deleted successfully.', 'success');
        },
        error: error => console.log(error)
      });
    }
  }

}
