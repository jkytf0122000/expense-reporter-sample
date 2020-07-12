import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

export class Authorization {
  // JWT トークンで該当するユーザの有無をチェック
  static verifyJWT(req: Request, jwt_payload: any, done: any) {
    User.findOne({
      where: {
        email: jwt_payload.email,
        deleted_at: null,
      },
    }).then((user) => {
      if (!user) return done(null, false);

      return done(null, user);
    });
  }

  // JWT Strategyのの定義
  static setJWTStrategy() {
    const field = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: process.env.ISSUER,
      audience: process.env.AUDIENCE,
      secretOrKey: process.env.SECRET || "secret",
      passReqToCallback: true,
    };
    passport.use(new JWTStrategy(field, this.verifyJWT));
  }

  // 認可チェック
  static isAuthorized(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", (err, user) => {
      if (err) {
        res.status(401).json({ status: "10001" });
      }
      if (!user) {
        res.status(401).json({ status: "10002" });
      } else {
        req.user = user;
        return next();
      }
    })(req, res, next);
  }
}
