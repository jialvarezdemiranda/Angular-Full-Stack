import Answer from '../models/answer';
import BaseCtrl from './base';
import { Request, Response } from 'express';

class AnswerCtrl extends BaseCtrl {
  model = Answer;

}

 export default AnswerCtrl;