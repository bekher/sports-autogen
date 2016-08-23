var app = require('koa')();
var router = require('koa-router')();
var limit = require('koa-better-ratelimit');
const SportsGen = require('./markov');

var gen = new SportsGen();

app.use(limit({
  duration: 1000 * 60 * 1, //1 mins
  max: 60
  //blackList: ['127.0.0.1']
}));

router.get('/', function * (next) {
  this.body = "hello world!";
  yield next;
});

router.get('/gen', function * (next) {
  yield gen.generate().then( (stuff) => {
   this.body = stuff; 
  });
  yield next;
});

app.use(router.routes())
.use(router.allowedMethods());

var port = process.env.PORT || 3333;
app.listen(3333);
console.log('Sports-autogen server start listening on port ' + port);
