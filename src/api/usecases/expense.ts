import { Expense, ExpenseValue } from "../domains/expense";
import { IExpense } from "./IExpense";
import { approval_status } from "../common/common";

export class ExpenseUseCase implements IExpense {
  private _expense: ExpenseValue;

  constructor(expense: ExpenseValue) {
    this._expense = expense;
  }

  findAll() {
    return [this._expense];
  }

  submit() {
    const result = new Expense(this._expense);
  }

  approve() {
    const e = new Expense(this._expense);
    e.approval = approval_status.approved;
  }

  reject() {
    const e = new Expense(this._expense);
    e.approval = approval_status.reject;
  }

  reimburse() {
    const e = new Expense(this._expense);
    e.approval = approval_status.reimburse;
  }
}
