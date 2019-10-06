import Express from 'express';
const router = Express.Router();
import { Expense } from '../../models/expense';

router.get('/', (req: Express.Request, res: Express.Response): void => {
  const user = req!.session!.user || '名無しの権兵衛';
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h1>Hello ${user}</h1><table><tr><th>ID</th><th>申請者名</th><th>日付</th><th>経費タイプ</th><th>経費詳細</th><th>金額</th></tr>`);
  Expense.findAll()
    .then(results => {
      for (let i in results) {
        res.write(`<tr><td>${results[i].id}</td><td>${results[i].user_name}</td><td>${results[i].date}</td><td>${results[i].type}</td><td>${results[i].description}</td><td>${results[i].amount}</td></tr>`);
      }
      res.write('</table><a href="/login">ログイン</a><br /><a href="/expenses/submit">経費入力</a><br /><a href="/expenses/payment">支払い処理</a>');
      res.end();
    });
});

export default router;