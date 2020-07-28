import { Expense } from "../domains/expense";

export interface IExpenseRepository {
  // findAll(): ExpenseValue[];
  // find(id: number): ExpenseValue;
  store(expense: Expense): Expense;
}
