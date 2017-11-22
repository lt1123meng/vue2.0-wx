var path = require('path')  //文件路径
var express = require('express')   //启用一个server
var app = express()
app.use(express.static('./dist'))
var router = express.Router();
router.get('/', function (req, res, next) {
  req.url = '/index.html'
  next();
})
app.listen('8888', function (err) {
  if (err) {
    console.log(err)
    return
  }
  // when env is testing, don't need open it
  console.log(8888)
})
