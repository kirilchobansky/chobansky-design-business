import express from "express";
const router = express.Router();

import projectsController from './controllers/projectsController';
// import authController from './controllers/userController';
// import commentsController from './controllers/commentsController';
// import ordersController from './controllers/ordersController'

router.use('/api/projects', projectsController);
// router.use('/api/users', authController);
// router.use('/api/comments', commentsController);
// router.use('/api/orders', ordersController);

export default router;
