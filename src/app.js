// built-in
import path from 'path';
// external
import bodyParser from 'body-parser';
import express from 'express';
import config from './config';
import sns from './sns-receiver'

// EXPRESS SET-UP
// create app
const app = express();
//add middlewares
app.use(bodyParser.text());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use('/sns-receiver', sns)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// general errors
app.use((err, req, res, next) => {
  console.log("Error!!")
  console.log(err)
  const sc = err.status || 500;
  res.status(sc);
  res.send({
    status: sc,
    message: err.message,
    stack: config.env === 'development' ? err.stack : ''
  });
});



// START AND STOP
const server = app.listen(config.port, () => {
  console.log("Listening to port ", config.port)
});
process.on('SIGINT', () => {


  server.close();
  process.exit();
});
