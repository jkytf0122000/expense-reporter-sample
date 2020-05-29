import Express from "express";
const router = Express.Router();
import { Request, Response, NextFunction } from "express";
import passport from "passport";

// POST / ユーザーの認証処理
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err, token) => {
    if (err) res.status(401).json(err);

    res.status(200).json({ token: token });
  })(req, res, next);
});

export default router;
