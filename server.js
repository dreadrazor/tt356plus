var fs = require('fs')
  , path = require('path')
  , express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , urls = require('./urls.js')
  , paginate = require('./paginate.js')
  , config = require('./config.json');

var app = express();

app.set('port', (process.env.PORT || config.DEFAULT_PORT));
app.set('views', './tmp/public/templates')
app.set('view engine', 'jade');

app.use(session({
  secret: 'tt365plus'
}))

app.use('/static', express.static(path.join(__dirname, '/tmp/public/static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//bind auto paginator
//paginate(app);

//bind responses
urls(app);

/** STAY A WHILE AND LISTEN **/

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
