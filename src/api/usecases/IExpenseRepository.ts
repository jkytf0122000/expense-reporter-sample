import { Expense } from "../../models/expense";
import { ExpenseEntity } from "../domains/expense";

export interface IExpenseRepository {
  // findAll(): ExpenseValue[];
  // find(id: number): ExpenseValue;
  store(expense: ExpenseEntity): Promise<Expense>;
}
