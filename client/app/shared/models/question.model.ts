export class Question {
    _id?: string;
    question?: string;
    questionID?: number;
    options?:{
      optionID:number;
      text : string;
      nextID ?: number;
      nextID_s ?: number;
      nextID_f ?: number;
      threshold?:string;
      socialProb?:number[]
      efficacy?:string;
      civilProtec?:string;
      method?:string;
       }[];
    img?: string;
    endNode?:boolean;
    title?: string;
  }