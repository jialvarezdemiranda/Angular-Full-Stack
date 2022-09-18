import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { AnswerService } from '../services/answer.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  deviceID?:string;
  hasPlayedBefore:boolean=false;
  nextID=1;

  constructor(private answerService: AnswerService) { }

ngOnInit(): void {
  this.deviceID=this.getDeviceId();
  this.answerService.getLastAnswer(this.deviceID).subscribe(
    response => {
      console.log(response);
      console.log(response.nextID)
      console.log(response.time)
      console.log(response.optionID)
      if(response.nextID!=undefined){
        this.hasPlayedBefore=true;
        this.nextID=response.nextID;
      }

    }
  );

}

private generateDeviceID(): string {
let deviceID=uuidv4();
return deviceID
}

private getDeviceId() {
  let deviceId = localStorage.getItem('deviceId')
  if(!deviceId) {
      deviceId = this.generateDeviceID()
      localStorage.setItem('deviceId', deviceId)
  }
  return deviceId
}
}
