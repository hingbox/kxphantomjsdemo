/**
 * Created by kuangxing on 2017/6/8 18:04.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
"use strict";
var page = require('webpage').create(),t;
t = Date.now();

page.onConsoleMessage = function(msg) {
    console.log('Page title is ' + msg);
};
page.open('http://www.baidu.com',function (status) {
    if (status === "success") {
        var title = page.evaluate(function() {
            return document.title;
        });
        t = Date.now() - t;
        console.log("主页title:"+title+"耗时:"+t+'msec');
    }
    phantom.exit();
});
