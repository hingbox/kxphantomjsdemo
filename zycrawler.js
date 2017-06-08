/**
 * Created by kuangxing on 2017/6/2 22:03.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
var page = require('webpage').create();
page.open('http://www.zk120.com/',function(status){
    if (status !== 'success') {
        console.log('net is not access');
    } else {
        page.render('zy.png');

    }
    phantom.exit();
});