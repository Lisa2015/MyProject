const express = require('express');
const http = require('http');
const connection = require('../DBConnect/mysql');
const app = express();
var router = express.Router();
connection.connect(function (err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!');
});
//增
var  addSql = 'INSERT INTO test(userid,username,password,createTime,gender) VALUES("22555",?,?,?,?)';
var  addSqlParams = ['里斯', '11662','2019-09-19', 'M'];
//增
// connection.query(addSql,addSqlParams,function (err, result) {
//     if(err){
//         console.log('[INSERT ERROR] - ',err.message);
//         return;
//     }
//
//     console.log('--------------------------INSERT----------------------------');
//     //console.log('INSERT ID:',result.insertId);
//     console.log('INSERT ID:',result);
//     console.log('-----------------------------------------------------------------\n\n');
// });
//
// connection.end();
module.exports = app