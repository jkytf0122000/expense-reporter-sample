import Express from "express";
const router = Express.Router();

// POST / ユーザーの認証処理
router.get(
  "/",
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.status(200).send('id: "success"');
  }
);

export default router;
