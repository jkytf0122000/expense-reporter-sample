import { Request, Response, NextFunction } from "express";
import Express from "express";
import { Expense } from "../models/expense";
const router = Express.Router();

// POST / ユーザーの認証処理
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Expense.findAll()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).json({ id: 20011, message: err });
    });
});

export default router;
