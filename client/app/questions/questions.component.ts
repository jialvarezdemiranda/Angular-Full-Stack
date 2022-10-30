import { AsteroidService } from './../services/asteroid.service';
import { Answer } from './../shared/models/answer.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../services/question.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Question } from '../shared/models/question.model';
import { ActivatedRoute } from '@angular/router';

import { AnswerService } from '../services/answer.service';
import { HistoricAnswerService } from '../services/historicAnswer.service';

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
  parsedText?:string;
  img?:string;
  endNode?:boolean;
  options?:{
    optionID:number;
    text : string;
    nextID ?: number;
    nextID_s ?: number;
    nextID_f ?: number;
    threshold?:string;
     }[];
  optionSelected:any;
  deviceID:string="";
  optionNotChosen=false;
  asteroidProperties: {[key: string]: any}= {};
  deflectMethods: {[key: string]: any}= {};
  nextQuestion:number=-1;
  currentColProb?:any;
  socialProb:any;

  constructor(private questionService: QuestionService,
              public toast: ToastComponent, private route:ActivatedRoute, 
              private answerService: AnswerService,
              private historicAnswerService: HistoricAnswerService,
              private asteroidService: AsteroidService,) { 
              }

  ngOnInit(): void {

    this.deviceID=this.getDeviceId();
    const today = new Date();
      const day = today.getDate();
      let asteroid= this.asteroidService.getAsteroid(day);
        asteroid.subscribe((x) => {
          // Asteroid Properties
          this.asteroidProperties["P0"]=x.P0;
          this.asteroidProperties["dT"]=x.dT;
          this.asteroidProperties["dT_reduced"]=x.dT_reduced;
          this.asteroidProperties["E0"]=x.E0;
          this.asteroidProperties["Diameter"]=x.Diameter;
          // Sucess probabilities
          this.deflectMethods["Ps_NED"]=x.Ps_NED;
          this.deflectMethods["Ps_KI"]=x.Ps_KI;
          this.deflectMethods["Ps_LA"]=x.Ps_LA;
          this.deflectMethods["Ps_GT"]=x.Ps_GT;
          // Effectiveness of each method
          this.deflectMethods["dPc_NED"]=x.dPc_NED;
          this.deflectMethods["dPc_KI"]=x.dPc_KI;
          this.deflectMethods["dPc_LA"]=x.dPc_LA;
          this.deflectMethods["dPc_GT"]=x.dPc_GT;

          this.deflectMethods["dPc_NED_reduced"]=x.dPc_NED_reduced;
          this.deflectMethods["dPc_KI_reduced"]=x.dPc_KI_reduced;
          this.deflectMethods["dPc_LA_reduced"]=x.dPc_LA_reduced;
          this.deflectMethods["dPc_GT_reduced"]=x.dPc_GT_reduced;


        });
    this.route.params.subscribe( params => 
      {
        this.optionNotChosen=false;
        this.questionID = params["id"];
        this.nextQuestion=this.questionID;
        this.question= this.questionService.getQuestion(this.questionID);
        this.question.subscribe((x) => {
          this.text=x.question;
          this.parsedText=this.parseTextOfQuestion(this.text);
          this.img=x.img;
          this.options=x.options;
          this.endNode=x.endNode;
          
          if(this.questionID != 1){
            this.deviceID=this.getDeviceId();
            this.answerService.getLastAnswer(this.deviceID).subscribe(
              response => {
                console.log("Device ID:"+ this.deviceID)
                console.log("Response:");
                console.log(response);
                if(response.nextID!=undefined){
                  this.currentColProb= response.currentColProb;
                  this.socialProb= response.socialProb;
                  console.log("Valores tras leer la respuesta anterior:");
                  console.log("Social prob: " + this.socialProb);
                  console.log("Prob colision: " +  this.currentColProb);
                }
              }
            );
          }
          else{
            this.currentColProb=this.asteroidProperties['P0'];
            this.socialProb= [0.5,0.5,0.5];
            console.log("Social prob en question 1 al principio vale: " + this.socialProb);
          }

        });
      }); 
      
     
  }

  parseTextOfQuestion(text:any):any{
    let resul=text;
    if(resul!=undefined){
      resul=resul.replace(/\\n/g, "\n");

      //replace all var {{var}} for its value
      resul=resul.replace("{{P0}}", this.asteroidProperties["P0"]);
      resul=resul.replace("{{dT}}", this.asteroidProperties["dT"]);
      resul=resul.replace("{{dT_reduced}}", this.asteroidProperties["dT_reduced"]);
      resul=resul.replace("{{E0}}", this.asteroidProperties["E0"]);
      resul=resul.replace("\{\{Diameter\}\}", this.asteroidProperties["Diameter"]);

      resul=resul.replace("{{Ps_NED}}", this.deflectMethods["Ps_NED"]);
      resul=resul.replace("{{Ps_KI}}", this.deflectMethods["Ps_KI"]);
      resul=resul.replace("{{Ps_LA}}", this.deflectMethods["Ps_LA"]);
      resul=resul.replace("{{Ps_GT}}", this.deflectMethods["Ps_GT"]);

      resul=resul.replace("{{dPc_NED}}", this.deflectMethods["dPc_NED"]);
      resul=resul.replace("{{dPc_KI}}", this.deflectMethods["dPc_KI"]);
      resul=resul.replace("{{dPc_LA}}", this.deflectMethods["dPc_LA"]);
      resul=resul.replace("{{dPc_GT}}", this.deflectMethods["dPc_GT"]);

      resul=resul.replace("{{dPc_NED_reduced}}", this.deflectMethods["dPc_NED_reduced"]);
      resul=resul.replace("{{dPc_KI_reduced}}", this.deflectMethods["dPc_KI_reduced"]);
      resul=resul.replace("{{dPc_LA_reduced}}", this.deflectMethods["dPc_LA_reduced"]);
      resul=resul.replace("{{dPc_GT_reduced}}", this.deflectMethods["dPc_GT_reduced"]); }
    
    return resul;

  }



   setAction(optionSelected:any):void{
    this.optionSelected=optionSelected;
    if(this.optionSelected.nextID!=undefined){
      this.nextQuestion=this.optionSelected.nextID;
    }
    else {
      this.computeDice(optionSelected);
    }
    if(this.questionID == 2 || this.questionID == 3 || this.questionID == 8  ){
      this.socialProb=this.optionSelected.socialProb;
      console.log("Esto se ha ejecutado y ahora social prob vale: " + this.socialProb)
    }
    this.optionNotChosen=false;
  }

  computeDice(optionSelected:any):void{
      let thresholdName=this.optionSelected.threshold;
      let threshold;
      let efficacy;
      if(thresholdName === "currentColProb"){
         threshold= this.currentColProb;
      }
      else{
        if(optionSelected.efficacy != undefined){
          efficacy=optionSelected.efficacy;
        }
       threshold= 1-this.deflectMethods[thresholdName];
      }
      let valueRolled=Math.random();
      console.log("value rolled: " + valueRolled + " Threshold to beat (>) used: " + threshold + "Efficacy applied: " + efficacy);
      if(threshold !=undefined && valueRolled >= threshold  ){
        this.nextQuestion=this.optionSelected.nextID_s;
      }
      else {
        this.nextQuestion=this.optionSelected.nextID_f;
      }
  }

  private getDeviceId() {
    let deviceId = localStorage.getItem('deviceId')

    if(!deviceId) {
       deviceId="";
    }
    return deviceId
  }

  saveAnswer(optionSelected:{optionID:number, nextID:number, efficacy?:string},
            questionID:number|undefined,deviceID:string|undefined){

    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);

    const today = new Date();
    const day = today.getDate();
              
    if(optionSelected.nextID!=questionID){
      if(this.optionSelected.efficacy !=undefined){
        this.currentColProb=this.currentColProb-this.deflectMethods[this.optionSelected.efficacy];
      }
      let answer:Answer= {
        "expireAt":tomorrow,
        "deviceID":deviceID,
        "questionID":questionID,
        "optionID":optionSelected.optionID,
        "nextID":optionSelected.nextID,
        "time": Date.now(),
        "day": day, 
        "currentColProb":this.currentColProb,
        "socialProb":this.socialProb,       
      }
      this.answerService.addAnswer(answer).subscribe(
        response => {
        }
      );

      this.historicAnswerService.addAnswer(answer).subscribe(
        response => {
          console.log('Response saved');
        }
      );
    }
    else{
      this.optionNotChosen=true;
    }
    
  }

}
