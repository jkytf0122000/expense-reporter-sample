import { Authorization } from "../src/controllers/auth/authorization";
import { User } from "../src/models/user";

describe("authorization", () => {
  let payload = {
    email: "",
    iss: process.env.ISSUER,
    aud: process.env.AUDIENCE,
  };

  it("verify - positive", (done) => {
    const callback = (arg: boolean | null, user: User) => {
      expect(arg).toBeNull();
      expect(user.email).toBe("test@example.com");
      done();
    };

    payload.email = "test@example.com";
    Authorization.verifyJWT(payload, callback);
  });

  it("verify - negative", (done) => {
    const callback = (arg: boolean | null, user: User | boolean) => {
      expect(user).toBe(false);
      done();
    };

    payload.email = "incorrect@example.com";
    Authorization.verifyJWT(payload, callback);
  });

  it("verify - deleted", (done) => {
    const callback = (arg: boolean | null, user: User | boolean) => {
      expect(user).toBe(false);
      done();
    };

    payload.email = "deleted@example.com";
    Authorization.verifyJWT(payload, callback);
  });
});
