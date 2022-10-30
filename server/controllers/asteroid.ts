import Asteroid from '../models/asteroid';
import BaseCtrl from './base';
import { Request, Response } from 'express';

class AsteroidCtrl extends BaseCtrl {
  model = Asteroid;

  override get = async (req: Request, res: Response) => {
    try {
      const obj = await this.model.findOne({ day: req.params.id });
      return res.status(200).json(obj);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };
  override update = async (req: Request, res: Response) => {
    try {
      await this.model.findOneAndUpdate({ day: req.params.id }, req.body);
      return res.sendStatus(200);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  override delete = async (req: Request, res: Response) => {
    try {
      await this.model.findOneAndRemove({ day: req.params.id });
      return res.sendStatus(200);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
}

export default AsteroidCtrl;