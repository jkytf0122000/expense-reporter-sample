import { ExpenseEntity, ExpenseValue } from "../domains/expense";
import { IExpenseRepository } from "./IExpenseRepository";

export class FindAllExpense {
  private _expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this._expenseRepository = expenseRepository;
  }

  execute() {
    return this._expenseRepository.findAll();
  }
}
