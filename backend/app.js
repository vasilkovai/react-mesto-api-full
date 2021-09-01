const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser, signOut } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { validationSignIn, validationSignUp } = require('./middlewares/validator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');

const app = express();

app.use(helmet());

const { PORT = 3000 } = process.env;

app.use(cookieParser());

const options = {
  origin: [
    'http://localhost:3000',
    'https://mesto.project.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};

app.use('*', cors(options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.post('/signin', validationSignIn, login);
app.post('/signup', validationSignUp, createUser);
app.delete('/signout', signOut);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден.');
});

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
