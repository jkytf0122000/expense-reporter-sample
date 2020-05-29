import { Authentication } from "../src/controllers/auth/authentication";
import jwt from "jsonwebtoken";
import { User } from "../src/models/user";

describe("authentication", () => {
  it("verify - positive", (done) => {
    const callback = (arg: boolean | null, token: string) => {
      expect(arg).toBeNull();
      const payload: any = jwt.verify(token, process.env.SECRET || "secret");
      expect(payload.email).toBe("test@example.com");
      done();
    };

    Authentication.verifyLocal("test@example.com", "password", callback);
  });

  it("verify - negative", (done) => {
    const callback = (arg: boolean | null, token: string) => {
      expect(arg).toBe(true);
      done();
    };

    Authentication.verifyLocal("test@example.com", "incorrect", callback);
  });

  it("verify - deleted", (done) => {
    const callback = (arg: boolean | null, token: string) => {
      expect(arg).toBe(true);
      done();
    };

    Authentication.verifyLocal("deleted@example.com", "password", callback);
  });
});
