import Express from 'express';
const router = Express.Router();

// GET / 最初に開く画面
router.get('/', (req: Express.Request, res: Express.Response) => {
  let user_name = '名無しの権兵衛';
  if (req.user)
    user_name = `${req.user.last_name} ${req.user.first_name}@${req.user.email}`;

  res.send(`<h1>Hello ${user_name}</h1><a href="/login">ログイン</a><br /><a href="/expenses/submit">経費入力</a><br /><a href="/expenses/payment">支払い処理</a>`);
})

export default router;