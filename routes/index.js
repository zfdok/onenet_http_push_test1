const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  ctx.body = ctx.request.query.msg;
});

router.post("/", async (ctx, next) => {
  let postdata = ctx.request.body; //注意是异步调用
  ctx.body = postdata;
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

module.exports = router;
