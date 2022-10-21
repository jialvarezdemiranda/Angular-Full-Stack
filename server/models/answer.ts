import { Document, model, Schema } from 'mongoose';

const answerSchema = new Schema<IAnswer>({
    expireAt: Date,
    deviceID: String,
    questionID: Number,
    optionID: Number,
    nextID:Number,
    time:Number
});

interface IAnswer extends Document {
    expireAt: Date,
    deviceID: string,
    questionID: number,
    optionID: number,
    nextID:number,
    time:number
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Answer = model<IAnswer>('Answer', answerSchema);

export default Answer;