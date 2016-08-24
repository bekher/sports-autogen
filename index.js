var app = require('koa')();
var router = require('koa-router')();
var limit = require('koa-better-ratelimit');
const SportsGen = require('./markov');

// Rate limit the API, markov modeling isn't that cheap
app.use(limit({
  duration: 1000 * 100 * 3, // 3 mins
  max: 60,
  // blacklist: ['127.0.0.1']
}));

app.use(require('koa-static')('static/'));

var gen = new SportsGen();

router.get('/gen', function * (next) {
  yield gen.generate().then( (interview) => {
   this.body = `"${interview}"`;
  });
  yield next;
});

app.use(router.routes())
.use(router.allowedMethods());

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Sports-autogen server start listening on port ' + port);
