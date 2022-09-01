import Question from '../models/question';
import BaseCtrl from './base';
import { Request, Response } from 'express';

class QuestionCtrl extends BaseCtrl {
  model = Question;

  override get = async (req: Request, res: Response) => {
    try {
      const obj = await this.model.findOne({ questionID: req.params.id });
      return res.status(200).json(obj);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };
  override update = async (req: Request, res: Response) => {
    try {
      await this.model.findOneAndUpdate({ questionID: req.params.id }, req.body);
      return res.sendStatus(200);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
}

export default QuestionCtrl;