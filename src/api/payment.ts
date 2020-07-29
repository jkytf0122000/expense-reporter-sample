import { Request, Response, NextFunction } from "express";
import Express from "express";
// import { Expense } from "../models/expense";
import { ExpenseRepository } from "./repositories/expense";
import { FindAllExpense } from "./usecases/FindAllExpense";
const router = Express.Router();

// POST / ユーザーの認証処理
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const expenseRepository = new ExpenseRepository();

  try {
    const usecase = new FindAllExpense(expenseRepository);
    usecase
      .execute()
      .then((results) => {
        console.log(results);
        res.status(200).json(results);
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
