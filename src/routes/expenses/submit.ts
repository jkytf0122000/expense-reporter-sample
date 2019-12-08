import Express from 'express';
const router = Express.Router();
import { Expense } from '../../models/expense';

// GET /expenses/submit 入力フォーム
router.post('/', (req: Express.Request, res: Express.Response): void => {
  Expense.create(req.body)
    .then(result => {
      res.redirect('/');
    });
});

// POST /expenses/submit 経費の申請
router.get('/', (req: Express.Request, res: Express.Response): void => {
  const user = req!.user!.email;
  const id = req!.user!.id;
  res.send(`<h2>経費入力</h2><form action="/expenses/submit" method="post">申請者名:<input type="text" name="user_name" value="${user}"><br />日付:<input type="date" name="date"><br />経費タイプ:<input type="text" name="type"><br />経費詳細:<input type="text" name="description"><br />金額:<input type="number" name="amount"><br /><input type="submit" value="経費申請"><br /><a href="/login">ログイン</a><br /><a href="/expenses/submit">経費入力</a><br /><a href="/expenses/payment">支払い処理</a>`);
});

export default router;