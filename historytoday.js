/**
 * Created by kuangxing on 2017/5/29 22:08.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
//抓取历史上今天数据 url:http://www.todayonhistory.com/
var page = require('webpage').create();
page.open('http://www.todayonhistory.com/',function(status){
    if (status !== 'success') {
        console.log('Fail to load the address');
    } else {
        console.log(page.evaluate(function(){
            var d ='';
            var c = document.querySelectorAll('ul .circlel li a');
            var l = c.length;
            for (var i = 0;i<l;i++) {
                d = d+c[i].title+'\n';
            }
            return d;
        }))
    }
    phantom.exit();
});