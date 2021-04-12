const newsRouter = require('./news');
const siteRouter = require('./site');
const vouchersRoute = require('./vouchers');
const addvoucherRouter = require('./addvoucher');

function route(app) {
  app.use('/news', newsRouter);
  app.use('/addvoucher', addvoucherRouter);
  app.use('/vouchers', vouchersRoute);
  app.use('/', siteRouter);
}

module.exports = route;
