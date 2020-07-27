import { Expense, ExpenseValue } from "../domains/expense";
import { IExpenseRepository } from "./IExpenseRepository";
// import { approval_status } from "../common";

export class SubmitExpense {
  private _expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this._expenseRepository = expenseRepository;
  }

  execute(expense: ExpenseValue) {
    const e = new Expense(expense);
    return this._expenseRepository.store(e);
  }
}
