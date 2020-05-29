import { Request, Response, NextFunction } from "express";
import passport from "passport";

export class Authorization {
  static jwt(req: Request, res: Response, next: NextFunction) {
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
