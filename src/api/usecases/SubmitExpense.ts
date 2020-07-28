import { Expense } from "../domains/expense";
import { IExpenseRepository } from "./IExpenseRepository";

export class SubmitExpense {
  private _expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this._expenseRepository = expenseRepository;
  }

  execute(expense: Expense) {
    return this._expenseRepository.store(expense);
  }
}
