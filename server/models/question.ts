import { Document, model, Schema } from 'mongoose';

const questionSchema = new Schema<IQuestion>({
  question: String,
  questionID: Number,
  options:[{
    optionID:Number,
    text : String,
    nextID : Number,
    nextID_s : Number,
    nextID_f : Number,
    threshold: String,
    socialProb:[Number],
    efficacy:String,

     }],
   img: String,
   endNode : Boolean,
});

interface IQuestion extends Document {
  question: string;
  questionID: number;
  options:{ optionID:number,text: string, nextid: number, nextID_s : number, nextID_f : number, threshold: string, socialProb:number []   }[];
  img: string;
  endNode : boolean;
  efficacy:string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Question = model<IQuestion>('Question', questionSchema);

export default Question;
