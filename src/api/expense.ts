import { Request, Response, NextFunction } from "express";
import Express from "express";
// import { Expense } from "../models/expense";
import { ExpenseRepository } from "./interfaces/expenseRepository";
import { ExpenseController } from "./interfaces/expenseController";
import { FindAllRejectedExpense } from "./usecases/FindAllRejectedExpense";
import { SubmitExpense } from "./usecases/SubmitExpense";
import { UpdateExpense } from "./usecases/UpdateExpense";
const router = Express.Router();

// 却下一覧の取得
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const expenseRepository = new ExpenseRepository();

  try {
    const usecase = new FindAllRejectedExpense(expenseRepository);
    usecase
      .execute()
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

// POST 経費の入力
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const e = new ExpenseController();

  e.submitExpenseController(req.body)
    ?.then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ id: "202101", message: err });
    });
});

// PUT 経費の更新
router.put("/", (req: Request, res: Response, next: NextFunction) => {
  const expenseRepository = new ExpenseRepository();

  try {
    const usecase = new UpdateExpense(expenseRepository);
    console.log("update body:");
    console.log(req.body);
    usecase
      .execute(req.body)
      .then((result) => {
        console.log(result);
        res.status(200).json(result.read());
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ id: 20002, message: err });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ id: 20201, message: err });
  }
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
