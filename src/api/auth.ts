import Express from "express";
const router = Express.Router();
import { Request, Response, NextFunction } from "express";
import passport from "passport";

// POST / ユーザーの認証処理
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  if (req.body.user && req.body.password) {
    passport.authenticate("local", (err, token) => {
      if (err) {
        console.log("authentication error");
        return res.status(401).json(err);
      }

      return res.status(200).json({ token: token });
    })(req, res, next);
  } else {
    return res.status(400).json({ id: 10001, message: "bad parameters" });
  }
});

export default router;
