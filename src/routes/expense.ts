import Express from 'express';
const router = Express.Router();
import { Expense } from '../models/expense';

router.post('/', (req: Express.Request, res: Express.Response): void => {
  Expense.create(req.body)
    .then(() => {
      res.redirect('/');
    });
});

router.get('/', (req: Express.Request, res: Express.Response): void => {
  const user = req!.session!.user || '名無しの権兵衛';
  res.send(`<h2>経費入力</h2><form action="/expense" method="post">申請者名:<input type="text" name="user_name" value="${user}"><br />日付:<input type="date" name="date"><br />経費タイプ:<input type="text" name="type"><br />経費詳細:<input type="text" name="description"><br />金額:<input type="number" name="amount"><br /><input type="submit" value="経費申請">`);
});

export default router;