import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { AnswerService } from '../services/answer.service';
import { QuestionService } from '../services/question.service';
Chart.register(...registerables);
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  communication: number[] = [];
  civilProtec: number[] = [];
  deflecResults_s: number[] = [];
  deflecResults_f: number[] = [];
  constructor(private questionService: QuestionService,
    private answerService: AnswerService
  ) { }

  ngOnInit(): void {
    const date = new Date();
    const day = date.getDate();
    this.getMethod(day);
    this.getComm(day);
    this.getCivilProtec(day);



    // console.log('this.communication');
    // console.log(this.communication);
    // console.log('this.civilProtec');
    // console.log(this.civilProtec);



  }

  renderBarChart(chartName: string, values: number[], xLabels: string[]) {
    var commChart = new Chart(chartName, {
      type: 'bar',
      data: {
        labels: xLabels,
        datasets: [{
          label: 'Nº of players',
          data: values,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderStackedBarChart(xLabels: string[], values_s: number[], values_f: number[]) {
    var stackedBar = new Chart("DeflecChart", {
      type: 'bar',
      data: {
        labels: xLabels,
        datasets: [{
          label: 'Colision avoided',
          data: values_s,
          borderWidth: 1
        },
        {
          label: 'Asteroid impacted',
          data: values_f,
          borderWidth: 1
        }

        ]
      },
      options: {
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }

  getComm(day: number): any {
    let communication = {
      "Alarming": 0,
      "Less alarming": 0,
      "No communication": 0
    }
    this.answerService.sumCountsDecision(2, day).subscribe(
      response => {
        if (response.length > 0) {
          for (const x of Array(response.length).keys()) {
            if (response[x]._id == 1) {
              communication['Alarming'] = communication['Alarming'] + response[x].count;
            }
            if (response[x]._id == 2) {
              communication['Less alarming'] = communication['Less alarming'] + response[x].count;
            }
            if (response[x]._id == 3) {
              communication['No communication'] = communication['No communication'] + response[x].count;
            }
          }
        }
        this.answerService.sumCountsDecision(3, day).subscribe(
          response => {
            if (response.length > 0) {
              for (const x of Array(response.length).keys()) {
                if (response[x]._id == 1) {
                  communication['Alarming'] = communication['Alarming'] + response[x].count;
                }
                if (response[x]._id == 2) {
                  communication['Less alarming'] = communication['Less alarming'] + response[x].count;
                }
                if (response[x]._id == 3) {
                  communication['No communication'] = communication['No communication'] + response[x].count;
                }
              }
            }
            this.answerService.sumCountsDecision(8, day).subscribe(
              response => {
                if (response.length > 0) {
                  for (const x of Array(response.length).keys()) {
                    if (response[x]._id == 1) {
                      communication['Alarming'] = communication['Alarming'] + response[x].count;
                    }
                    if (response[x]._id == 2) {
                      communication['Less alarming'] = communication['Less alarming'] + response[x].count;
                    }
                    if (response[x]._id == 3) {
                      communication['No communication'] = communication['No communication'] + response[x].count;
                    }
                  }
                }
                this.answerService.sumCountsDecision(9, day).subscribe(
                  response => {
                    if (response.length > 0) {
                      for (const x of Array(response.length).keys()) {
                        if (response[x]._id == 1) {
                          communication['Alarming'] = communication['Alarming'] + response[x].count;
                        }
                        if (response[x]._id == 2) {
                          communication['Less alarming'] = communication['Less alarming'] + response[x].count;
                        }
                        if (response[x]._id == 3) {
                          communication['No communication'] = communication['No communication'] + response[x].count;
                        }
                      }
                    }
                    console.log('Communication is: ')
                    console.log(communication);
                    this.communication.push(communication["Alarming"]);
                    this.communication.push(communication["Less alarming"]);
                    this.communication.push(communication["No communication"]);

                    const labels_comms = ['Alarming', 'Less Alarming', 'No communication'];
                    this.renderBarChart("commChart", this.communication, labels_comms);

                    //console.log(Object.keys(communication));
                    //console.log(communication["Alarming"])
                  }
                );

              }
            );

          }
        );
      }
    );

  }

  getCivilProtec(day: number): any {
    let protec_questions = [10, 11, 13, 14, 15, 16];
    let civilProtec = {
      "Mass evacuation": 0,
      "Seek shelter": 0,
      "None": 0
    };
    this.answerService.sumCountsDecision(10, day).subscribe(
      response => {
        if (response.length > 0) {
          for (const x of Array(response.length).keys()) {
            if (response[x]._id == 1) {
              civilProtec['Mass evacuation'] = civilProtec['Mass evacuation'] + response[x].count;
            }
            if (response[x]._id == 2) {
              civilProtec['Seek shelter'] = civilProtec['Seek shelter'] + response[x].count;
            }
            if (response[x]._id == 3) {
              civilProtec['None'] = civilProtec['None'] + response[x].count;
            }
          }
        }
        this.answerService.sumCountsDecision(11, day).subscribe(
          response => {
            if (response.length > 0) {
              for (const x of Array(response.length).keys()) {
                if (response[x]._id == 1) {
                  civilProtec['Mass evacuation'] = civilProtec['Mass evacuation'] + response[x].count;
                }
                if (response[x]._id == 2) {
                  civilProtec['Seek shelter'] = civilProtec['Seek shelter'] + response[x].count;
                }
                if (response[x]._id == 3) {
                  civilProtec['None'] = civilProtec['None'] + response[x].count;
                }
              }
            }
            this.answerService.sumCountsDecision(13, day).subscribe(
              response => {
                if (response.length > 0) {
                  for (const x of Array(response.length).keys()) {
                    if (response[x]._id == 1) {
                      civilProtec['Mass evacuation'] = civilProtec['Mass evacuation'] + response[x].count;
                    }
                    if (response[x]._id == 2) {
                      civilProtec['Seek shelter'] = civilProtec['Seek shelter'] + response[x].count;
                    }
                    if (response[x]._id == 3) {
                      civilProtec['None'] = civilProtec['None'] + response[x].count;
                    }
                  }
                }
                this.answerService.sumCountsDecision(14, day).subscribe(
                  response => {
                    if (response.length > 0) {
                      for (const x of Array(response.length).keys()) {
                        if (response[x]._id == 1) {
                          civilProtec['Mass evacuation'] = civilProtec['Mass evacuation'] + response[x].count;
                        }
                        if (response[x]._id == 2) {
                          civilProtec['Seek shelter'] = civilProtec['Seek shelter'] + response[x].count;
                        }
                        if (response[x]._id == 3) {
                          civilProtec['None'] = civilProtec['None'] + response[x].count;
                        }
                      }
                    }
                    this.answerService.sumCountsDecision(15, day).subscribe(
                      response => {
                        if (response.length > 0) {
                          for (const x of Array(response.length).keys()) {
                            if (response[x]._id == 1) {
                              civilProtec['Mass evacuation'] = civilProtec['Mass evacuation'] + response[x].count;
                            }
                            if (response[x]._id == 2) {
                              civilProtec['Seek shelter'] = civilProtec['Seek shelter'] + response[x].count;
                            }
                            if (response[x]._id == 3) {
                              civilProtec['None'] = civilProtec['None'] + response[x].count;
                            }
                          }
                        }
                        this.answerService.sumCountsDecision(16, day).subscribe(
                          response => {
                            if (response.length > 0) {
                              for (const x of Array(response.length).keys()) {
                                if (response[x]._id == 1) {
                                  civilProtec['Mass evacuation'] = civilProtec['Mass evacuation'] + response[x].count;
                                }
                                if (response[x]._id == 2) {
                                  civilProtec['Seek shelter'] = civilProtec['Seek shelter'] + response[x].count;
                                }
                                if (response[x]._id == 3) {
                                  civilProtec['None'] = civilProtec['None'] + response[x].count;
                                }
                              }
                            }
                            console.log('civilProtec is: ')
                            console.log(civilProtec);
                            this.civilProtec.push(civilProtec["Mass evacuation"]);
                            this.civilProtec.push(civilProtec["Seek shelter"]);
                            this.civilProtec.push(civilProtec["None"]);

                            const labels_civilProtec = ['Mass evacuation', 'Seek shelter', 'None'];
                            this.renderBarChart("civilProtecChart", this.civilProtec, labels_civilProtec);

                          }
                        );

                      }
                    );

                  }
                );

              }
            );

          }
        );

      }
    );


  }

  getMethod(day:number){
    let method_questions=[10,11,13,14];
    let deflec_s={
      "NED":0,
      "KI":0,
      "LA":0,
      "GT":0,
    }
    this.answerService.countNumDeflectOutcome(10, day,6).subscribe(
      response => {
        if(response.length>0){
          for (const x of Array(response.length).keys()) {
            if(response[x]._id==="NED"){
              deflec_s['NED']=deflec_s['NED']+ response[x].count;
            }
            if(response[x]._id=="KI"){
              deflec_s['KI']=deflec_s['KI']+ response[x].count;
            }
            if(response[x]._id=="LA"){
              deflec_s['LA']=deflec_s['LA']+ response[x].count;
            }
            if(response[x]._id=="GT"){
              deflec_s['GT']=deflec_s['GT']+ response[x].count;
            }
          }
        }
        this.answerService.countNumDeflectOutcome(11, day,6).subscribe(
          response => {
            if(response.length>0){
              for (const x of Array(response.length).keys()) {
                if(response[x]._id==="NED"){
                  deflec_s['NED']=deflec_s['NED']+ response[x].count;
                }
                if(response[x]._id=="KI"){
                  deflec_s['KI']=deflec_s['KI']+ response[x].count;
                }
                if(response[x]._id=="LA"){
                  deflec_s['LA']=deflec_s['LA']+ response[x].count;
                }
                if(response[x]._id=="GT"){
                  deflec_s['GT']=deflec_s['GT']+ response[x].count;
                }
              }
            }
            this.answerService.countNumDeflectOutcome(13, day,6).subscribe(
              response => {
                if(response.length>0){
                  for (const x of Array(response.length).keys()) {
                    if(response[x]._id==="NED"){
                      deflec_s['NED']=deflec_s['NED']+ response[x].count;
                    }
                    if(response[x]._id=="KI"){
                      deflec_s['KI']=deflec_s['KI']+ response[x].count;
                    }
                    if(response[x]._id=="LA"){
                      deflec_s['LA']=deflec_s['LA']+ response[x].count;
                    }
                    if(response[x]._id=="GT"){
                      deflec_s['GT']=deflec_s['GT']+ response[x].count;
                    }
                  }
                }
                this.answerService.countNumDeflectOutcome(14, day,6).subscribe(
                  response => {
                    if(response.length>0){
                      for (const x of Array(response.length).keys()) {
                        if(response[x]._id==="NED"){
                          deflec_s['NED']=deflec_s['NED']+ response[x].count;
                        }
                        if(response[x]._id=="KI"){
                          deflec_s['KI']=deflec_s['KI']+ response[x].count;
                        }
                        if(response[x]._id=="LA"){
                          deflec_s['LA']=deflec_s['LA']+ response[x].count;
                        }
                        if(response[x]._id=="GT"){
                          deflec_s['GT']=deflec_s['GT']+ response[x].count;
                        }
                      }
                    }
                    console.log("deflec_s");
                    console.log(deflec_s);
                    this.deflecResults_s.push(deflec_s["NED"]);
                    this.deflecResults_s.push(deflec_s["KI"]);
                    this.deflecResults_s.push(deflec_s["LA"]);
                    this.deflecResults_s.push(deflec_s["GT"]);
                  }
                );
                
              }
            );
            
          }
        );
        
      }
    );
  
    let deflec_f={
      "NED":0,
      "KI":0,
      "LA":0,
      "GT":0,
    }
    this.answerService.countNumDeflectOutcome(10, day,7).subscribe(
      response => {
        if(response.length>0){
          for (const x of Array(response.length).keys()) {
            if(response[x]._id==="NED"){
              deflec_f['NED']=deflec_f['NED']+ response[x].count;
            }
            if(response[x]._id=="KI"){
              deflec_f['KI']=deflec_f['KI']+ response[x].count;
            }
            if(response[x]._id=="LA"){
              deflec_f['LA']=deflec_f['LA']+ response[x].count;
            }
            if(response[x]._id=="GT"){
              deflec_f['GT']=deflec_f['GT']+ response[x].count;
            }
          }
        }
        this.answerService.countNumDeflectOutcome(11, day,7).subscribe(
          response => {
            if(response.length>0){
              for (const x of Array(response.length).keys()) {
                if(response[x]._id==="NED"){
                  deflec_f['NED']=deflec_f['NED']+ response[x].count;
                }
                if(response[x]._id=="KI"){
                  deflec_f['KI']=deflec_f['KI']+ response[x].count;
                }
                if(response[x]._id=="LA"){
                  deflec_f['LA']=deflec_f['LA']+ response[x].count;
                }
                if(response[x]._id=="GT"){
                  deflec_f['GT']=deflec_f['GT']+ response[x].count;
                }
              }
            }
            this.answerService.countNumDeflectOutcome(13, day,7).subscribe(
              response => {
                if(response.length>0){
                  for (const x of Array(response.length).keys()) {
                    if(response[x]._id==="NED"){
                      deflec_f['NED']=deflec_f['NED']+ response[x].count;
                    }
                    if(response[x]._id=="KI"){
                      deflec_f['KI']=deflec_f['KI']+ response[x].count;
                    }
                    if(response[x]._id=="LA"){
                      deflec_f['LA']=deflec_f['LA']+ response[x].count;
                    }
                    if(response[x]._id=="GT"){
                      deflec_f['GT']=deflec_f['GT']+ response[x].count;
                    }
                  }
                }
                this.answerService.countNumDeflectOutcome(14, day,7).subscribe(
                  response => {
                    if(response.length>0){
                      for (const x of Array(response.length).keys()) {
                        if(response[x]._id==="NED"){
                          deflec_f['NED']=deflec_f['NED']+ response[x].count;
                        }
                        if(response[x]._id=="KI"){
                          deflec_f['KI']=deflec_f['KI']+ response[x].count;
                        }
                        if(response[x]._id=="LA"){
                          deflec_f['LA']=deflec_f['LA']+ response[x].count;
                        }
                        if(response[x]._id=="GT"){
                          deflec_f['GT']=deflec_f['GT']+ response[x].count;
                        }
                      }
                    }
                    console.log("deflec_f");
                    console.log(deflec_f);
                    this.deflecResults_f.push(deflec_f["NED"]);
                    this.deflecResults_f.push(deflec_f["KI"]);
                    this.deflecResults_f.push(deflec_f["LA"]);
                    this.deflecResults_f.push(deflec_f["GT"]);
                    const labels_Deflect_Methods = ['NED', 'KI', 'LA', 'GT'];
                    this.renderStackedBarChart(labels_Deflect_Methods,this.deflecResults_s,
                                               this.deflecResults_f);
                  }
                );
                
              }
            );
            
          }
        );
        
      }
    );
  }

}
