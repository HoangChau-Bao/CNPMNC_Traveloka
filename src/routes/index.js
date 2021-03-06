const newsRouter = require('./news');
const siteRouter = require('./site');
const vouchersRouter = require('./vouchers');
const adminRouter = require('./admin');
const userRouter = require('./user');
const apiRouter = require('./api');

function route(app) {
  app.use('/news', newsRouter);
  app.use('/vouchers', vouchersRouter);
  app.use('/admin', adminRouter);
  app.use('/user', userRouter);
  app.use('/api', apiRouter);
  app.use('/', siteRouter);
}

module.exports = route;
