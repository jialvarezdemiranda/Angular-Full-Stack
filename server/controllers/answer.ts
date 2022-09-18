import Answer from '../models/answer';
import BaseCtrl from './base';
import { Request, Response } from 'express';

class AnswerCtrl extends BaseCtrl {
  model = Answer;

   getLastAnswer = async (req: Request, res: Response) => {
    try {
      const answers = await this.model.find({ deviceID: req.params.id }).sort({time:-1}).limit(1);
      return res.status(200).json(answers[0]);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

}

 export default AnswerCtrl;