import { Expense } from "../../models/expense";
import { IExpenseValue, ExpenseEntity } from "../domains/expenseEntity";
import { IExpenseRepository } from "../usecases/IExpenseRepository";

export class ExpenseRepository implements IExpenseRepository {
  findAll(): Promise<ExpenseEntity[]> {
    return Expense.findAll().then((results) => {
      return results.map((value, index, array) => {
        return ExpenseEntity.create(value);
      });
    });
    /*    return Expense.findAll()
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
      */
  }

  store(e: ExpenseEntity): Promise<IExpenseValue> {
    return Expense.create(
      e.read()
      /*{
      user_id: e.user_id,
      user_name: e.user_name,
      date: e.date,
      type: e.type,
      description: e.description,
      approval: e.approval,
      amount: e.amount,
    }
    */
    )
      .then((result) => {
        return result;
        /* {
          id: result.id,
          user_id: result.user_id,
          user_name: result.user_name,
          date: result.date,
          type: result.type,
          description: result.description,
          approval: result.approval,
          amount: result.amount,
        };
        */
      })
      .catch((err) => {
        throw new Error("請求処理が失敗しました");
      });
  }
}
