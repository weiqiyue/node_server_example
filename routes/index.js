var express = require('express');
var router = express.Router();

const { createHash } = require('crypto');

const config = {
    appid: '1315993122',
    token: '您的Token',
}

const sha256 = function(str) {
    return createHash('sha256')
        .update(str)
        .digest('hex');
}

const genSignature = function() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = sha256(timestamp + config.token + config.appid + timestamp).toUpperCase(); // 使用上面获取到的token和appid合成加密串返回
    return { signature, timestamp };
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // 这种适合服务端渲染
  res.send(`
    <!DOCTYPE html>
    <html>
    <body>
      <h1>User Info</h1>
      <p>Name: wq</p>
      <p>Age: 10</p>
    </body>
    </html>
  `);

  // 这种适用于前后端分离
  // res.send({
  //   name: 'wq',
  //   age: 10,
  // })
});

// 创建签名
router.get('/get-ar-sign', function(req, res, next) {
   const sign = genSignature();
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.send(sign)
})

module.exports = router;
