/**
 * Created by zhenlei on 2016/12/25.
 * 参考https://github.com/jaywcjlove/date.js/issues
 */
(function (window) {
  /**
   * 日期格式化
   * @param res 例如：yyyy年MM月dd日 hh:mm:ss
   * 例：new Date().format("yyyy年MM月dd日 hh:mm:ss");
   * @returns {*}
   */
  Date.prototype.format = function (res) {
    var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(res))
      res = res.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(res))
        res = res.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return res;
  };
  /**
   * 得到距离当前多少小时前、多少分钟前、多少秒前
   * 例1：new Date(1421313125359).ago(1411433200000)
   * 例2：new Date(1421313125359).ago('1992-04-03')
   * 例3：new Date('2010-02-02').ago('1987-04-03')
   * @returns {string}
   */
  Date.prototype.ago = function () {
    if (!arguments.length)
      return "";
    var arg = arguments,
      now = this.getTime(),
      past = !isNaN(arg[0]) ? arg[0] : new Date(arg[0]).getTime(),
      diffValue = now - past,
      result = "",
      minute = 1000 * 60,
      hour = minute * 60,
      day = hour * 24,
      month = day * 30,
      year = month * 12,

      _year = diffValue / year,
      _month = diffValue / month,
      _week = diffValue / (7 * day),
      _day = diffValue / day,
      _hour = diffValue / hour,
      _min = diffValue / minute;

    if (_year >= 1) result = parseInt(_year) + "年前";
    else if (_month >= 1) result = parseInt(_month) + "个月前";
    else if (_week >= 1) result = parseInt(_week) + "周前";
    else if (_day >= 1) result = parseInt(_day) + "天前";
    else if (_hour >= 1) result = parseInt(_hour) + "个小时前";
    else if (_min >= 1) result = parseInt(_min) + "分钟前";
    else {
      result = "刚刚";
    }
    return result;
  }
  /**
   * 解决因时区变更，导致显示服务器时间不准确
   * 例：new Date(1434701732*1000).tzc(8)
   * @param timeZone 时区
   * @returns {Date}
   * @constructor
   */
  Date.prototype.tzc = function (timeZone) {
    var new_date = new Date(),
      old_date = this.getTime();
    return (isNaN(timeZone) && !timeZone) ? this : new Date(old_date + new_date.getTimezoneOffset() * 60 * 1000 + timeZone * 60 * 60 * 1000);
  };
  /**
   * 超过分钟以分钟为单位，超过小时以小时为单位
   * @param format
   * 例：var dt = new Date()
   * dt.toString('hh时mm分ss秒') //=> 34时11分52秒
   * @returns {*}
   */
  Date.prototype.toString = function (format) {
    var str = (this.getTime()).toString().replace(/^\s\s*/, ''), hour, minute, second, o;
    if (!str.length && str.length > 0) return '';
    str = parseInt(str);
    hour = parseInt(str / 3600);
    minute = parseInt(str / 60);
    if (minute >= 60) minute = minute % 60;
    second = str % 60;
    o = {
      "h+": hour,
      "m+": minute,
      "s+": second
    };
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        if (RegExp.$1 == "hh" && hour > 99) {
          format = format.replace('hh', hour)
        } else {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
        }
      }
    }
    ;
    return format
  };
  /**
   * 返回date类型
   * @param date 原时间
   * @param time 增加的时间数
   * @param type 天/小时/分钟/秒 0,1,2,3
   * @param formatStr 格式化
   * @constructor
   */
  Date.prototype.AddDate = function (date, time, type, formatStr) {
    var oldDate = new Date(date);
    var newDate = new Date(oldDate.getTime());
    switch (type) {
      case 0:
        newDate = addDay();
        break;
      case 1:
        newDate = addHour();
        break;
      case 2:
        newDate = addMin();
        break;
      case 3:
        newDate = addSec();
        break;
    }
    if (isNaN(formatStr)) {
      return newDate;
    } else {
      return newDate.format(formatStr);
    }

    /**
     * 增加天数
     * @returns {Date}
     */
    function addDay() {
      return new Date(oldDate.getTime() + (time * 1000 * 60 * 60 * 24));
    }

    /**
     * 增加小时
     */
    function addHour() {
      return new Date(oldDate.getTime() + (time * 1000 * 60 * 60));
    }

    /**
     * 增加分钟
     */
    function addMin() {
      return new Date(oldDate.getTime() + (time * 1000 * 60));
    }

    /**
     * 增加秒
     */
    function addSec() {
      return new Date(oldDate.getTime() + (time * 1000));
    }
  };
})(window);
