import { Request, Response, NextFunction } from "express";
import Express from "express";
// import { Expense } from "../models/expense";
import { ExpenseRepository } from "./repositories/expense";
import { SubmitExpense } from "./usecases/SubmitExpense";
const router = Express.Router();

// POST 経費の入力
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const expenseRepository = new ExpenseRepository();

  const usecase = new SubmitExpense(expenseRepository);
  usecase
    .execute(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ id: 20002, message: err });
    });

  /*
  Expense.create(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ id: 20002, message: err });
    });
    */
});

export default router;
