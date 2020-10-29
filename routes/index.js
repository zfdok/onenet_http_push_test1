const router = require("koa-router")();
const query = require("../mysql/query"); //引入异步查询方法
const { SHOW_ALL_DB } = require("../mysql/sql"); //部分引入sql库

router.get("/", async (ctx, next) => {
  let query_res = await query(SHOW_ALL_DB);//异步方法调用
  ctx.body = query_res;
});

module.exports = router;
