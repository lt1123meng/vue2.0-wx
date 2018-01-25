var path = require('path')  //文件路径
var express = require('express')   //启用一个server
var app = express()
app.use(express.static('./dist'))
var router = express.Router();
router.get('/', function (req, res, next) {
  req.url = '/index.html'
  next();
})
var port=parseInt(8 + '' + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10))
app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  // when env is testing, don't need open it
  console.log(port)
})
