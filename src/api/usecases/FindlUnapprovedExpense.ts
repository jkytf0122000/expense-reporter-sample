import { ExpenseEntity, ExpenseValue } from "../domains/expense";
import { IExpenseRepository } from "./IExpenseRepository";
import { sequelize } from "../../models/expense";
import { approval_status } from "../common";

export class FindUnapprovedExpense {
  private _expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this._expenseRepository = expenseRepository;
  }

  execute(id: string) {
    return this._expenseRepository.findUnapproval(id);
  }
}
