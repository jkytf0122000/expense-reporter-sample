import { Request, Response, NextFunction } from "express";
import Express from "express";
const app = Express();
import logger from "morgan";
import { Authentication } from "./controllers/auth/authentication";
import { Authorization } from "./controllers/auth/authorization";

app.use(logger("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

Authentication.initialize(app);
Authentication.setLocalStrategy();
Authorization.setJWTStrategy();

app.use(Express.static("htdocs"));

// API用ルーティング
import auth from "./api/auth";
import payment from "./api/payment";
import expense from "./api/expense";
import approval from "./api/approval";

// API
app.use("/api/auth", auth);
app.use("/api/expense", Authorization.isAuthorized, expense);
app.use(
  "/api/payment",
  Authorization.isAuthorized,
  Authorization.isAccounting,
  payment
);
app.use(
  "/api/approval",
  Authorization.isAuthorized,
  Authorization.isBoss,
  approval
);

app.use((req: Request, res: Response, next: NextFunction) => {
  var err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

export default app;
