import Express from 'express';
const router = Express.Router();

// ユーザー&パスワード
const users = {
  'user01': 'p@ssw0rd',
  'user02': 'ewiojfsad'
};

// GET /login ユーザーログインフォーム
router.get('/', (req: Express.Request, res: Express.Response): void => {
  res.send('<h1>LOGIN</h1><form action="/login" method="post">ユーザーID：<input type="text" name="user" size="40"><br />パスワード<input type="password" name="password"><input type="submit" value="ログイン"><br /><a href="/login">ログイン</a><br /><a href="/expenses/submit">経費入力</a><br /><a href="/expenses/payment">支払い処理</a>');
});

// POST / ユーザーの認証処理
router.post('/', (req: Express.Request, res: Express.Response): void => {
  if (eval("users." + req.body.user) === req.body.password) {
    if (req.session) {
      req.session.user = req.body.user;
    }
  }
  res.redirect('/');
});

export default router;