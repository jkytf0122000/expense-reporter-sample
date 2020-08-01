import { Request, Response, NextFunction } from "express";
import Express from "express";
import { ExpenseRepository } from "./repositories/expense";
import { FindUnapprovedExpense } from "./usecases/FindlUnapprovedExpense";
const router = Express.Router();

// 支払処理
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const expenseRepository = new ExpenseRepository();

  try {
    const usecase = new FindUnapprovedExpense(expenseRepository);
    usecase
      .execute(req.body.id)
      .then((results) => {
        console.log(results);
        res.status(200).json(
          results.map((value, index, arrya) => {
            return value.read();
          })
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ id: 20011, message: err });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ id: 20111, message: err });
  }

  /*
  Expense.findAll()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).json({ id: 20011, message: err });
    });
    */
});

export default router;
