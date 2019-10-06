import Express from 'express';
const router = Express.Router();

// GET / 最初に開く画面
router.get('/', (req: Express.Request, res: Express.Response) => {
  const user = req!.session!.user || '名無しの権兵衛';
  res.send(`<h1>Hello ${user}</h1><a href="/login">ログイン</a><br /><a href="/expenses/submit">経費入力</a><br /><a href="/expenses/payment">支払い処理</a>`);
})

export default router;