import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import passport from "passport";
import passportJWT from "passport-jwt";

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

export class Authorization {
  static verifyJWT(req: Request, jwt_payload: any, done: any) {
    User.findOne({
      where: {
        email: jwt_payload.email,
        deleted_at: null,
      },
    }).then((user) => {
      if (!user) return done(null, false);

      req.user = user;
      return done(null, user.get());
    });
  }

  static setJWTStrategy() {
    // passport.jwt の認証定義
    const field = {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      issuer: process.env.ISSUER,
      audience: process.env.AUDIENCE,
      secretOrKey: process.env.SECRET || "secret",
      passReqToCallback: true,
    };
    passport.use(new JWTStrategy(field, this.verifyJWT));
  }

  static isAuthorized(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) {
        res.status(401).json({ status: "10001" });
      }
      if (!user) {
        res.status(401).json({ status: "10002" });
      } else {
        return next();
      }
    })(req, res, next);
  }
}
