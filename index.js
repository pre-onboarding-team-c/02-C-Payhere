const app = require('./src/app');

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '포트 연결');
});
