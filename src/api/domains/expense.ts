import { approval_status } from "../common";

export interface ExpenseValue {
  id?: number;
  user_id: number;
  user_name?: string;
  date: Date;
  type: string;
  description?: string | null;
  approval?: approval_status;
  amount: number;
}

export const MAX_LENGTH = 64;
export const MAX_AMOUNT = 1000000;

export class ExpenseEntity {
  private _id?: number | null;
  private _user_id!: number;
  private _user_name?: string;
  private _date!: Date;
  private _type!: string;
  private _description?: string | null;
  private _approval!: approval_status;
  private _amount!: number;

  get id(): number | null {
    if (this._id) return this._id;
    return null;
  }

  get userId(): number {
    return this._user_id;
  }

  get userName(): string {
    if (this._user_name) return this._user_name;
    return "";
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

  get amount(): number {
    return this._amount;
  }

  set date(date: Date) {
    this._date = date;
  }

  set type(type: string) {
    if (type.length > MAX_LENGTH) throw new Error("費目名が長い");
    this._type = type;
  }

  set description(description: string) {
    this._description = description;
  }

  set approval(status: approval_status) {
    if (status <= approval_status.minimum || status >= approval_status.maximum)
      throw new Error("承認コードがおかしい");
    this._approval = status;
  }

  set amount(amount: number) {
    if (amount <= 0 || amount >= MAX_AMOUNT)
      throw new Error("請求金額が範囲を超えている");
    this._amount = amount;
  }

  constructor(e: ExpenseValue) {
    this._id = e.id || null;
    this._user_id = e.user_id;
    this._user_name = e.user_name || "";
    this.date = e.date;
    this.type = e.type;
    this.description = e.description || "";
    this.approval = e.approval || approval_status.unapproved;
    this.amount = e.amount;
  }
}
