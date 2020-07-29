import { Expense } from "../../models/expense";
import { ExpenseValue, ExpenseEntity } from "../domains/expense";
import { IExpenseRepository } from "../usecases/IExpenseRepository";

export class ExpenseRepository implements IExpenseRepository {
  findAll(): Promise<ExpenseValue[]> {
    return Expense.findAll()
      .then((results) => {
        return results.map((value, index, array) => {
          return {
            id: value.id,
            user_id: value.user_id,
            user_name: value.user_name,
            date: value.date,
            type: value.type,
            description: value.description,
            approval: value.approval,
            amount: value.amount,
          };
        });
      })
      .catch((err) => {
        throw new Error("取得に失敗しました");
      });
  }

  store(e: ExpenseEntity): Promise<ExpenseValue> {
    return Expense.create({
      user_id: e.userId,
      user_name: e.userName,
      date: e.date,
      type: e.type,
      description: e.description,
      approval: e.approval,
      amount: e.amount,
    })
      .then((result) => {
        return {
          id: result.id,
          user_id: result.user_id,
          user_name: result.user_name,
          date: result.date,
          type: result.type,
          description: result.description,
          approval: result.approval,
          amount: result.amount,
        };
      })
      .catch((err) => {
        throw new Error("請求処理が失敗しました");
      });
  }
}
