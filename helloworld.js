/**
 * Created by kuangxing on 2017/6/8 18:04.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
"use strict";
var system = require('system');//获得系统操作对象，包括命令行参数、phantomjs系统设置等信息
var page = require('webpage').create(),t;//page获取操作dom或web网页的对象，通过它可以打开网页、接收网页内容、request、response参数，其为最核心对象。
var fs = require('fs'); //获取文件系统对象，通过它可以操作操作系统的文件操作，包括read、write、move、copy、delete等。
t = Date.now();

/*page.onConsoleMessage = function(msg) {
    console.log('Page title is ' + msg);
};*/
//通过page对象打开url链接，并可以回调其声明的回调函数，其回调发生的时机为该URL被彻底打开完毕，即该URL所引发的请求项被全部加载完，但ajax请求是与它的加载完成与否没有关系
/*page.open('http://www.baidu.com',function (status) {
    if (status === "success") {
        var title = page.evaluate(function() {
            return document.title;
        });
        t = Date.now() - t;
        console.log("主页title:"+title+"耗时:"+t+'msec');
    }
    phantom.exit();
});*/
//page.onLoadStarted = function() {}//当page.open调用时，会首先执行该函数，在此可以预置一些参数或函数，用于后边的回调函数中
//page.onResourceError = function(resourceError) {} //page的所要加载的资源在加载过程中，出现了各种失败，则在此回调处理
//page.onResourceRequested = function(requestData, networkRequest) {} //page的所要加载的资源在发起请求时，都可以回调该函数
//page.onResourceReceived = function(response) {} //page的所要加载的资源在加载过程中，每加载一个相关资源，都会在此先做出响应，它相当于http头部分,  其核心回调对象为response，可以在此获取本次请求的cookies、userAgent等
//page.onConsoleMessage = function (msg) {}//欲在执行web网页时，打印一些输出信息到控制台，则可以在此回调显示。
//page.onAlert = function(msg) {} //phantomjs是没有界面的，所以对alert也是无法直接弹出的，故phantomjs以该函数回调在page在执行过程中的alert事件
//page.onError = function(msg, trace) {} //当page.open中的url，它自己（不包括所引起的其它的加载资源）出现了异常，如404、no route to web site等，都会在此回调显示。
//page.onUrlChanged = function(targetUrl) {} // 当page.open打开的url或是该url在打开过程中基于该URL进行了跳转，则可在此函数中回调。
//page.onLoadFinished = function(status){}  // 当page.open的目标URL被真正打开后，会在调用open的回调函数前调用该函数，在此可以进行内部的翻页等操作
//page.evaluate(function(){});// 在所加载的web page内部执行该函数，像翻页、点击、滑动等，均可在此中执行
//page.render("");//将当前page的现状渲染成图片，输出到指定的文件中去。
/*
    注意事项
    1.区分phantomjs的对象和打开的web page对象，如document,window等，两者都有，在调用page.evaluate和不调用的时候，注意区分二者的范围，容易在调试时出现很多的问题，且不好发现
    2.page.injectJs和page.includeJs的区别，两者侧重本地的js文件，与libraryPath挂钩，后者侧重网络js文件,尤其在进入Jquery等第三方库时，会经常遇到
    3.编码问题，两个重要参数，--output-encoding,--script-encoding，前者为输出编码，后者为所使用js、参数配置文件的编码，为方便起鉴，建议均采用utf-8编码，并注所应用到的目标文件的编码，以免引起很不可思议的异常，又无从查起。
 */

/*
    java调用phantomjs
    js
     //codes.js
     system = require('system')
     address = system.args[1];//获得命令行第二个参数 接下来会用到
     //console.log('Loading a web page');
     var page = require('webpage').create();
     var url = address;
     //console.log(url);
     page.open(url, function (status) {
     //Page is loaded!
     if (status !== 'success') {
     console.log('Unable to post!');
     } else {
     //console.log(page.content);
     //var title = page.evaluate(function() {
     //  return document.title;//示范下如何使用页面的jsapi去操作页面的  www.oicqzone.com
     //  });
     //console.log(title);

     console.log(page.content);
     }
     phantom.exit();
     });

     java
     public class HttpUtils {
     public static String getAjaxCotnent(String url) throws IOException {
     Runtime rt = Runtime.getRuntime();
     Process p = rt.exec("phantomjs.exe c:/phantomjs/codes.js "+url);//这里我的codes.js是保存在c盘下面的phantomjs目录
     InputStream is = p.getInputStream();
     BufferedReader br = new BufferedReader(new InputStreamReader(is));
     StringBuffer sbf = new StringBuffer();
     String tmp = "";
     while((tmp = br.readLine())!=null){
     sbf.append(tmp);
     }
     //System.out.println(sbf.toString());
     return sbf.toString();
     }

     public static void main(String[] args) throws IOException {
     getAjaxCotnent("http://www.oicqzone.com");
     }
     }
 */
//evaluate()里的代码就像在浏览器里执行一样，所以像标准的DOM操作、CSS选择等都可以正常进行。我们可以利用这一点将一些页面工作自动化。
/*
    demo01 得到图片的url
 */
var url = system.args[1];//访问的url http://www.dm5.com/m5342-p2/
var page = require('webpage').create();
page.onConsoleMessage = function(msg) {
    console.log('Page title is ' + msg);
};
//这样在webpage载入的时候，会把所有网络请求的请求内容和响应内容打印到控制台。
/*page.onResourceRequested = function(request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
    console.log('Receive ' + JSON.stringify(response, undefined, 4));
};*/
page.settings.userAgent = 'SpecialAgent';
page.open('http://www.dm5.com/m5342-p2/',function (status) {
    if (status === 'success') {
        //处理页面
        /*var pic_url = page.evaluate(function () {
            //操作dom
            return document.getElementById('cp_image').getAttribute('src');
        });
        console.log(pic_url);*/
        /*var button_click = page.evaluate(function () {
            return page.sendEvent('click',1000,1000,button='left');
        });*/

        /*var la = document.getElementsByTagName('a');
        var aobj = la[parseInt(Math.random()*la.length)];
        aobj.click();*/
        var r = page.evaluate(function () {
            var evt = document.createEvent("MouseEvents");
            var element = document.getElementById('cp_image');
            evt.initMouseEvent(
                "click", // 事件类型
                true,
                true,
                window,
                1,
                1, 1, 1, 1, // 事件的坐标
                false, // Ctrl键标识
                false, // Alt键标识
                false, // Shift键标识
                false, // Meta键标识
                0, // Mouse左键
                element); // 目标元素
            element.dispatchEvent(evt);
        });
        console.log('新地址为'+r.window.location.href);

    } else {
        console.log('fail');
    }
    phantom.exit();
});
