import bcrypt from "bcrypt";
import { User } from "../../models/user";
import passport from "passport";
import passportJWT from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

export class Authentication {
  static initialize(app: any) {
    // passport 初期化
    app.use(passport.initialize());
    app.use(passport.session());

    // passport.serializeUser(this.serializeUser);
    // passport.deserializeUser(this.deserializeUser);
  }
  static serializeUser(user: any, done: any) {
    return done(null, user);
  }
  static deserializeUser(user: any, done: any) {
    User.findByPk(user.id)
      .then((user) => {
        return done(null, user);
      })
      .catch(() => {
        return done(null, false);
      });
  }

  static verifyLocal(username: string, password: string, done: any) {
    User.findOne({
      where: {
        email: username,
        deleted_at: null,
      },
    }).then((user) => {
      if (!user || !bcrypt.compareSync(password, user.hash))
        return done(true, "authentication error");
      const opts = {
        issuer: process.env.ISSUER,
        audience: process.env.AUDIENCE,
        expiresIn: process.env.EXPIRES,
      };
      const secret: string = process.env.SECRET || "secret";
      const token: string = jwt.sign({ email: user.email }, secret, opts);
      return done(null, token);
    });
  }

  static verifyJWT(jwt_payload: any, done: any) {
    User.findOne({
      where: {
        email: jwt_payload.email,
        deleted_at: null,
      },
    }).then((user) => {
      if (!user) return done(null, false);
      return done(null, user.get());
    });
  }

  static setLocalStrategy() {
    // passport.local の認証定義
    const field = {
      usernameField: "user",
      passwordField: "password",
    };
    passport.use(new LocalStrategy(field, this.verifyLocal));
  }

  static setJWTStrategy() {
    // passport.jwt の認証定義
    const field = {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      issuer: process.env.ISSUER,
      audience: process.env.AUDIENCE,
      secretOrKey: process.env.SECRET || "secret",
    };
    passport.use(new JWTStrategy(field, this.verifyJWT));
  }
}
