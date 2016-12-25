/**
 * Created by zhenlei on 2016/12/24.
 */

window.onload=pageLoad();


(function(window,document,undefined){
    var regexConfig={
        /**
         * 数字正则表达式
         */
        regexNum:/^[0-9]+$/,
        /**
         * 手机号正则表达式
         */
        regexPhone:/^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/,
        /**
         * 邮箱正则表达式
         */
        regexEmail:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        /**
         * 小数正则表达式
         */
        regexDecimal: /^\-?[0-9]*\.?[0-9]+$/,
        /**
         * 身份证正则表达式
         */
        regexCard:"\d{17}[\d|x]|\d{15}",
        /**
         * ip正则表达式
         * [ip ipv4、ipv6]
         */
        regexIp:/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        /**
         * url正则表达式
         */
        regexUrl:/^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        /**
         * base64验证
         */
        regexBase64:/[^a-zA-Z0-9\/\+=]/i
    };
    var Validate=function(){
        var validate={};
        /**
         * 检验是否为空
         * @param str 待验证的字符串
         * @returns {boolean}
         */
        validate.isNullOrEmpty= function (str) {
            return !!(str == null || str === '' || str === "");
        };
        /**
         * 检验是否数字
         * @param str 待验证的字符串
         * @returns {boolean}
         */
        validate.isNum=function(str){
            return validate.isNullOrEmpty(str) ? false : regexConfig.regexNum.test(str);
        };
        /**
         * 检验是否手机号
         * @param str
         */
        validate.isPhone=function(str){
            return validate.isNullOrEmpty(str) ? false : regexConfig.regexPhone.test(str);
        };
        /**
         * 检验是否邮箱
         * @param str 待验证的字符串
         * @returns {boolean}
         */
        validate.isEmail= function (str) {
            return validate.isNullOrEmpty(str) ? false : regexConfig.regexEmail.test(str);
        };
        /**
         * 检验是否小数
         * @param str 待验证的字符串
         */
        validate.isDecimal=function(str){
            return validate.isNullOrEmpty(str) ? false : regexConfig.regexDecimal.test(str);
        };
        /**
         * 检验是否身份证
         * @param str 待验证的字符串
         * @returns {boolean}
         */
        validate.isCard= function (str) {
            return validate.isNullOrEmpty(str) ? false : regexConfig.regexCard.test(str);
        };
        /**
         * 检验是否身份证(严格判断)
         * @param str 待验证的字符串
         */
        validate.isCardStrict=function(str){
            var card=str;//身份证
            var cityArray = {
                11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
                21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
                33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
                42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
                51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
                63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
            };
            //是否为空
            if (validate.isNullOrEmpty(card)) {
                return false;
            }
            //校验长度，类型
            if (isCardNo() === false) {
                return false;
            }
            //检查省份
            if (checkProvince() === false) {
                return false;
            }
            //校验生日
            if (checkBirthday() === false) {
                return false;
            }
            //检验位的检测
            return checkParity() !== false;

            //检查号码是否符合规范，包括长度，类型
            function isCardNo() {
                //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
                return reg.test(card) !== false;

            }
            /**
             * 取身份证前两位,校验省份
             * @returns {boolean}
             */
            function checkProvince() {
                var province = card.substr(0, 2);
                return cityArray[province] != undefined;
            }

            /**
             * 校验日期
             * @param year 年
             * @param month 月
             * @param day 日
             * @param birthday 出生日
             * @returns {boolean}
             */
            function checkBirthday(year, month, day, birthday) {
                var now = new Date();
                var nowYear = now.getFullYear();
                //年月日是否合理,一个是number，一个是int，不能三等
                if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
                    //判断年份的范围（3岁到100岁之间)
                    var time = nowYear - year;
                    return !!(time >= 3 && time <= 100);
                }
                return false;
            }
            /**
             * 校验位的检测
             * @returns {boolean}
             */
            function checkParity() {
                //15位转18位
                card = changeFifteenToEighteen();
                var len = card.length;
                if (len === 18) {
                    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                    var cardTemp = 0, i;
                    for (i = 0; i < 17; i++) {
                        cardTemp += card.substr(i, 1) * arrInt[i];
                    }
                    var valNum = arrCh[cardTemp % 11];
                    return valNum === card.substr(17, 1);

                }
                return false;
            }
            /**
             * 15位转18位身份证号
             * @returns {*}
             */
            function changeFifteenToEighteen() {
                if (card.length === 15) {
                    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                    var cardTemp = 0, i;
                    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
                    for (i = 0; i < 17; i++) {
                        cardTemp += card.substr(i, 1) * arrInt[i];
                    }
                    card += arrCh[cardTemp % 11];
                    return card;
                }
                return card;
            }
        };
        /**
         * 检验是否ip
         * @param str 待验证的字符串
         */
        validate.isIp=function(str){
            return !validate.isNullOrEmpty(str) ? regexConfig.regexIp.test(str) : false;
        };
        /**
         * 检验是否url
         * @param str 待验证的字符串
         */
        validate.isUrl=function(str){
            return !validate.isNullOrEmpty(str) ? regexConfig.regexUrl.test(str) : false;
        };
        /**
         * 检验是否Base64
         * @param str 待验证的字符串
         */
        validate.isBase64=function (str){
            return !validate.isNullOrEmpty(str) ? regexConfig.regexBase64.test(str) : false;
        };
        /**
         * 是否Ie浏览器
         */
        validate.isIE=function(){
            return !!(!!window.ActiveXObject || "ActiveXObject" in window);
        };
        /**
         * 判断是否方法
         * @param funcName 待验证的方法名称
         */
        validate.isFunc= function (funcName) {
            try {
                if (typeof (eval(funcName)) == "function")
                    return true;  //存在且是function
                return false;   //不存在或不是function
            } catch (e) {
                return false;   //不存在或不是function
            }
        };
        return validate;
    };
    window.validate=new Validate();
    validate=window.validate||new Validate();
})(window, document);