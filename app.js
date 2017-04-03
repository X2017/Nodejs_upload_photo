/**
 * 启动此文件进入项目
 * @type {*|exports|module.exports}
 */

var express = require("express");
var app = express();
var router = require("./controller");
app.set("view engine", "ejs");
// 路由中间件 静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.get("/", router.showIndex);
app.get("/up", router.showUp);
app.get("/:photo", router.showPhoto);
app.post("/up", router.doPost);
app.use(function(req,res){
    res.render("err");
});
app.listen(3000);
console.log(new Date());