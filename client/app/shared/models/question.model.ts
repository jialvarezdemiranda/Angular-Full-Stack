export class Question {
    _id?: string;
    question?: string;
    questionID?: number;
    options?:{
      text : string;
      nextID : number
       }[];
    img?: string;
  }