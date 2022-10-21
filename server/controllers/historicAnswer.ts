import HistoricAnswer from '../models/historicAnswer';
import BaseCtrl from './base';
import { Request, Response } from 'express';

class HistoricAnswerCtrl extends BaseCtrl {
  model = HistoricAnswer;

   getLastAnswer = async (req: Request, res: Response) => {
    try {
      const answers = await this.model.find({ deviceID: req.params.id }).sort({time:-1}).limit(1);
      return res.status(200).json(answers[0]);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  override get = async (req: Request, res: Response) => {
    try {
      const obj = await this.model.findOne({ questionID: req.params.id });
      return res.status(200).json(obj);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  override delete = async (req: Request, res: Response) => {
    try {
      await this.model.findOneAndRemove({ questionID: req.params.id });
      return res.sendStatus(200);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

}

 export default HistoricAnswerCtrl;