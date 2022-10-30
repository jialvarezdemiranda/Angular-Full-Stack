import { Document, model, Schema } from 'mongoose';

const historicAnswerSchema = new Schema<IAnswer>({
    expireAt: Date,
    deviceID: String,
    questionID: Number,
    optionID: Number,
    nextID:Number,
    time:Number,
    day:Number,
    socialProb:[Number],
    currentColProb:Number,
    civilProtec:String,
}
);

interface IAnswer extends Document {
    expireAt: Date,
    deviceID: string,
    questionID: number,
    optionID: number,
    nextID:number,
    time:number,
    day:number;
    socialProb:number[],
    currentColProb:number,
    civilProtec:string,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const HistoricAnswer = model<IAnswer>('HistoricAnswer', historicAnswerSchema);

export default HistoricAnswer;