import Express from "express";
const app = Express();
import logger from "morgan";
import { Authentication } from "./controllers/auth/authentication";
import { Authorization } from "./controllers/auth/authorization";

app.use(logger("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

Authentication.initialize(app);
// Strategy を２つ(user/password認証, JWT認可)利用
Authentication.setLocalStrategy();
Authorization.setJWTStrategy();

app.use(Express.static("htdocs"));

// API用ルーティング
import auth from "./api/auth";
import payment from "./api/payment";
import expense from "./api/expense";

// API
app.use("/api/auth", auth);
app.use("/api/expense", Authorization.isAuthorized, expense);
app.use("/api/payment", Authorization.isAuthorized, payment);

app.use(
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    var err: any = new Error("Not Found");
    err.status = 404;
    next(err);
  }
);

// error handler
app.use(
  (
    err: any,
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send("エラーが発生しました");
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

export default app;
