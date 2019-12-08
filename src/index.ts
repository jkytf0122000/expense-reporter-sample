import Express from 'express';
const app = Express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/user';

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
// passport 初期化
app.use(passport.initialize());
app.use(passport.session());

// passport の認証定義
passport.use(new LocalStrategy({
  usernameField: 'user',
  passwordField: 'password'
}, (username, password, done) => {
  User.findOne({ where: { email: username } }).then(user => {
    if (!user || !bcrypt.compareSync(password, user.hash))
      return done(null, false);
    return done(null, user.get());
  })
}));

passport.serializeUser((user: User, done) => {
  return done(null, user);
});
passport.deserializeUser((user: User, done) => {
  User.findByPk(user.id).then(user => {
    if (user)
      done(null, user.get());
    done(false, null);
  })
});

// ログインチェック
app.use((req, res, next) => {
  if (req.isAuthenticated())
    return next();
  if (req.url === '/' || req.url === '/login')
    return next();
  res.redirect('/login');
});

// ルーティング
import index from './routes/index';
import login from './routes/login';
import payment from './routes/expenses/payment';
import submit from './routes/expenses/submit';

app.use('/', index);
app.use('/expenses/payment', payment);
app.use('/login', login);
app.use('/expenses/submit', submit);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

export default app;