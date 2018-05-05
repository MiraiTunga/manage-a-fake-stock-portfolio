var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/myshares');

var app = express();

var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/myshares', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var foo = function() {

 /*   var Quandl = require("quandl");
    var quandl = new Quandl();

    var options = {
        auth_token: "HmXN8Kwmfz3osbikyFA-"
    };

    quandl.configure(options);

    quandl.dataset({
        source: "WIKI",
        table: "FB"
    }, {
        order: "asc",
        exclude_column_names: true,
        start_date: "2018-05-27",
        end_date: "2018-03-27",
        column_index: 4
    }, function(err, response){
        if(err)
            throw err;

        console.log(response);
    });*/
};

app.post('/data', function(req, res) {

    console.log("jj");
    console.log(req.body);
    res.send(200);

    // sending a response does not pause the function
    foo();
});

module.exports = app;
