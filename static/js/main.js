// 配置requirejs
requirejs.config({
    urlArgs: 'v=' + new Date(),
    //设置baseUrl,所有js的url都以该值为基础
    //如果不配置该值,那么在HTML页面包含require.js的script tag的data-main属性指明的目录将被隐式设置为baseUrl
    //若依赖路径以协议名或者/开头,或以.js结属,将不使用baseUrl
    baseUrl: 'static/js/lib',
    //路径例外.　当依赖项的路径以下列键开头时,用值替换
    paths:{
        app: '../app',
        helper: '../helper',
        jquery:'jquery/3.2.1/jquery.min'
    },
    //shim参数要解决的问题是此用不符合AMD规范的js库
    shim:{
        'helper/utilNoAMD':{
            deps:[],
            exports:'utilNoAMDGlobal'
        },
    },
});

//加载js结束后,可以做一些初始化工作
requirejs(['helper/util'],function(util){
    util.p();
    console.log("I am in main.js after util.js have been loaded.");
});

//依赖符合AMD规范的js库
require(['helper/util'], function(util){
    util.p();
});
//依赖不符合AMD规范的js库, requirejs.config(shim)解决这个问题
require(['helper/utilNoAMD'], function(utilNoAMDGlobal){
    utilNoAMDGlobal.start();
});

/**
 * clipboard.js实现文本复到到系统剪切板上
 */
require(['clipboard'],function(Clipboard){
    //　选择器可以使用.#等
    var clp = new Clipboard('.btn');
    clp.on('success', function(e){
        //e.action可能是copy或者cut
        console.log(e.action);
        //e.text 代表复制的文本
        console.log(e.text);
        //触发的控件,通常为按钮
        console.log(e.trigger);
        alert('Copy success');
        e.clearSelection();
    });
});
