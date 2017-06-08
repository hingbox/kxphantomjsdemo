/**
 * Created by kuangxing on 2017/5/29 21:48.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
var page = require('webpage').create(),system=require('system'),
    t,address;

if (system.args.length === 1){
    console.log('Usage:loadsppen.js<some URL>')
    phantom.exit();
}
/*t = Date.now();
address =system.args[1];
page.open(address,function(status){
    if (status !== 'success') {
        console.log('FAIl the load the address');
    } else {
        t = Date.now() -t ;
        console.log('Loading '+address+'Loadding time'+t+'msec')
    }
    phantom.exit();
});*/

//var page = require('webpage').create();
url = system.args[1];
page.open(url, function (status) {
    var title = page.evaluate(function () {
        return document.title;
    });
    console.log('Page title is ' + title);
});
