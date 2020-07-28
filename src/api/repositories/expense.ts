import { Expense, sequelize } from "../../models/expense";
import { ExpenseEntity, ExpenseValue } from "../domains/expense";
import { IExpenseRepository } from "../usecases/IExpenseRepository";

export class ExpenseRepository implements IExpenseRepository {
  store(e: ExpenseEntity): Promise<Expense> {
    return Expense.create({
      user_id: e.userId,
      user_name: e.userName,
      date: e.date,
      type: e.type,
      description: e.description,
      approval: e.approval,
      amount: e.amount,
    });
  }
}
