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
  title?:string;
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
  civilProtec?:any;
  efficacy: any= undefined;
  deflectMethod: any;
  deflectSuccess: any;
  sideEffects: any;
  hasImage: any;
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
          this.title=x.title;
          this.parsedText=this.parseTextOfQuestion(this.text);
          this.img=x.img;
          if(this.img!=undefined){
            this.hasImage=true;
          }
          this.options=x.options;
          if(x.endNode!=undefined)
            this.endNode=!x.endNode; // We invert so we do not have to change the angular if
          else
            this.endNode=true;
          
          if(this.questionID != 1 && this.questionID != 4 ){
            this.deviceID=this.getDeviceId();
            this.answerService.getLastAnswer(this.deviceID).subscribe(
              response => {
                if(response.questionID!=undefined){
                  this.currentColProb= response.currentColProb;      
                  if(this.parsedText!= undefined){
                    this.currentColProb=Math.round((this.currentColProb + Number.EPSILON) * 100) / 100
                    this.parsedText=this.parsedText.replace("{{currentColProb}}", this.currentColProb);
                  }
                  this.socialProb= response.socialProb;
                  this.civilProtec= response.civilProtec;
                  this.deflectMethod=response.deflectMethod;
                  this.sideEffects=response.sideEffects;
                  if(this.questionID == 10 || this.questionID == 13 ){

                    let text= "Time flew by as you and your team worked tirelessly to put the plan into action. Against the expectations of the more pessimistic members of the group, you manage to complete your deflection mechanism on time."+ 
                    " You successfully apply the deflection technique, which according to the theoretical effectiveness you had estimated allows you to approximate the new collision probability as <strong>" + this.currentColProb + "</strong>.";
                    this.deflectSuccess=true;

                    

                    if(this.deflectMethod==="NED"){
                      let valueRolled=Math.random();
                      console.log("Value rolled: " + valueRolled);
                      console.log("To beat 0.5");
                      if(valueRolled >= 0.5){
                        text=text+ 
                        "<br><br>After detonating the nuclear explosive device, you proceed to perform a integrity analysis of the asteroid and estimate the extent of the radiation to check for the possible side effects you had estimated. Unfortunately, it seems that your initial calculations on the extent of the radiation were slightly wrong, and you estimate that a small part of the radiation will reach and contaminate part of the earth's surface. Not only that, but by monitoring the integrity of the asteroid you have found that several fragments of the rock have broken off in different directions due to the explosion. Right now you are not able to determine the trajectory of all the fragments and you can only wait to receive news of whether any of these pieces cause any damage.";
                        this.sideEffects="Nuclear contamination and damage to be assessed by possible asteroid fragments impacting the Earth.";
                      }
                      else{
                        text=text+
                        "<br><br>After detonating the nuclear explosive device, you proceed to perform a integrity analysis of the asteroid and estimate the extent of the radiation to check for the possible side effects you had estimated. Fortunately, the results of these studies show that there is no imminent danger of fragmentation and that the radiation levels do not pose a danger to Earth.";
                      }
                    }
                
                    if(this.deflectMethod==="KI"){
                      let valueRolled=Math.random();
                      console.log("Value rolled: " + valueRolled);
                      console.log("To beat 0.4");
                      if(valueRolled >= 0.4){
                        text=text+
                        "<br><br>After successfully colliding the impactor with the asteroid, you proceed to check the integrity of the rock to determine if there is a danger of fragmentation. Unfortunately, you have found that several fragments of the rock have broken off in different directions due to the heavy collision of the asteroid with the impactor.  At this time you are unable to determine the trajectory of all the fragments and can only wait to hear if any of these pieces cause any damage.";
                        this.sideEffects="Damage to be assessed by possible asteroid fragments impacting the Earth.";
                      }
                      else{
                        text=text+
                        "<br><br>After successfully colliding the impactor with the asteroid, you proceed to check the integrity of the rock to determine if there is a danger of fragmentation. To your relief, the results of this study show that there is no imminent danger of shattering."
                      }
                    }
                    this.parsedText=text + this.parsedText;
                  }
                  else{
                    this.deflectSuccess=response.deflectSuccess;
                  }
                }
                if(this.questionID == 6 || this.questionID == 7){
                  this.parsedText="";
                  this.finalNodeSocialText();
                }
              }
            );
          }
          else{
            if(this.questionID == 1){
              this.currentColProb=this.asteroidProperties['P0'];
              this.socialProb= [0.5,0.5,0.5,0];
              this.civilProtec= "notSet";
              this.deflectMethod="notSet";
              this.sideEffects="None";
              this.deflectSuccess=false;
              if(this.options!=undefined){
                for (let i = 0; i < this.options?.length; i++) {
                  this.asteroidProperties["waitTime"]= this.asteroidProperties["dT"]-this.asteroidProperties["dT_reduced"];
                  this.options[i].text=this.options[i].text.replace("{{waitTime}}", this.asteroidProperties["waitTime"]);
                }
              }
            }
            else{
              let variability= Math.random()*0.1;
              let sign=Math.random();
              if(sign>=0.5){
                this.currentColProb=this.asteroidProperties['P0']+variability;
              }
              else{
                this.currentColProb=this.asteroidProperties['P0']-variability;
              }
              this.socialProb= [0.5,0.5,0.5,0];
              this.civilProtec= "notSet";
              this.deflectMethod="notSet";
              this.sideEffects="None";
              this.deflectSuccess=false;
              if(this.parsedText!=undefined){
                this.currentColProb=Math.round((this.currentColProb + Number.EPSILON) * 100) / 100 // round two decimals
                this.parsedText=this.parsedText.replace("{{currentColProb}}", this.currentColProb);
              }
            }
          }

        });
      }); 
      
     
  }

  finalNodeSocialText(){
    let totalDeaths;
    let socialResponse="";
    let socialResponseImpact="";
    if(this.socialProb[3]==1){ // People unaware
      if(this.civilProtec=== "evacuation"){
        this.parsedText="With the time remaining, you begin to organize together with the different European governments a massive evacuation unprecedented in recent times. Initially, a large part of the population was reluctant to leave their homes, but thanks to the great effort of your team and the local authorities, you were able to move the vast majority of these people to inland sites with less risk of damage. From the authorities who have supported you in this immense operation, the cost of the evacuation is estimated at tens of millions of euros."+
        " Moreover, in the population there are a significant number of people who feel betrayed by your team, since they claim that information as relevant as the impact of an asteroid cannot be kept secret. In fact, different populist factions have emerged, supported by various political parties in opposition to the current governments, demanding that you and your team be prosecuted for negligence in your work. On the other hand, there are people within the governments who believe that you have acted cautiously and are trying to calm these claims. Only time will tell what such prosecutions will lead to... <br>";
        totalDeaths=2;
        socialResponse= "Tens of millions of euros spent to carry out a massive evacuation. Open legal proceedings against your group for possible negligence. ";
        socialResponseImpact=socialResponse;
      }
      else{
        if(this.civilProtec=== "shelter"){
          this.parsedText="With the remaining time, you begin to organize together with the different European governments an alert to the population to make them seek refuge. An important sector of the population, due to the sudden announcement of the threat of the asteroid, panicked and decided to follow the indications, but not before provoking some riots and looting in stores. The damage of these riots has not yet been accurately estimated. "+
          "Moreover, in the population there are a significant number of people who feel betrayed by your team, since they claim that information as relevant as the impact of an asteroid cannot be kept secret. In fact, different populist factions have emerged, supported by various political parties in opposition to the current governments, demanding that you and your team be prosecuted for negligence in your work. On the other hand, there are people within the governments who believe that you have acted cautiously and are trying to calm these claims. Only time will tell what such prosecutions will lead to...<br>";
          totalDeaths=12;
          socialResponse= "Damages caused by riots and looting of stores still to be estimated. Open legal proceedings against your group for possible negligence.";
          socialResponseImpact=socialResponse;
        }
        else{
          this.parsedText="Your team is confident that the asteroid impact will not occur, so taking civil protection measures would entail a significant monetary and social cost that may be avoidable. However, you are conscious that not warning the public could be fatal in the event that an impact does occur. You are also aware that if there is a disaster and you have not warned the population, you will most likely be prosecuted for negligence in your work.<br>";
          totalDeaths=45;
          socialResponse= "Population unaware of the danger, no damage was caused.";
          socialResponseImpact= "The population tries to look for the culprits of the disaster. Open legal proceedings against your group for possible negligence. ";
       
        }
      }
    }
    else{ // There was a previous communication

      let result = this.randomChoices(this.socialProb, 1);
      if(result[0]==0){ //Panic
        socialResponse= "Panic has gripped the population. There has been severe damage due to disturbances with the authorities and looting that has not yet been accurately estimated.";
        socialResponseImpact=socialResponse;
      }
      if(result[0]==1){ // Follow instructions
        socialResponse= "The majority of the population has adequately followed the instructions provided. Some people have panicked but the authorities have been able to avoid chaos.";

        socialResponseImpact=socialResponse;
      }
      if(result[0]==2){ // Conspiracy theories
        socialResponse= "A significant sector of the population has begun to spread conspiracy theories, which has caused a good part of the population to turn against following the instructions. In addition, this movement has caused part of the population to lose confidence in your team for future tasks.";
        socialResponseImpact=socialResponse;
      }

      if(this.civilProtec=== "evacuation"){
        socialResponse=socialResponse+ " Tens of millions of euros spent to carry out a massive evacuation"

        if(result[0]==0){
        this.parsedText="With the time remaining, you start to organize together with the different European governments a massive evacuation unprecedented in recent times. Unfortunately, as you feared, a large part of the population panicked, which made the operation extremely difficult. This outbreak of panic led to a series of riots and looting that made it impossible to evacuate the most uncooperative sectors of the population. On the part of the authorities who supported you in this immense operation, the cost of the evacuation is estimated at tens of millions of euros. <br>";
        totalDeaths=8;
        }
        else{
          if(result[0]==1){
            this.parsedText="With the time remaining, you begin to organize together with the different European governments a massive evacuation unprecedented in recent times. Initially, a large part of the population was reluctant to leave their homes, but thanks to the great effort of your team and the local authorities, you were able to move the vast majority of these people to inland sites with less risk of damage. From the authorities who have supported you in this immense operation, the cost of the evacuation is estimated at tens of millions of euros. <br>";
            totalDeaths=2;
            }
            else{
            this.parsedText="With the time remaining, you start to organize together with the different European governments a massive evacuation unprecedented in recent times. However, a part of the population proclaimed themselves as asteroid deniers, and refused to leave their homes. This popular movement made it difficult to evacuate the most uncooperative sectors of the population. On the part of the authorities who supported you in this immense operation, the cost of the evacuation is estimated at tens of millions of euros.<br>";
            totalDeaths=5;
            }
        }       
      }
      else{
        if(this.civilProtec=== "shelter"){
          if(result[0]==0){
            this.parsedText="With the remaining time, together with the different European governments, an alert to the population to seek refuge was organized. However, panic had taken hold of the population, which provoked a series of disturbances with the authorities and looting whose damages have not yet been estimated.<br>";
            totalDeaths=18;
            }
            else{
              if(result[0]==1){
                this.parsedText="With the remaining time, together with the different European governments, an alert to the population to seek refuge was organized. Although some people panicked because of the imminent danger, the authorities managed to control this conflictive group and got the majority of the population to follow the instructions.<br>";
                totalDeaths=9;
                }
                else{
                this.parsedText="With the remaining time, together with the different European governments, an alert to the population to seek refuge was organized. However, an important sector of the population declared themselves deniers of the existence of the asteroid, which caused them to start promoting conspiracy theories and made it difficult for people to follow the instructions.<br>";
                totalDeaths=15;
                }
            }

        }
        else{ // NO CIVIL PROTECTION

          if(result[0]==0){
            this.parsedText="Your team is confident that the asteroid impact will not occur, so taking civil protection measures would entail a significant monetary and social cost that may be avoidable. However, as you feared might happen, panic gripped a significant part of the population. As a result of this outbreak of fear, a series of riots against the authorities and looting took place, the damage of which has not yet been estimated.<br>";
            totalDeaths=55;
            }
            else{
              this.parsedText="Your team is confident that the asteroid impact will not occur, so taking civil protection measures would entail a significant monetary and social cost that may be avoidable. However, a significant segment of the population declared themselves to be asteroid denialists, arguing that the purpose of the previous information provided was manipulation.";
              totalDeaths=45;
              socialResponse= "An important sector of the population has begun to spread conspiracy theories, which has diminished the confidence of part of the population in your team for future tasks.";
              socialResponseImpact=socialResponse;
                
            }
        }
      }

    }
    this.finalImpactText(totalDeaths, socialResponse, socialResponseImpact);
  }
  finalImpactText(totalDeaths:number, socialResponse:string, socialResponseImpact:string) {



    if(this.questionID==6){
      this.parsedText=this.parsedText+
      
      "<br><br>Finally the moment of truth came when the asteroid's trajectory was close to Earth.  You were in the control room monitoring the asteroid's course in real time, and the tension was palpable when from the Earth's surface it was possible to discern a trail indicating the rock's course. At last, relief and euphoria broke out when you realized that the asteroid passed our planet and the probability of an impact is finally 0%.";

    }
    else{
      this.parsedText=this.parsedText+
      
      "<br><br>Finally, the moment of truth came when the asteroid's trajectory approached Earth.  You were in the control room following the asteroid's course in real time, and the tension was palpable when from the Earth's surface it was possible to discern a trace indicating the rock's course. Finally, there was silence in the room as the asteroid was watched as it curved more and more of its trajectory until it collided with the surface of the Atlantic Ocean on its border with the Celtic Sea. Fortunately, the impact zone was not an inhabited area, but the strong impact caused a series of tsunamis that severely damaged the coastal areas of France, the United Kingdom, Ireland and part of northern Spain. In addition to the tsunamis, the marine ecosystems that inhabited the impact zone are estimated to have been completely destroyed, in what could also be described as an ecological disaster.";
      

    }

    this.GameResultsText(totalDeaths,socialResponse,socialResponseImpact);
    
  }

  GameResultsText(totalDeaths:number, socialResponse:string, socialResponseImpact:string) {

    if(this.questionID==6){
      this.parsedText=this.parsedText+
      "<br><br><strong>THE END </strong><br><br>"+
      "Game results<br>"+

      "<strong>Asteroid impact:</strong> Avoided.<br>"+
      "<strong>% of population killed by the impact of the asteroid:</strong> 0% <br>"+
      "<strong>Social outcome:</strong> "+ socialResponse +" <br>" +
      "<strong>Side effects:</strong> "+ this.sideEffects +" <br><br>" +
      "Today's game is over, but tomorrow you will be able to access the same link to see the global statistics of the day and replay with a different asteroid. <br>"+
      "<br><strong>Thank you for playing!</strong>";

    }
    else{
      this.parsedText=this.parsedText+
      "<br><br><strong>THE END </strong><br><br>"+
        "Game results<br>"+

        "<strong>Asteroid impact:</strong> Impacted.<br>"+
        "<strong>Ecological outcome:</strong> Destruction of marine ecosystem<br>"+
        "<strong>% of population killed by the impact of the asteroid:</strong> "+ totalDeaths + "% of the population of the affected coastal areas <br>"+
        "<strong>Social response:</strong> "+ socialResponseImpact +" <br>" +
        "<strong>Side effects:</strong> "+ this.sideEffects +" <br><br>" +
        "Today's game is over, but tomorrow you will be able to access the same link to see the global statistics of the day and replay with a different asteroid. <br>"+
        "<br><strong>Thank you for playing!</strong>";
    }


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

      // convert TRLs to ints


      let intvalueNED = Math.trunc( this.deflectMethods["Ps_NED"] *10 );
      let intvalueKI = Math.trunc( this.deflectMethods["Ps_KI"] *10 );
      let intvalueLA = Math.trunc( this.deflectMethods["Ps_LA"] *10 );
      let intvalueGT = Math.trunc( this.deflectMethods["Ps_GT"] *10 );

      resul=resul.replace("{{Ps_NED}}", intvalueNED);
      resul=resul.replace("{{Ps_KI}}", intvalueKI);
      resul=resul.replace("{{Ps_LA}}", intvalueLA);
      resul=resul.replace("{{Ps_GT}}", intvalueGT);

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
      this.computeDice();
    }
    if(this.questionID == 2 || this.questionID == 3 || this.questionID == 8  ){
      this.socialProb=this.optionSelected.socialProb;
    }
    if(this.questionID == 5 || this.questionID == 12){
      this.deflectMethod=this.optionSelected.method;
    }

    if(this.questionID == 10 || this.questionID == 11 || this.questionID == 15 ||  
      this.questionID == 13 || this.questionID == 14 || this.questionID == 16){

      this.civilProtec=this.optionSelected.civilProtec;
    }
    this.optionNotChosen=false;
  }

  computeDice():void{
      this.efficacy=undefined; // In case someone clicks other method
      let thresholdName=this.optionSelected.threshold;
      let threshold;
      if(thresholdName === "currentColProb"){
         threshold= this.currentColProb;
      }
      else{
       threshold= 1-this.deflectMethods[thresholdName];
      }
      let valueRolled=Math.random();
      if(threshold !=undefined && valueRolled >= threshold  ){
        this.nextQuestion=this.optionSelected.nextID_s;
        if(this.questionID==5 || this.questionID==12){
          this.efficacy=this.optionSelected.efficacy;
        }
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
      if(this.efficacy !=undefined){
        this.currentColProb=this.currentColProb*(1-this.deflectMethods[this.optionSelected.threshold]* this.deflectMethods[this.efficacy]);
      }
      let answer:Answer= {
        "expireAt":tomorrow,
        "deviceID":deviceID,
        "questionID":questionID,
        "optionID":optionSelected.optionID,
        "nextID":this.nextQuestion,
        "time": Date.now(),
        "day": day, 
        "currentColProb":this.currentColProb,
        "socialProb":this.socialProb,
        "civilProtec":this.civilProtec,
        "deflectMethod":this.deflectMethod,
        "deflectSuccess":this.deflectSuccess,
        "sideEffects":this.sideEffects,           
      }
      this.answerService.addAnswer(answer).subscribe(
        response => {
        }
      );

      this.historicAnswerService.addAnswer(answer).subscribe(
        response => {
        }
      );
    }
    else{
      this.optionNotChosen=true;
    }
    
  }

   randomChoice(p: number[]) {
    let rnd = p.reduce( (a: any, b: any) => a + b ) * Math.random();
    return p.findIndex( (a: number) => (rnd -= a) < 0 );
}

 randomChoices(p: any, count: any) {
    return Array.from(Array(count), this.randomChoice.bind(null, p));
}


}
