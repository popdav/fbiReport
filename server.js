const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const cron = require('node-cron');
const app = express();
const indexRouter = require('./routes/index');
const {storeFBIMostWanted} = require('./services/fbi')

storeFBIMostWanted();
cron.schedule('0 0 */24 * * *', function(){
    storeFBIMostWanted();
});

const port = 3000;

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
  console.log(`App listening at http://localhost:${3000}`)
})