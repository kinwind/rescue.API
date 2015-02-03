// module
var express = require('express');
var router = express.Router();

// Connection物件， 使用tedious 連接azure
var Connection = require('tedious').Connection;
// Request物件
var Request = require('tedious').Request;

var TYPES = require('tedious').TYPES;

var moment = require('moment');

// 設定值
var config = {
    userName: '',
    password: '',
    server: '',
    options: {
        database: 'rescueDB',
        encrypt: true,
        // rowCollectionOnDone : true,
        rowCollectionOnRequestCompletion : true
    }
};

router.get('/rescueInfo', function (req, res) {
    // 建立連線
    var connection = new Connection(config);
    
    // connect事件
    connection.on('connect', function (err) {
        // 執行sql
        var sql = "select * from RescueInfo";
        request = new Request(sql, function (err, rowCount, rows) {
            var list = [];
            rows.forEach(function (columns) {
                list.push({
                    id: columns[0].value,
                    xAddr: columns[1].value,
                    yAddr: columns[2].value,
                    rescueTime: columns[3].value,
                    photoUrl: columns[4].value,
                    videoUrl: columns[5].value
                });
            });
            res.json(list);
        });
        connection.execSql(request);
    });
});

router.post('/rescueInfo', function (req, res) {
    var connection = new Connection(config);
    connection.on('connect', function (err) {                        
        var sql = " INSERT INTO [RescueInfo]([gId],[xAddr],[yAddr],[rescueTime],[photoUrl],[videoUrl]) VALUES(@gId ,@xAddr ,@yAddr ,@rescueTime ,@photoUrl ,@videoUrl)";
        request = new Request(sql, function (err, rowCount, rows) {
            if (err) {
                console.log(err);
                res.json({ error: true, message: err });
            } else {
                res.json({ error: false, message: 'add sccuess.' });
            }
        });
        
        request.addParameter('gId', TYPES.UniqueIdentifierN, req.body.id);       
        request.addParameter('xAddr', TYPES.Float, req.body.xAddr);
        request.addParameter('yAddr', TYPES.Float, req.body.yAddr);        
        request.addParameter('rescueTime', TYPES.DateTime, moment(req.body.rescueTime).toDate());
        request.addParameter('photoUrl', TYPES.NVarChar, req.body.photoUrl);
        request.addParameter('videoUrl', TYPES.NVarChar, req.body.videoUrl);
        
        // 執行
        connection.execSql(request);

    });
});


router.get('/helpInfo', function (req, res) {
    // 建立連線
    var connection = new Connection(config);
    
    // connect事件
    connection.on('connect', function (err) {
        // 執行sql
        var sql = "select * from HelpInfo";
        request = new Request(sql, function (err, rowCount, rows) {
            var list = [];
            
            rows.forEach(function (columns) {
                list.push({
                    id: columns[0].value,
                    name: columns[1].value,
                    xAddr: columns[2].value,
                    yAddr: columns[3].value,                    
                    tel: columns[4].value,
                    website: columns[5].value
                });
            });
            res.json(list);
        });
        
        // 執亍
        connection.execSql(request);
    });
});



router.post('/helpInfo', function (req, res) {    
    // 建立連線
    var connection = new Connection(config);

    // connect事件
    connection.on('connect', function (err) {

        if (err) {
            console.log(err);
        } 

        // 執行sql
        var sql = " INSERT INTO HelpInfo(gId ,name ,xAddr ,yAddr ,tel ,website) VALUES(@gId ,@name ,@xAddr ,@yAddr ,@tel ,@website)";       
        request = new Request(sql, function (err, rowCount, rows) {
            if (err) {
                console.log(err);
                res.json({ error: true, message: err });
            } else {
                res.json({ error: false, message: 'add sccuess.' });
            }           
        });
        
        request.addParameter('gId', TYPES.UniqueIdentifierN, req.body.id);
        request.addParameter('name', TYPES.NVarChar, req.body.name);
        request.addParameter('xAddr', TYPES.Float, req.body.xAddr);
        request.addParameter('yAddr', TYPES.Float, req.body.yAddr);
        request.addParameter('tel', TYPES.NVarChar, req.body.tel);
        request.addParameter('website', TYPES.NVarChar, req.body.website);

        // 執行
        connection.execSql(request);

    });
});


// 匯出，在require時才能直接使用function
module.exports = router;