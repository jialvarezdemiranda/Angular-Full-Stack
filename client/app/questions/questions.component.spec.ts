import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';
import { QuestionService } from '../services/question.service';
import { QuestionsComponent } from './questions.component';
import { of, Observable } from 'rxjs';

class QuestionServiceMock {
  mockQuestions = [
    {
      "question" : "This is an example of a question",
      "questionID" : 1.0,
      "answers" : [
          {
              "text" : "Do action 1",
              "nextID" : 2.0
          },
          {
              "text" : "Do action 2",
              "nextID" : 3.0
          },
          {
              "text" : "Do action 3",
              "nextID" : 4.0
          },
          {
              "text" : "Do action 4",
              "nextID" : 5.0
          }
      ],
      "img" : "/img/exampleImage"
  },
  {
    "question" : "This is an example of a question 2",
    "questionID" : 6.0,
    "answers" : [
        {
            "text" : "Do action 1",
            "nextID" : 7.0
        },
        {
            "text" : "Do action 2",
            "nextID" : 8.0
        },
        {
            "text" : "Do action 3",
            "nextID" : 9.0
        },
        {
            "text" : "Do action 4",
            "nextID" : 10.0
        }
    ],
    "img" : "/img/exampleImage2"
},
  ];
  getQuestions(): Observable<object[]> {
    return of(this.mockQuestions);
  }
}

describe('Component: Questions', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ QuestionsComponent ],
      providers: [
        ToastComponent, UntypedFormBuilder,
        { provide: QuestionService, useClass: QuestionServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Current questions (2)');
  });

  it('should display the text for no questions', () => {
    component.questions = [];
    fixture.detectChanges();
    const headerEl = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(headerEl.textContent).toContain('Current questions (0)');
    const tdEl = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdEl.textContent).toContain('There are no questions in the DB. Add a new question below.');
  });

  it('should display current questions', () => {
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(8);
    expect(tds[0].nativeElement.textContent).toContain('Question 1');
    expect(tds[1].nativeElement.textContent).toContain('1');
    expect(tds[2].nativeElement.textContent).toContain('2');
    expect(tds[4].nativeElement.textContent).toContain('Question 2');
    expect(tds[5].nativeElement.textContent).toContain('3');
    expect(tds[6].nativeElement.textContent).toContain('4.2');
  });

  it('should display the edit and delete buttons', () => {
    const [btnEdit1, btnDelete1, btnEdit2, btnDelete2] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnEdit1.nativeElement).toBeTruthy();
    expect(btnEdit1.nativeElement.textContent).toContain('Edit');
    expect(btnDelete1.nativeElement).toBeTruthy();
    expect(btnDelete1.nativeElement.textContent).toContain('Delete');
    expect(btnEdit2.nativeElement).toBeTruthy();
    expect(btnEdit2.nativeElement.textContent).toContain('Edit');
    expect(btnDelete2.nativeElement).toBeTruthy();
    expect(btnDelete2.nativeElement.textContent).toContain('Delete');
  });

  it('should display the edit form', async () => {
    component.isEditing = true;
    component.question = {
      "question" : "This is an example of a question",
      "questionID" : 1.0,
      "answers" : [
          {
              "text" : "Do action 1",
              "nextID" : 2.0
          },
          {
              "text" : "Do action 2",
              "nextID" : 3.0
          },
          {
              "text" : "Do action 3",
              "nextID" : 4.0
          },
          {
              "text" : "Do action 4",
              "nextID" : 5.0
          }
      ],
      "img" : "/img/exampleImage"
  };
    fixture.detectChanges();
    await fixture.whenStable();
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(1);
    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formEl).toBeTruthy();
    const [inputName, inputAge, inputWeight] = fixture.debugElement.queryAll(By.css('input'));
    expect(inputName.nativeElement.value).toContain('Question 1');
    expect(inputAge.nativeElement.value).toContain('1');
    expect(inputWeight.nativeElement.value).toContain('2');
    const [btnSave, btnCancel] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnSave.nativeElement).toBeTruthy();
    expect(btnSave.nativeElement.textContent).toContain('Save');
    expect(btnCancel.nativeElement).toBeTruthy();
    expect(btnCancel.nativeElement.textContent).toContain('Cancel');
  });

});
