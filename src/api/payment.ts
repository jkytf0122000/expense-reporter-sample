import Express from "express";
const router = Express.Router();

// POST / ユーザーの認証処理
router.get(
  "/",
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.log(req.user);
    res.status(200).json({ id: "success" });
  }
);

export default router;
