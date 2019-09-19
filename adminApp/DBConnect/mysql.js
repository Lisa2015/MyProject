var mysql = require('mysql'); //调用MySQL模块
var Connection = mysql.createConnection({
    host: '127.0.0.1', //主机
    user: 'root',     //数据库用户名
    password: '123456',     //数据库密码
    port: '3306',
    database: 'myapp', //数据库名称
});




module.exports = Connection;