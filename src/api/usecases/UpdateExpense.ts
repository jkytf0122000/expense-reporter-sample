// import { ExpenseEntity, ExpenseValue } from "../domains/expense";
import { IExpenseRepository } from "./IExpenseRepository";
import { ExpenseEntity, IExpenseValue } from "../domains/expenseEntity";

export class UpdateExpense {
  private _expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this._expenseRepository = expenseRepository;
  }

  execute(expense: IExpenseValue) {
    const e = ExpenseEntity.create(expense);
    return this._expenseRepository.update(e);
  }
}
