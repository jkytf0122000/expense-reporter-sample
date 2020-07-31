import { ExpenseEntity, MAX_AMOUNT } from "../api/domains/expenseEntity";
import { approval_status } from "../api/common";

describe("Expense Entity", () => {
  const today = new Date();
  const Entity = ExpenseEntity.create({
    user_id: 1,
    user_name: "sample user",
    date: today,
    type: "交通費",
    description: "池袋/東京",
    approval: approval_status.unapproved,
    amount: 500,
  });
  const e = Entity.read();

  it("set and get - positive", () => {
    expect(e.user_id).toBe(1);
    expect(e.user_name).toBe("sample user");
    expect(e.date).toBe(today);
    expect(e.type).toBe("交通費");
    expect(e.description).toBe("池袋/東京");
    expect(e.approval).toBe(approval_status.unapproved);
    expect(e.amount).toBe(500);
  });

  it("change approval - positive", () => {
    e.approval = approval_status.unapproved;
    expect(e.approval).toBe(approval_status.unapproved);
    e.approval = approval_status.approved;
    expect(e.approval).toBe(approval_status.approved);
    e.approval = approval_status.reject;
    expect(e.approval).toBe(approval_status.reject);
    e.approval = approval_status.reimburse;
    expect(e.approval).toBe(approval_status.reimburse);
  });

  it("change approval - negative", () => {
    expect(() => {
      Entity.approval = approval_status.minimum;
    }).toThrow();
    expect(() => {
      Entity.approval = approval_status.maximum;
    }).toThrow();
  });

  /*
  it("change date - positive", () => {
    const changed_date = new Date();
    e.date = changed_date;
    expect(e.date).toBe(changed_date);
  });

  it("change type - positive", () => {
    const changed_type = "宿泊費";
    e.type = changed_type;
    expect(e.type).toBe(changed_type);
  });

  it("change description - positive", () => {
    const changed_description = "ホテルサンプル";

    e.description = changed_description;
    expect(e.description).toBe(changed_description);
  });

  it("change amount - positive", () => {
    const changed_amount = 500;
    e.amount = changed_amount;
    expect(e.amount).toBe(changed_amount);
  });

  it("change amount - negative", () => {
    expect(() => {
      e.amount = 0;
    }).toThrow();
    expect(() => {
      e.amount = MAX_AMOUNT;
    }).toThrow();
  });
  */
});
