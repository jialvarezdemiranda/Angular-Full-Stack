import { Router, Application } from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import QuestionCtrl from './controllers/question';
import AnswerCtrl from './controllers/answer';
import HistoricAnswerCtrl from './controllers/historicAnswer';
import AsteroidCtrl from './controllers/asteroid';

const setRoutes = (app: Application): void => {
  const router = Router();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const questionCtrl = new QuestionCtrl();
  const answerCtrl = new AnswerCtrl();
  const historicAnswerCtrl = new HistoricAnswerCtrl();
  const asteroidCtrl = new AsteroidCtrl();

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
  router.route('/answer/:id').get(answerCtrl.getLastAnswer);
  router.route('/answer/:id').put(answerCtrl.update);
  router.route('/answer/:id').delete(answerCtrl.delete);

  // historicAnswer
  router.route('/historicAnswers').get(historicAnswerCtrl.getAll);
  router.route('/historicAnswers/count').get(historicAnswerCtrl.count);
  router.route('/historicAnswer').post(historicAnswerCtrl.insert);
  router.route('/historicAnswer/:id').get(historicAnswerCtrl.get);
  router.route('/historicAnswer/:id').put(historicAnswerCtrl.update);
  router.route('/historicAnswer/:id').delete(historicAnswerCtrl.delete);

    // Asteroids
    router.route('/asteroids').get(asteroidCtrl.getAll);
    router.route('/asteroids/count').get(asteroidCtrl.count);
    router.route('/asteroid').post(asteroidCtrl.insert);
    router.route('/asteroid/:id').get(asteroidCtrl.get);
    router.route('/asteroid/:id').put(asteroidCtrl.update);
    router.route('/asteroid/:id').delete(asteroidCtrl.delete);
  
  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

};

export default setRoutes;
