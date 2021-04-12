
const newsRouter = require('./news')
const siteRouter = require('./site')
const addvoucherRouter = require('./addvoucher');

function route(app) {
    
    app.use('/news', newsRouter);
    app.use('/addvoucher', addvoucherRouter);
    app.use('/', siteRouter);
  }
  
module.exports = route;