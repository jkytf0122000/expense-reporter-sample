// import { ExpenseEntity, ExpenseValue } from "../domains/expense";
import { IExpenseRepository } from "./IExpenseRepository";
import { ExpenseEntity, IExpenseValue } from "../domains/expenseEntity";

export class UpdateApprovalExpense {
  private _expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this._expenseRepository = expenseRepository;
  }

  execute(id: number, status: number) {
    return this._expenseRepository
      .findById(id)
      .then((result) => {
        result.approval = status;
        return this._expenseRepository.updateApproval(id, result);
        //        return this._expenseRepository.store(e);
      })
      .catch((err) => {
        throw new Error("該当する経費がない");
      });
  }
}
