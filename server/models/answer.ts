import { Document, model, Schema } from 'mongoose';

const answerSchema = new Schema<IAnswer>({
    expireAt: Date,
    deviceID: String,
    questionID: Number,
    optionID: Number,
    nextID:Number,
    time:Number,
    day:Number,
    socialProb:[Number],
    currentColProb:Number,
    civilProtec: String,
    deflectMethod: String,
    deflectSuccess:Boolean,
    sideEffects:String,
    
});

interface IAnswer extends Document {
    expireAt: Date,
    deviceID: string,
    questionID: number,
    optionID: number,
    nextID:number,
    time:number,
    day:number,
    socialProb:number[],
    currentColProb:number,
    civilProtec:string,
    deflectMethod: string,
    deflectSuccess:boolean,
    sideEffects:string,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Answer = model<IAnswer>('Answer', answerSchema);

export default Answer;