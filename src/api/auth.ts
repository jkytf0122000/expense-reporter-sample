import Express from "express";
const router = Express.Router();
import passport from "passport";

// POST / ユーザーの認証処理
router.post(
  "/",
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    passport.authenticate("local", (err, token) => {
      if (err) res.status(401).json(err);

      res.status(200).json({ token: token });
    })(req, res, next);
  }
);

export default router;
