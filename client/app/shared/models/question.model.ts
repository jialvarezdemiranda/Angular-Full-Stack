export class Question {
    _id?: string;
    question?: string;
    questionID?: number;
    answers?:{
      text : string;
      nextID : number
       }[];
    img?: string;
  }