export class Answer {
    _id?: string;
    expireAt?: Date;
    deviceID?: string;
    questionID?: number;
    optionID?: number;
    nextID?:number;
    time?:number;
    day?:number;
    socialProb?:number[];
    currentColProb?:number;
    civilProtec?:string;
  }