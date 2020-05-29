import { Request, Response, NextFunction } from "express";
import passport from "passport";

export class Authorization {
  static jwt(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", (err, user) => {
      if (err || !user) res.status(401).json({ status: "10001" });

      return next();
    })(req, res, next);
  }
}
