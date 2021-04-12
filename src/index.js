const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

//Http logger
app.use(morgan('combined'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });