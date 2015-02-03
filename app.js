// 主程式進入點

// 引用module
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');
var apis = require('./routes/apis');

// 使用express
var app = express();

// view engine 設定
app.set('views', path.join(__dirname, 'views'));

// 使用jade engine
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// 使用middleware
app.use(logger('dev')); // log
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);
app.use('/api', apis);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//// 使用tedious 連接azure
//var Connection = require('tedious').Connection;

//var config = {
//    "userName": 'rescueAPI@t7fvhl4jab.database.windows.net',
//    "password": 'rAPI2015+',
//    "server": 't7fvhl4jab.database.windows.net',
//    "options": {
//        "database": "rescueAPIDB",
//        "encrypt": true,
//    }
//};

//// 建立連線
//var connection = new Connection(config);

//// connect事件
//connection.on('connect', function (err) {
    
//    // 執行sql
//    executeStatement();
//});

//// 建立Request
//var Request = require('tedious').Request;

//// 執行sql
//function executeStatement() {
//    // syntax: new Request(sql,function())
//    request = new Request("select 42, 'hello world'", function (err, rowCount) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log(rowCount + ' rows');
//        }
//    });
    
//    request.on('row', function (columns) {
//        columns.forEach(function (column) {
//            console.log(column.value);
//        });
//    });
    
//    connection.execSql(request);
//}
module.exports = app;
