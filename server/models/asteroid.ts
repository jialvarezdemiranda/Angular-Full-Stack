import { Document, model, Schema } from 'mongoose';

const asteroidSchema = new Schema<IAsteroid>({
    day:Number,
    P0: Number,
    dT: Number,
    dT_reduced: Number,
    E0:String,
    diameter: String,

    Ps_NED: Number,
    Ps_KI: Number,
    Ps_LA: Number,
    Ps_GT: Number,

    dPc_NED: Number,
    dPc_KI: Number,
    dPc_LA: Number,
    dPc_GT: Number,

    dPc_NED_reduced: Number,
    dPc_KI_reduced: Number,
    dPc_LA_reduced: Number,
    dPc_GT_reduced: Number,
});

interface IAsteroid extends Document {
    day:number,
    P0: number,
    dT: number,
    dT_reduced: number,
    E0:string,
    diameter: string,

    Ps_NED: number,
    Ps_KI: number,
    Ps_LA: number,
    Ps_GT: number,

    dPc_NED: number,
    dPc_KI: number,
    dPc_LA: number,
    dPc_GT: number,

    dPc_NED_reduced: number,
    dPc_KI_reduced: number,
    dPc_LA_reduced: number,
    dPc_GT_reduced: number,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Asteroid = model<IAsteroid>('Asteroid', asteroidSchema);

export default Asteroid;