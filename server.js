const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const indexRouter = require('./routes/index');

const config = require('./config.json');

const {setCronJob} = require('./services/fbi');
const {onStartCheck} = require('./services/index')

setCronJob();
onStartCheck();

const port = config.port;

const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})