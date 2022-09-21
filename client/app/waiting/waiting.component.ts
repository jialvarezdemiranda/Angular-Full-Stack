import { Component } from '@angular/core';
import { AnswerService } from '../services/answer.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent {
  
  nextID=1;
  waitTime=9000;

  constructor(private answerService: AnswerService) { }

ngOnInit(): void {
 

}


private getDeviceId() {
  let deviceId = localStorage.getItem('deviceId')
  if(!deviceId) {
      deviceId = ""
  }
  return deviceId
}
}
