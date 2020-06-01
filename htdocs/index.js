// Todo
// const baseUrl = "https://virtserver.swaggerhub.com/sho7650/ExpenseMockServices/0.7.0";
const baseUrl = "";

// 経費リストを axios を利用して取得する関数
const getPayments = function (callback) {
  axios
    .get(`${baseUrl}/api/payment`, {
      // JWTの認可ヘッダ
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // "response.data" 配下に経費リストが含まれる
        callback(null, response.data);
      } else {
        callback(true, response);
      }
    })
    .catch((response) => {
      callback(true, response);
    });
};

// 経費リスト用の Vueコンポーネント
const Payment = {
  template: "#payment",
  data: function () {
    return {
      loading: false,
      error: false,
      payments: function () {
        return [];
      },
    };
  },
  // 初期化されたときにデータを取得する
  created: function () {
    this.fetchData();
  },
  // ルーティングが変更されてきたときに再度データを取得する
  watch: {
    $route: "fetchData",
  },
  // 経費データを取得するメソッドのメイン部分
  methods: {
    fetchData: function () {
      this.loading = true;
      getPayments(
        function (err, payments) {
          this.loading = false;
          if (!err) this.payments = payments;
          else this.error = true;
        }.bind(this)
      );
    },
  },
};

// 経費を登録するコンポーネント
const Expense = {
  template: "#expense",
  data: function () {
    let decoded = {};
    if (localStorage.token) {
      // トークン内のユーザ情報を元に変数へ配置
      decoded = jwt_decode(localStorage.token);
    }
    return {
      user: decoded.email || "",
      id: decoded.id || "",
      user_name: decoded.user_name || "",
      date: "",
      type: "",
      amount: "",
      description: "",
      error: false,
    };
  },
  // 経費を登録するメソッド
  methods: {
    expense: function () {
      axios
        .post(
          `${baseUrl}/api/expense`,
          {
            user: this.user,
            user_id: this.id,
            user_name: this.user_name,
            date: this.date,
            type: this.type,
            amount: this.amount,
            description: this.description,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            // 正常に登録できた場合は、変更が伴うフィールドをクリアして、再度入力可能な状態にする
            this.error = false;
            console.log(response);
            this.date = "";
            this.type = "";
            this.amount = "";
            this.description = "";
          }
        })
        .catch((response) => {
          this.error = true;
          console.log(response);
        });
    },
  },
};

// ログイン処理
const Login = {
  template: "#login",
  data: function () {
    return {
      user: localStorage.user || "",
      password: localStorage.password || "",
      remember: localStorage.remember || false,
      error: false,
    };
  },
  methods: {
    login: function () {
      axios
        .post(`${baseUrl}/api/auth`, {
          user: this.user,
          password: this.password,
        })
        .then((response) => {
          if (response.status === 200) {
            // ログインが成功した場合は、ローカルストレージにトークンを保管する(ログインが成功した状態とする)
            this.error = false;
            localStorage.token = response.data.token;
            // "remember me" チェックボックスがついていたら、各々の入力項目を保管する
            if (this.remember) {
              localStorage.user = this.user;
              localStorage.password = this.password;
              localStorage.remember = true;
            } else {
              // 逆にオフであれば入力項目の内容を破棄する
              delete localStorage.user;
              delete localStorage.password;
              delete localStorage.remember;
            }
            // ログイン成功したら /expense へ切り替える
            this.$router.replace("/expense");
          } else {
            this.error = true;
          }
        })
        .catch((response) => {
          this.error = true;
          this.remember = false;
          console.log(response);
        });
    },
  },
};

// Vue-routerにによる SPA 内のルーティング処理定義部分
const router = new VueRouter({
  routes: [
    // 経費登録
    {
      path: "/expense",
      component: Expense,
      beforeEnter: (to, from, next) => {
        // 認証前の場合は /login ページへ遷移する
        if (!localStorage.token) {
          next({
            path: "/login",
            query: { redirect: to.fullPath },
          });
        } else {
          next();
        }
      },
    },
    // 経費一覧
    {
      path: "/payment",
      component: Payment,
      beforeEnter: (to, from, next) => {
        // 認証前の場合は /login ページへ遷移する
        if (!localStorage.token) {
          next({
            path: "/login",
            query: { redirect: to.fullPath },
          });
        } else {
          next();
        }
      },
    },
    // ログイン画面
    {
      path: "/login",
      component: Login,
    },
    // ログアウト処理
    {
      path: "/logout",
      beforeEnter: (to, from, next) => {
        delete localStorage.token;
        next("/login");
      },
    },
    // どもURLにも該当しなかった場合
    {
      path: "*",
      redirect: "/expense",
    },
  ],
});

const app = new Vue({
  router,
}).$mount("#app");
