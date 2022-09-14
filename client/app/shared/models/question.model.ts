export class Question {
    _id?: string;
    question?: string;
    questionID?: number;
    options?:{
      optionID:number;
      text : string;
      nextID : number
       }[];
    img?: string;
  }