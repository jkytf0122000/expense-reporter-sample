import bcrypt from 'bcrypt';
import { User } from "../../models/user";

export class Authentication {
  static serializeUser(user: any, done: any) {
    return done(null, user);
  }
  static deserializeUser(user: any, done: any) {
    User.findByPk(user.id)
      .then(user => {
        return done(null, user);
      })
      .catch(() => {
        return done(null, false);
      });
  }

  static verify(username: string, password: string, done: any) {
    User.findOne(
      {
        where: {
          email: username
        }
      }
    ).then(user => {
      if (!user || !bcrypt.compareSync(password, user.hash))
        return done(null, false);
      return done(null, user.get());
    });
  }
}