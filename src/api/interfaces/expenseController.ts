import { SubmitExpense } from "../usecases/SubmitExpense";
import { IExpenseValue } from "../domains/expenseEntity";
import { ExpenseRepository } from "./expenseRepository";

export class ExpenseController {
  async submitExpenseController(
    expense: IExpenseValue
  ): Promise<IExpenseValue> {
    const expenseRepository = new ExpenseRepository();

    try {
      const usecase = new SubmitExpense(expenseRepository);
      const result = await usecase.execute(expense);
      return result.read();
    } catch (error) {
      throw new Error(error);
    }

    /*
      .then((result) => {
          console.log(result);
          // res.status(200).json(result.read());
          return result.read();
        })
        .catch((err) => {
          console.log(err);
          throw new Error("");
          // res.status(400).json({ id: 20002, message: err });
        });
    } catch (err) {
      return Promise.reject(err);
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
  }
}
