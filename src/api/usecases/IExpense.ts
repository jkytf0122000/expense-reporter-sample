import { ExpenseValue } from "../domains/expense";

export interface IExpense {
  findAll(): ExpenseValue[];
  submit(): void;
  approve(): void;
  reject(): void;
  reimburse(): void;
}
