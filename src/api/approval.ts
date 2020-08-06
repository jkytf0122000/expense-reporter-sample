import { Request, Response, NextFunction } from "express";
import Express from "express";
import { ExpenseRepository } from "./interfaces/expenseRepository";
import { FindUnapprovedExpense } from "./usecases/FindlUnapprovedExpense";
import { UpdateApprovalExpense } from "./usecases/UpdateApprovalExpense";
const router = Express.Router();

// 承認の必要なリスト一覧の取得
router.get("/", (req: any, res: Response, next: NextFunction) => {
  console.log("approval");
  const expenseRepository = new ExpenseRepository();

  try {
    const usecase = new FindUnapprovedExpense(expenseRepository);
    usecase
      .execute(req.user.id)
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
});

router.put("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  const expenseRepository = new ExpenseRepository();

  try {
    const usecase = new UpdateApprovalExpense(expenseRepository);
    usecase
      .execute(req.body.id, req.body.status)
      .then((result) => {
        console.log(result);
        res.status(200).json(result.read());
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ id: 20011, message: err });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ id: 21001, message: err });
  }
});

export default router;
