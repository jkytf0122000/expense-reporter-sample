import { IExpenseValue, ExpenseEntity } from "../domains/expenseEntity";
import { Expense } from "../../models/expense";

export interface IExpenseRepository {
  findAll(): Promise<ExpenseEntity[]>;
  findAllApproved(): Promise<ExpenseEntity[]>;
  findAllRejected(): Promise<ExpenseEntity[]>;
  findUnapproval(id: string): Promise<ExpenseEntity[]>;
  updateApproval(id: number, expense: ExpenseEntity): Promise<ExpenseEntity>;
  findById(id: number): Promise<ExpenseEntity>;
  update(expense: ExpenseEntity): Promise<ExpenseEntity>;
  store(expense: ExpenseEntity): Promise<ExpenseEntity>;
}
