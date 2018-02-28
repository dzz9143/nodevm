var express = require('express');
var fetch = require('isomorphic-fetch');

/* GET home page. */
module.exports = function (funcMap) {
  var router = express.Router();
  router.get('/*', function (req, res, next) {
    // console.log('req.url:', req.url);
    var funcName = req.url.substr(1);
    if (funcMap[funcName]) {
      funcMap[funcName](req, res);
      return;
    }
    res.end(`hello world! ${process.env.serviceName}`);
  });

  return router;
};
