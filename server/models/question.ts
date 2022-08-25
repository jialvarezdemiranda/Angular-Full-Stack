import { Document, model, Schema } from 'mongoose';

const questionSchema = new Schema<IQuestion>({
  question: String,
  questionID: Number,
  answers:[{
    text : String,
    nextID : Number
     }],

   img: String,
});

interface IQuestion extends Document {
  question: string;
  questionID: number;
  answers:{ text: string, nextid: number }[];
  img: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Question = model<IQuestion>('Question', questionSchema);

export default Question;
