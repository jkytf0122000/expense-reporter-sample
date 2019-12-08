import bcrypt from 'bcrypt';
import { User } from "../../models/user";
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export class Authentication {
  static initialize(app: any) {
    // passport 初期化
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(this.serializeUser);
    passport.deserializeUser(this.deserializeUser);
  }
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

  static setStrategy() {
    // passport の認証定義
    const field = {
      usernameField: 'user',
      passwordField: 'password'
    };
    passport.use(new LocalStrategy(field, this.verify));
  }
}