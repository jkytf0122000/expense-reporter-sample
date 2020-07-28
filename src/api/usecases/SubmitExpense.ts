import { ExpenseEntity, ExpenseValue } from "../domains/expense";
import { IExpenseRepository } from "./IExpenseRepository";

export class SubmitExpense {
  private _expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this._expenseRepository = expenseRepository;
  }

  execute(expense: ExpenseValue) {
    const e = new ExpenseEntity(expense);
    return this._expenseRepository.store(e);
  }
}
