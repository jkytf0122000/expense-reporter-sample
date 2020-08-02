import { sequelize, Expense } from "../../models/expense";
import { Sequelize } from "sequelize";
import { approval_status } from "../common";
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

  findAllApproved(): Promise<ExpenseEntity[]> {
    return Expense.findAll({
      where: {
        approval: approval_status.approved,
      },
    }).then((results) => {
      return results.map((value, index, array) => {
        return ExpenseEntity.create(value);
      });
    });
  }

  findAllRejected(): Promise<ExpenseEntity[]> {
    return Expense.findAll({
      where: {
        approval: approval_status.reject,
      },
    }).then((results) => {
      return results.map((value, index, array) => {
        return ExpenseEntity.create(value);
      });
    });
  }

  findById(id: number): Promise<ExpenseEntity> {
    console.log(`id: ${id}`);
    return Expense.findOne({
      where: {
        id: id,
      },
    })
      .then((result) => {
        console.log("findById:");
        console.log(result);
        if (result) return ExpenseEntity.create(result);
        throw new Error("該当する経費がない");
      })
      .catch((err) => {
        throw new Error("アクセス障害が発生");
      });
  }

  updateApproval(id: number, expense: ExpenseEntity): Promise<ExpenseEntity> {
    return Expense.update(
      expense.read(),
      //      { approval: approval_status.approved },
      { where: { id: id } }
    )
      .then(() => {
        return this.findById(id);
      })
      .catch((err) => {
        throw new Error();
      });
  }

  findUnapproval(id: string): Promise<ExpenseEntity[]> {
    return Expense.findAll({
      where: Sequelize.literal(
        `approval = ${approval_status.unapproved} and user_id IN (SELECT id FROM users WHERE boss_id = '${id}')`
      ),
      /*
        user_id: {
//          $in: sequelize.literal(`(SELECT id FROM users WHERE bossid = ${id})`),
        },
        */
    }).then((results) => {
      return results.map((value, index, array) => {
        return ExpenseEntity.create(value);
      });
    });
  }

  store(e: ExpenseEntity): Promise<ExpenseEntity> {
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
        return ExpenseEntity.create(result);
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
