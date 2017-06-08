var system=require('system'); //获得系统操作对象，包括命令行参数、phantomjs系统设置等信息
console.log(system)
console.log('Hello, world!');
var page = require('webpage').create();
page.open('http://www.baiu.com',function(){
    page.render('baidu.png')
    phantom.exit();
});
