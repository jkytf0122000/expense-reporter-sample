import { User } from "../models/user";
/*
import { Role } from "../models/role";
import { Expense } from "../models/expense";

declare interface expense {
  user: typeof User;
  role: typeof Role;
  expense: typeof Expense;
}


declare global {
  namespace Express {
    export interface Request {
      user?: User | undefined;
    }
  }
}


declare global {
  namespace Express {
      export interface Request {
          user?: User;
      }
  }
}
*/

declare namespace Express {
  export interface Request {
    user: import("../models/user").User;
  }
}
