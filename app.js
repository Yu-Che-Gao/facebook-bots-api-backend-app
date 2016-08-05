const express = require('express');
const app = express();
const mysql = require('mysql');
const timeZone = require('./timezone.js');

app.get('/', function (req, res) {
    let log = '';
    let dt = timeZone.getTimeZone(8);
    let strdate1 = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    // let sql = "SELECT * FROM `pofeed` WHERE `po_time`='"+strdate1+"'";
    let sql = "UPDATE `pofeed` SET `content`='success' WHERE `po_time`<='" + strdate1 + "'";

    let connection = mysql.createConnection({
        host: 'us-cdbr-azure-west-c.cloudapp.net',
        user: 'b90ac6e941f130',
        password: '39fdabee',
        database: 'facebook_bots_sql'
    });


    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) throw err;
        log += 'changed ' + result.changedRows + ' rows<br/>';
    });

    connection.end(function (error) {
        if (error) {
            log += 'connection closed error' + error;
        }
    });

    res.send(log);
});