import { EntityObject, approval_status, PrimitiveObject } from "../common";

export const MAX_LENGTH = 64;
export const MAX_AMOUNT = 1000000;

// 費目名の規則
class Type extends PrimitiveObject<string> {
  static create(value: string): Type {
    if (value.length > MAX_LENGTH || value.length <= 0)
      throw new Error("費目名が長すぎるか、ありません");
    return new Type(value);
  }
}

// 承認コードの規則
class Approval extends PrimitiveObject<approval_status> {
  static create(value: approval_status = approval_status.unapproved): Approval {
    if (value <= approval_status.minimum || value >= approval_status.maximum)
      throw new Error("承認コードがおかしい");
    return new Approval(value);
  }
}

// 請求金額の規則
class Amount extends PrimitiveObject<number> {
  static create(value: number): Amount {
    if (value <= 0 || value >= MAX_AMOUNT)
      throw new Error("請求金額が範囲を超えている");
    return new Amount(value);
  }
}

// 経費精算で利用されるクラスの実態
interface IExpenseProps {
  id?: number | undefined;
  user_id: string;
  user_name?: string;
  date: Date;
  type: Type;
  description?: string | null;
  approval: Approval;
  amount: Amount;
}

// オブジェクトを構成する要素
export interface IExpenseValue {
  id?: number | undefined;
  user_id: string;
  user_name?: string;
  date: Date;
  type: string;
  description?: string | null;
  approval: approval_status;
  amount: number;
}

export class ExpenseEntity extends EntityObject<IExpenseProps> {
  constructor(props: IExpenseProps) {
    super(props);
  }

  set approval(status: approval_status) {
    this.props.approval = Approval.create(status);
  }

  static create(values: IExpenseValue): ExpenseEntity {
    return new ExpenseEntity({
      id: values.id,
      user_id: values.user_id,
      user_name: values.user_name,
      date: values.date,
      type: Type.create(values.type),
      description: values.description,
      approval: Approval.create(values.approval),
      amount: Amount.create(values.amount),
    });
  }

  public read(): IExpenseValue {
    return {
      id: this.props.id,
      user_id: this.props.user_id,
      user_name: this.props.user_name,
      date: this.props.date,
      type: this.props.type.value,
      description: this.props.description,
      approval: this.props.approval.value,
      amount: this.props.amount.value,
    };
  }
}
