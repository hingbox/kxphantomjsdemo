/**
 * Created by kuangxing on 2017/6/2 20:57.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
phantom.outputEncoding="gbk";
//返回百度首页截图
/*
var page = require('webpage').create();
page.open('http://www.baidu.com',function(){
    page.render('example.png');
    phantom.exit();
})*/

//访问百度页面耗时长
/*
var page = require('webpage').create(),system = require('system'),t,address;////传递一些需要的参数给js文件
if (system.args.length === 1) {
    console.log('Usage:loadspeed.js<some Url>');
    plantom.exit(1);
} else {
    t = Date.now();
    address = system.args[1];//获得命令行第二个参数 ，也就是指定要加载的页面地址，接下来会用到
    phantom.outputEncoding="gbk";
    page.open(address,function(status){
        if (status != 'success') {
            console.log('Fail to load the address');
        } else {
            t = Date.now() -t;
            console.log('Page title is'+page.evaluate(function(){
                    return document.title;
                }));
            console.log('Loading'+t+'sec');
        }
        phantom.exit()
    });
}*/

//返回网页titile
/*var page = require('webpage').create();
phantom.outputEncoding="gbk";
page.onConsoleMessage = function(msg){
  console.log('page title is' +msg);
};
page.open('http://www.csdn.net',function (status) {
    var title = page.evaluate(function () {
        return document.title;
    });

    console.log('title is'+title);
    phantom.exit();
});*/

//dom操作
/*var page = require('webpage').create();
phantom.outputEncoding="gbk";
console.log('the default use agent is'+page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
page.open('http://www.zk120.com/',function(status){
    if (status !== 'success') {
        console.log('unalbe to access network');
    } else {
        var ua = page.evaluate(function(){
            return document.getElementById('daolan').innerText;
        });
        console.log(ua);
    }
    phantom.exit();
});*/
var page = require('webpage').create();
page.open('http://m.bing.com', function(status) {
    var title = page.evaluate(function(s) {
        return document.querySelector(s).innerText;
    }, 'title');
    console.log(title);
    phantom.exit();
});
