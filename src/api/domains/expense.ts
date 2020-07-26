import { approval_status } from "../common/common";

export type ExpenseValue = {
  user_id: number;
  date: Date;
  type: string;
  description: string | null;
  approval: approval_status | undefined | null;
};

export class Expense {
  private _id!: number;
  private _user_id!: number;
  private _date!: Date;
  private _type!: string;
  private _description?: string | null;
  private _approval!: number;
  private _amount!: number;

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this._user_id;
  }

  get date(): Date {
    return this._date;
  }

  get type(): string {
    return this._type;
  }

  get description(): string {
    if (this._description) return this._description;
    return "none";
  }

  get approval(): approval_status {
    return this._approval;
  }

  set date(date: Date) {
    this._date = date;
  }

  set type(type: string) {
    this._type = type;
  }

  set description(description: string) {
    this._description = description;
  }

  set approval(status: approval_status) {
    this._approval = status;
  }

  constructor(e: ExpenseValue) {
    this._user_id = e.user_id;
    this._date = e.date;
    this._type = e.type;
    this._description = e.description;
    this._approval = e.approval || approval_status.unapproved;
  }
}
