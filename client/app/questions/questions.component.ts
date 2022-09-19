import { Answer } from './../shared/models/answer.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../services/question.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Question } from '../shared/models/question.model';
import { ActivatedRoute } from '@angular/router';

import { AnswerService } from '../services/answer.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  question?:Observable<Question>;
  questions: Question[] = [];
  questionID:number=-1;
  text?:string;
  img?:string;
  options?:{
    text : string;
    nextID : number
     }[];
  optionSelected={optionID:-1,text:'', nextID:-1};
  deviceID:string="";
  optionNotChosen=false;

  constructor(private questionService: QuestionService,
              public toast: ToastComponent, private route:ActivatedRoute, 
              private answerService: AnswerService) { 
              }

  ngOnInit(): void {

    this.deviceID=this.getDeviceId()
    this.route.params.subscribe( params => 
      {
        this.optionNotChosen=false;
        this.questionID = params["id"];
        this.optionSelected.nextID=this.questionID;
        this.question= this.questionService.getQuestion(this.questionID);
        this.question.subscribe((x) => {
          this.text=x.question;
          this.img=x.img;
          this.options=x.options;
        });
         
      });
    
  }


   setAction(optionSelected:any):void{
    this.optionSelected=optionSelected;
    this.optionNotChosen=false;
  }

  private getDeviceId() {
    let deviceId = localStorage.getItem('deviceId')

    if(!deviceId) {
       deviceId="";
    }
    return deviceId
  }

  saveAnswer(optionSelected:{optionID:number, nextID:number},
            questionID:number|undefined,deviceID:string|undefined){

    if(optionSelected.nextID!=questionID){
      console.log('Se esta creando el objeto');
      let answer:Answer= {
        "deviceID":deviceID,
        "questionID":questionID,
        "optionID":optionSelected.optionID,
        "nextID":optionSelected.nextID,
        "time": Date.now()      
      }
      this.answerService.addAnswer(answer).subscribe(
        response => {
          console.log(response);
        }


      );
      console.log('Se ha enviado al service');
    }
    else{
      this.optionNotChosen=true;
    }
    
  }

}
