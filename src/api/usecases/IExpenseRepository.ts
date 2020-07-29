import { ExpenseValue, ExpenseEntity } from "../domains/expense";

export interface IExpenseRepository {
  findAll(): Promise<ExpenseValue[]>;
  // find(id: number): ExpenseValue;
  store(expense: ExpenseEntity): Promise<ExpenseValue>;
}
