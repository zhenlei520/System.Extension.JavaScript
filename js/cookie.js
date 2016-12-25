/**
 * Created by zhenlei on 2016/12/25.
 */

(function(window,document){
    var Cookie = function () {
        var cookieObj={};
        cookieObj.setCookie=function(key,value,expiredays){
            var exDate=new Date();
            exDate.setDate(exDate.getDate()+expiredays);
            document.cookie=key+ "=" +escape(value)+
                ((expiredays==null) ? "" : ";expires="+exDate.toGMTString());
        };
        cookieObj.getItem=function(key){
            var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        };
        cookieObj.removeItem=function(key){
            var exDate = new Date();
            exDate.setTime(exDate.getTime() - 1);
            var cVal=this.getCookie(key);
            if(cVal!=null)
                document.cookie= key + "="+cVal+";expires="+exDate.toGMTString();
        };
        return cookieObj;
    };
    window.cookie=new Cookie();
    cookie=window.cookie||new Cookie();
})(window,document);