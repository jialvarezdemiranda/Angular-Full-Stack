import { Router, Application } from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import QuestionCtrl from './controllers/question';
import AnswerCtrl from './controllers/answer';

const setRoutes = (app: Application): void => {
  const router = Router();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const questionCtrl = new QuestionCtrl();
  const answerCtrl = new AnswerCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

   // Questions
   router.route('/questions').get(questionCtrl.getAll);
   router.route('/questions/count').get(questionCtrl.count);
   router.route('/question').post(questionCtrl.insert);
   router.route('/question/:id').get(questionCtrl.get);
   router.route('/question/:id').put(questionCtrl.update);
   router.route('/question/:id').delete(questionCtrl.delete);

  // Answers
  router.route('/answers').get(answerCtrl.getAll);
  router.route('/answers/count').get(answerCtrl.count);
  router.route('/answer').post(answerCtrl.insert);
  router.route('/answer/:id').get(answerCtrl.get);
  router.route('/answer/:id').put(answerCtrl.update);
  router.route('/answer/:id').delete(answerCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

};

export default setRoutes;
