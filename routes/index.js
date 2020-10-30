const router = require("koa-router")();
const query = require("../mysql/query"); //引入异步查询方法
const { SHOW_ALL_DB, SHOW_ALL_TABLE, QUERY_DATAS, INSERT_DATAS } = require("../mysql/sql"); //部分引入sql库

router.get("/", async (ctx, next) => {
  let query_res = await query(SHOW_ALL_DB);//异步方法调用
  ctx.body = query_res;
});

router.post("/", async (ctx, next) => {
  let msg_obj = JSON.parse(ctx.request.body.msg);
  console.log(msg_obj);
  // console.log(ctx.request.body.msg);
  if (msg_obj.messageType == "notify") {
    const device_id = msg_obj.deviceName;
    const temp = msg_obj.data.params.temp.value;
    const humi = msg_obj.data.params.humi.value;
    const rec_time = msg_obj.data.params.temp.time;
    const data_t = new Date(rec_time)
    let tempstr = ((dateTime, format) => {
      var z = {
        y: dateTime.getFullYear(),
        M: dateTime.getMonth() + 1,
        d: dateTime.getDate(),
        h: dateTime.getHours(),
        m: dateTime.getMinutes(),
        s: dateTime.getSeconds()
      };
      return format.replace(/(y+|M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
      });
    })(data_t,"yyyy-MM-dd hh:mm:ss");

    
    console.log(tempstr);



    const values = temp + "," + humi + ",117,36,1,\"" + device_id + "\",\"" + tempstr+"\"";
    // console.log(values);
    let query_res = await query(INSERT_DATAS("device_rec", values));
    // console.log(query_res);
  }
  ctx.body = { msg: "success" };
});

router.get("/tables", async (ctx, next) => {
  let query_res = await query(SHOW_ALL_TABLE);//异步方法调用
  ctx.body = query_res;
});

router.get("/student", async (ctx, next) => {
  let query_res = await query(QUERY_DATAS("student"));//异步方法调用
  ctx.body = query_res;
});
router.get("/rec", async (ctx, next) => {
  let query_res = await query(QUERY_DATAS("device_rec"));//异步方法调用
  console.log(query_res);
  ctx.body = query_res;
});
module.exports = router;
