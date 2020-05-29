import Express from "express";
const app = Express();
import logger from "morgan";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// import session from "express-session";
import { Authentication } from "./controllers/auth/index";
import { Authorization } from "./controllers/auth/authorize";

app.use(logger("dev"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

/*
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 30 * 60 * 1000,
    },
  })
);
*/

Authentication.initialize(app);
// Strategy を２つ(user/password認証, JWT認証済み)利用
Authentication.setLocalStrategy();
Authentication.setJWTStrategy();

// ログインの強制
// app.use((req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   if (req.url === "/" || req.url === "/login") return next();
//   res.redirect("/login");
// });

// ルーティング
/*
import index from "./routes/index";
import login from "./routes/login";
import payment from "./routes/expenses/payment";
import submit from "./routes/expenses/submit";
*/

// API用ルーティング
import auth from "./api/auth";
import payment from "./api/payment";

/*
app.use("/", index);
app.use("/expenses/payment", payment);
app.use("/login", login);
app.use("/expenses/submit", submit);
*/

// API
app.use("/api/auth", auth);
// app.use("/api/expense", Authorization.jwt, submit);
app.use("/api/payment", Authorization.jwt, payment);

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
