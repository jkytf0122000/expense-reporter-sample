import { IExpenseValue, ExpenseEntity } from "../domains/expenseEntity";

export interface IExpenseRepository {
  findAll(): Promise<ExpenseEntity[]>;
  // find(id: number): ExpenseValue;
  store(expense: ExpenseEntity): Promise<IExpenseValue>;
}
