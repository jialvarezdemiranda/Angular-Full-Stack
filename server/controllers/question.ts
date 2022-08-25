import Question from '../models/question';
import BaseCtrl from './base';

class QuestionCtrl extends BaseCtrl {
  model = Question;
}

export default QuestionCtrl;