interface UserModel {
  id: string;
  boss_id?: string;
  first_name?: string;
  last_name: string;
  email: string;
}

declare namespace Express {
  export interface User extends UserModel {}
}

declare namespace Express {
  export interface Request {
    user?: User | undefined;
  }
}
