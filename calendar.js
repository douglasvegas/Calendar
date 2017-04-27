 function addClass(obj, cls) {
        var obj_class = obj.className,//获取 class 内容.  
            blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'. 
        if (obj_class.indexOf(cls) == -1) {
            var added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.  
            obj.className = added;//替换原来的 class.  
        }
       
    }
    function removeClass(obj, cls) {
        var obj_class = ' ' + obj.className + ' ',//获取 class 内容, 并在首尾各加一个空格. ex) 'abc bcd' -> ' abc bcd '  
        obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc bcd ' -> ' abc bcd '  
        removed = obj_class.replace(' ' + cls + ' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '  
        var removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'  
        obj.className = removed;//替换原来的 class.  
    }
    function hasClass(obj, cls) {
        var obj_class = obj.className;//获取 class 内容.  
        var obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.  
        var x = 0;
        for (x in obj_class_lst) {
            if (obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls  
                return true;
            }
        }
        return false;
    }
    function removeItem(arr, item) {
        var index = arr.indexOf(item);
        if (index != -1) {
            arr.splice(index, 1)
        }
        return arr
    }
    function toggleItem(arr, item) {
        var index = arr.indexOf(item);
        if (index != -1) {
            arr.splice(index, 1)
        } else {
            arr.push(item)
        }
        return arr
       
    }
    function toggleClass(obj, cls) {
        if (hasClass(obj, cls)) {
            removeClass(obj, cls)
        } else {
            addClass(obj, cls)
        }
    }
    //日历组件
    function InitCalendar() {
        this.flag = 0;
        this.choosedDate = [];
        this.start = '';
        this.end = '';
        this.iNow = 0;
    }
    InitCalendar.prototype.init = function (initObj, config) {
        this.config = config;
        this.initObj = initObj;
        //this.choosedDate = []
        this.fileHtml(initObj);

    }
    InitCalendar.prototype.reset = function (arr) {
        this.flag = 0;
        this.choosedDate = arr || [];
        this.start = '';
        this.end = '';
        this.iNow = 0;
        this.initObj.innerHTML = '';
        this.fileHtml(this.initObj);
    }
    InitCalendar.prototype.fileHtml = function (initObj) {
        var oDiv = initObj;
        var oBtnPre = document.createElement('a');
        //创建左右按钮
        oBtnPre.className = 'prev';
        oBtnPre.href = 'javascript:;';
        oBtnPre.innerHTML = "&lt;&lt";
        oDiv.appendChild(oBtnPre);

        var oBtnNext = document.createElement('a');
        oBtnNext.className = 'next';
        oBtnNext.href = 'javascript:;';
        oBtnNext.innerHTML = "&gt;&gt";
        oDiv.appendChild(oBtnNext);
        //左右动作
        var _this = this;

        //创建月份span
        var oSpan = document.createElement('span');
        // oSpan.id = 'yearAndMonth';
        oDiv.appendChild(oSpan);
        //创建ol
        var oOl = document.createElement('ol');
        oDiv.appendChild(oOl);
        oOl.innerHTML = '<li>一</li>\
                        <li>二</li>\
                        <li>三</li>\
                        <li>四</li>\
                        <li>五</li>\
                        <li class="week_end">六</li>\
                        <li class="week_end">日</li>';

        //创建日期ul
        var oUl = document.createElement('ul');
        // oUl.id = 'dateUl'
        oDiv.appendChild(oUl);
        this.refresh(oSpan, oUl);
        oBtnNext.onclick = function () {
            _this.start = '';
            _this.end = '';
            _this.flag = 0;
            _this.iNow++;
            _this.refresh(oSpan, oUl);
        };
        oBtnPre.onclick = function () {
            _this.start = '';
            _this.end = '';
            _this.flag = 0;
            _this.iNow--;
            _this.refresh(oSpan, oUl);
        };
    }
    InitCalendar.prototype.refresh = function (oSpan, oUl) {
        var _this = this;
        var oUl = oUl;
        var oSpan = oSpan;
        oUl.innerHTML = '';
        var oDate = new Date();
        oDate.setDate(1);
        oDate.setMonth(oDate.getMonth() + _this.iNow);
        oSpan.innerHTML = oDate.getFullYear() + "年" + (oDate.getMonth() + 1) + "月";
        oSpan.setAttribute('data-date', oDate.getFullYear() + "-" + (oDate.getMonth() + 1 > 0 ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1));
        //补空白
        oDate.setDate(1);
        var day = oDate.getDay();
        day = day == 0 ? 7 : day;
        day--;
        for (var i = 0; i < day; i++) {
            var oLi = document.createElement('li');
            oUl.appendChild(oLi);
        }
        //日期获取
        var oDate2 = new Date();
        var today = oDate2.getDate();
        oDate2.setDate(1);
        oDate2.setMonth(oDate2.getMonth() + _this.iNow);
        oDate2.setDate(1);
        oDate2.setMonth(oDate2.getMonth() + 1);
        oDate2.setDate(0);
        var total = oDate2.getDate();
        for (var i = 1; i <= total; i++) {
            var oLi = document.createElement('li');
            oLi.innerHTML = i;
            var currentLiDate = oSpan.getAttribute('data-date') + "-" + (i < 10 ? '0' + i : i);
            oLi.setAttribute('data-date', currentLiDate);
            if (_this.choosedDate.indexOf(currentLiDate) != -1) {
                addClass(oLi, 'choosed');
            }

            oUl.appendChild(oLi);
            if (_this.iNow < 0) {
                addClass(oLi, 'past');
            } else if (_this.iNow == 0) {
                if (parseInt(oLi.innerHTML) < today) {
                    addClass(oLi, 'past');
                    removeClass(oLi, 'choosed');
                } else {
                    addClass(oLi, 'canChoose');
                    if (parseInt(oLi.innerHTML) == today) {
                        addClass(oLi, 'today');
                    }
                    oLi.onmousedown = function (e) {
                        e.preventDefault();
                        var _this_li = this;
                        _this.handleShift(e, _this_li, _this)
                    }
                }
            } else if (_this.iNow === _this.config.rangeMonth) {
                if (i > today) {
                    addClass(oLi, 'past');
                } else {
                    addClass(oLi, 'canChoose');
                    oLi.onmousedown = function (e) {
                        e.preventDefault();
                        var _this_li = this;
                        _this.handleShift(e, _this_li, _this)
                    }
                }
            } else if (_this.iNow > _this.config.rangeMonth) {
                addClass(oLi, 'past');
            } else {
                addClass(oLi, 'canChoose');
                oLi.onmousedown = function (e) {
                    e.preventDefault();
                    var _this_li = this;
                    _this.handleShift(e, _this_li, _this)
                }
            }

        }
        for (var i = 0; i < oUl.children.length; i++) {
            if (i % 7 == 5 || i % 7 == 6) {
                if (oUl.children[i].className == 'canChoose') {
                    addClass(oUl.children[i], 'week_end');
                }
            }
        }

    }
    InitCalendar.prototype.handleShift = function (e, _this_li, _this) {
        var item = _this_li.getAttribute("data-date")
        if (e.shiftKey) {
            if (!hasClass(_this_li, 'choosed')) {
                _this.flag++;
                if (_this.flag === 1) {
                    _this.start = item;
                    addClass(_this_li, 'choosed')
                    toggleItem(_this.choosedDate, item)
                } else {
                    _this.end = item;
                    toggleItem(_this.choosedDate, item)
                    _this.processShiftDate()
                }
            } else {
                _this.end = '';
                removeClass(_this_li, 'choosed')
            }
        } else {
            _this.start = '';
            _this.end = '';
            _this.flag = 0;
            toggleClass(_this_li, 'choosed')
            toggleItem(_this.choosedDate, item)
        }
    }
    InitCalendar.prototype.processShiftDate = function () {
        var id = this.initObj.id;
        var selector = "#" + id + " .canChoose"
        var arr = document.querySelectorAll(selector);
        var shiftChoosed = [];
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            var date = obj.getAttribute("data-date")
            if (date >= this.start && date <= this.end) {
                addClass(arr[i], 'choosed')
                shiftChoosed.push(date);
                if (this.choosedDate.indexOf(date) === -1) {
                    this.choosedDate.push(date)
                }
            }
        }
    }
    InitCalendar.prototype.getChoosed = function () {
        return this.choosedDate;
    }
    InitCalendar.prototype.setChoosed = function (arr) {
        this.choosedDate = arr || [];
        this.reset(arr);
    }
    InitCalendar.prototype.getShiftChoosed = function () {
        return {
            start: this.start,
            end: this.end
        }
    }
    InitCalendar.prototype.getConfig = function () {
        return this.config;
    }
    InitCalendar.prototype.getMinMax = function () {
        var arr = this.choosedDate.concat([]);
        arr.sort(function (a, b) {
            return parseInt(a.replace(/-/g, "")) - parseInt(b.replace(/-/g, ""))
        })
        return {
            BeginDate: arr.shift(),
            EndDate: arr.pop()
        }
    }
    
var Calendar = new InitCalendar();
var Calendar1 = new InitCalendar();

Calendar.init(document.getElementById('calender'),{
    rangeMonth: 3
})
Calendar1.init(document.getElementById('calender1'),{
    rangeMonth: 4
})
document.querySelector(".getChoosed").onclick = function () {
    console.log(Calendar.getChoosed())
}
document.querySelector(".getShiftChoosed").onclick = function () {
    console.log(Calendar.getShiftChoosed())
}
document.querySelector(".getConfig").onclick = function () {
    console.log(Calendar.getConfig())
}
