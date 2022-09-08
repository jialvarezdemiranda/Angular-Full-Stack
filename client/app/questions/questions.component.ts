import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../services/question.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Question } from '../shared/models/question.model';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DeviceInfo } from 'ngx-device-detector/public-api';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  question?:Observable<Question>;
  questions: Question[] = [];
  questionID?:number;
  text?:string;
  img?:string;
  options?:{
    text : string;
    nextID : number
     }[];
  action = "";
  next=-1;
  deviceInfo:DeviceInfo;

  constructor(private questionService: QuestionService,
              public toast: ToastComponent, private route:ActivatedRoute, 
              private deviceService: DeviceDetectorService) { 
                this.deviceInfo = this.deviceService.getDeviceInfo();
              }

  ngOnInit(): void {
    //this.deviceInfo = this.deviceService.getDeviceInfo();
    //this.getQuestions();

    this.route.params.subscribe( params => 
      {
        this.questionID = params["id"];
        this.question= this.questionService.getQuestion(this.questionID);
        this.question.subscribe((x) => {
          this.text=x.question;
          this.img=x.img;
          this.options=x.options;
        });
         
      });
    
  }


  setAction(optionSelected:any):void{
    this.action=optionSelected.text;
    this.next=optionSelected.nextID;
  }

}
