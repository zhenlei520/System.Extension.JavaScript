/**
 * Created by zhenlei on 2016/12/25.
 */
(function(window,document){
    var LocalStorage= function () {
        var localStorageObj={};
        localStorageObj.isSupported=function(){
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        };
        localStorageObj.getItem= function (key) {
            if(localStorageObj.isSupported()){
                return localStorage.getItem(key);
            }else{
                return cookie.getItem(key);
            }
        };
        localStorageObj.setItem= function (key,value) {
            if(localStorageObj.isSupported()){
                localStorage.setItem(key,value);
            }else{
                cookie.setItem(key,value);
            }
        };
        localStorageObj.removeItem= function (key) {
            if(localStorageObj.isSupported()){
                localStorage.removeItem(key);
            }else{
                cookie.removeItem(key);
            }
        };
        localStorageObj.clear=function(){
            if(localStorageObj.isSupported()){
                localStorage.clear();
            }else{
                var cookieAll=document.cookie;
                for(var i=0;i<cookieAll.length;i++){
                    cookie.removeItem(cookieAll[i]);
                }
            }
        };
        return localStorageObj;
    };
    window.localStorage=new LocalStorage();
    localStorage=window.localStorage||new LocalStorage();
})(window,document);