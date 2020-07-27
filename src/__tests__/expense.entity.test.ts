import { ExpenseValue, Expense } from "../api/domains/expense";
import { approval_status } from "../api/common";

describe("Expense Entity", () => {
  const today = new Date();
  const e: ExpenseValue = {
    user_id: 1,
    date: today,
    type: "交通費",
    description: "池袋/東京",
    approval: approval_status.unapproved,
    amount: 500,
  };

  it("set and get - positive", () => {
    const test_case1 = new Expense(e);
    expect(test_case1.userId).toBe(1);
    expect(test_case1.date).toBe(today);
    expect(test_case1.type).toBe("交通費");
    expect(test_case1.description).toBe("池袋/東京");
    expect(test_case1.approval).toBe(approval_status.unapproved);
    expect(test_case1.amount).toBe(500);
  });

  it("change approval - positive", () => {
    const test_case2 = new Expense(e);

    test_case2.approval = approval_status.unapproved;
    expect(test_case2.approval).toBe(approval_status.unapproved);
    test_case2.approval = approval_status.approved;
    expect(test_case2.approval).toBe(approval_status.approved);
    test_case2.approval = approval_status.reject;
    expect(test_case2.approval).toBe(approval_status.reject);
    test_case2.approval = approval_status.reimburse;
    expect(test_case2.approval).toBe(approval_status.reimburse);
  });

  it("change approval - negative", () => {
    const test_case2 = new Expense(e);

    expect(() => {
      test_case2.approval = approval_status.minimum;
    }).toThrow();
    expect(() => {
      test_case2.approval = approval_status.maximum;
    }).toThrow();
  });

  it("change date - positive", () => {
    const changed_date = new Date();
    const test_case3 = new Expense(e);

    test_case3.date = changed_date;
    expect(test_case3.date).toBe(changed_date);
  });

  it("change type - positive", () => {
    const changed_type = "宿泊費";
    const test_case4 = new Expense(e);

    test_case4.type = changed_type;
    expect(test_case4.type).toBe(changed_type);
  });

  it("change description - positive", () => {
    const changed_description = "ホテルサンプル";
    const test_case5 = new Expense(e);

    test_case5.description = changed_description;
    expect(test_case5.description).toBe(changed_description);
  });
});
