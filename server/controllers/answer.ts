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
  sumCountsDecision = async (req: Request, res: Response) => {
    try {
      const query = [{
        // @ts-ignore
        $match: { questionID: parseInt(req?.query?.questionID) }
      },
      {
        //@ts-ignore
        $match: { day: parseInt(req.query.day) }
      },
      {
        $group: {
          _id: '$optionID', count: { $sum: 1 }
        }
      }];
      console.log(JSON.stringify(query));


      const answers = await this.model.aggregate(query);

      return res.status(200).json(answers);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  countNumDeflectOutcome = async (req: Request, res: Response) => {
    try {
      const query= [

        {
          //@ts-ignore
          $match: { questionID: parseInt(req.query.questionID) }
        },
        {
          //@ts-ignore
          $match: { day: parseInt(req.query.day) }
        },
        {
          //@ts-ignore
          $match: { nextID: parseInt(req.query.outcome) }
        },
        {
          $group: {
            _id: '$deflectMethod', count: { $sum: 1 }
          }
        },

      ]
      const answers = await this.model.aggregate(query);

      return res.status(200).json(answers);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

}

 export default AnswerCtrl;