// import { ExpenseEntity, ExpenseValue } from "../domains/expense";
import { IExpenseRepository } from "./IExpenseRepository";
import { ExpenseEntity, IExpenseValue } from "../domains/expenseEntity";
import { approval_status } from "../common";

export class UpdateExpense {
  private _expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this._expenseRepository = expenseRepository;
  }

  execute(expense: IExpenseValue) {
    const e = ExpenseEntity.create(expense);
    return this._expenseRepository
      .findById(e.read().id!)
      .then((result) => {
        if (
          result.read().approval === approval_status.reject &&
          e.read().user_id.toUpperCase() === result.read().user_id.toUpperCase()
        )
          return this._expenseRepository.update(e);
        else throw new Error("編集のできない経費です");
      })
      .catch((err) => {
        throw new Error("該当する経費がない");
      });
  }
}
