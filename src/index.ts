import Express from 'express';
const app = Express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 30 * 60 * 1000
  }
}));

// ルーティング
import index from './routes/index';
import login from './routes/login';
import expense from './routes/expense';

app.use('/', index);
app.use('/login', login);
app.use('/expense', expense);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})
