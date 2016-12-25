/**
 * Created by zhenlei on 2016/12/25.
 */
(function(window,document,undefined){
    /**
     * 默认表单输入校验命名规则
     * @type {string}
     */
    var validateNum = "validate-num",
        validateCard = "validate-card",
        validateDec = "validate-dec";
    var InputValidate = function () {
        var inpObj = new Object();
        inpObj.each=function(obj,func){
            if(obj==obj){
                for (var i=0;i<obj.length;i++){
                    func(i,obj[i]);
                }
            }
        };
        inpObj.onKeyDown=function(valInpObj,func){
            valInpObj.addEventListener("keydown", function (event) {
                window.event.returnValue=func(event,valInpObj);
            },false);
        };
        inpObj.onInput=function(valInpObj,func){
            valInpObj.addEventListener('input', function () {
                func(valInpObj);
            }, false);
        };
        inpObj.onPropertyChange=function(valInpObj,func){
            valInpObj.addEventListener('propertychange', function () {
                func(valInpObj);
            }, false);
        };
        inpObj.inputNum = function () {
            var valInpArray=document.getElementsByClassName(validateNum);
            if(valInpArray.length>0){
                inpObj.each(valInpArray,function(i,n){
                    inpObj.onKeyDown(n,checkType);
                    inpObj.onInput(n, checkInputNum);
                    inpObj.onPropertyChange(n,checkInputNum);
                });
            }
            /**
             * 添加键盘按下事件
             * @param valInpObj 当前的文本框对象
             */
            function checkType(event){
                if (event.ctrlKey || event.shiftKey || event.altKey) {
                    return false;
                }
                event = window.event;
                var k = event.keyCode;
                if (!((k >= 96 && k <= 105) || (k >= 48 && k <= 57) || k === 46 || k === 8 || k === 20 || k === 37 || k === 39 || k === 9 )) {
                    return false;
                }
                return true;
            }
            /**
             * 辅助实现仅能输入数字
             * @param valInpObj 当前的文本框对象
             */
            function checkInputNum(valInpObj) {
                valInpObj.value = valInpObj.value.replace(/[\u4e00-\u9fa5]/g, '').replace(/[^\x00-\xff]/ig, '').replace(/[A-Za-z]*/g, '').replace(/[~'!<>@#$%^&*()\-+_=:·.]/g, "").replace(" ","");
            }
        };
        inpObj.inputDec=function(){
            var valInpArray=document.getElementsByClassName(validateDec);
            if(valInpArray.length>0){
                inpObj.each(valInpArray,function(i,n){
                    inpObj.onKeyDown(n,checkType);
                    inpObj.onInput(n, checkInputDec);
                    inpObj.onPropertyChange(n,checkInputDec);
                });
            }
            /**
             * 添加键盘按下事件
             * @param event 当前按钮Key
             */
            function checkType(event,valInpObj){
                if (event.ctrlKey || event.shiftKey || event.altKey) {
                    return false;
                }
                event = window.event;
                var k = event.keyCode;//响应鼠标事件，允许左右方向键移动
                if (!((k >= 96 && k <= 105) || (k >= 48 && k <= 57) || k === 8 || k === 46 || k === 37 || k === 39 || k === 110 || k === 190 || k === 9)) {
                    return false;
                }
                if(k===299||(valInpObj.value.indexOf('.') >= 0&&(k===110||k===190))){
                    return false;
                }
                return true;
            }

            /**
             * 辅助实现仅能输入数字
             * @param valInpObj 当前的文本框对象
             */
            function checkInputDec(valInpObj) {
                valInpObj.value = valInpObj.value.replace(/[\u4e00-\u9fa5]/g, '').replace(/[^\x00-\xff]/ig, '').replace(/[A-Za-z]*/g, '').replace(/[~'!<>@#$%^&*()\-+_=:·]/g, "").replace(" ","");
            }
        };
        inpObj.inputCard=function(){
            var valInpArray=document.getElementsByClassName(validateCard);
            if(valInpArray.length>0){
                inpObj.each(valInpArray,function(i,n){
                    //n.setAttribute("maxlength",18);
                    inpObj.onKeyDown(n,checkType);
                    inpObj.onInput(n, checkInputCard);
                    inpObj.onPropertyChange(n,checkInputCard);
                });
            }
            /**
             * 添加键盘按下事件
             * @param valInpObj 当前的文本框对象
             */
            function checkType(event,valInpObj){
                event = window.event;
                var k = event.keyCode;
                //响应鼠标事件，允许左右方向键移动
                if (!((k >= 96 && k <= 105) || (k >= 48 && k <= 57) || k === 8 || k === 46 || k === 20 || k === 37 || k === 39 || k === 88 || k === 9 )) {
                    return false;
                }
                if(k===299||(valInpObj.value.length>=18&&k!=37&&k!=39&&k!==46&&k!=8)){
                    return false;
                }
                if ((valInpObj.value.indexOf('x') >= 0 || valInpObj.value.indexOf('X') >= 1) && k === 88) {
                    return false;
                }
                return true;
            }

            /**
             * 辅助实现仅能输入身份证
             * @param valInpObj 当前的文本框对象
             */
            function checkInputCard(valInpObj) {
                valInpObj.value=valInpObj.value.replace(/[\u4e00-\u9fa5]/g, '').replace(/[^\x00-\xff]/ig, '').replace(/[A-WY-Za-wy-z]*$/, '').replace(/[~'!<>@#$%^&*()\-+_=:·.]/g, "").replace(" ","");
                if (valInpObj.value.indexOf('x') !== 17) {
                    var i = valInpObj.value.indexOf('x');
                    valInpObj.value=valInpObj.value.substr(0, i) + valInpObj.value.substring(i+1, valInpObj.value.length);
                }
            }
        };
        inpObj.inputNum();
        inpObj.inputDec();
        inpObj.inputCard();
    };
    /**
     * 表单输入限制名称配置
     * @constructor
     */
    var Config=function(){
        var inputConf=new Object();
        inputConf.config = function (rules) {
            if(rules==null)
                return;
            validateNum = rules.num || validateNum;
            validateCard=rules.card||validateCard;
            validateDec=rules.dec||validateDec;
        }
        return inputConf;
    }
    window.validateInput=new Config();
    window.onload=function(){
        InputValidate();
    };
})(window,document);