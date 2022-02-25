/**
 * Created by Administrator on 2016/5/4 0004.
 */
window._ = {
    // imageHost: "http://image.seello.com/",
    // appHost: "http://www.seello.com/",
    homePage: 'index.php',
    getData: function (url, params, callBack) {
        this.ajaxData(url, params, 'get', callBack);
    },

    postData: function (url, params, callBack) {
        this.ajaxData(url, params, 'post', callBack);
    },

    ajaxData: function (url, params, type, callBack) {
        this.waiting();
        var that = this;
        if (typeof params == 'undefined') {
            params = {};
        }
        $.ajax({
            url: url,
            type: type,
            async: false,
            dataType: 'json',
            data: params,
            timeout: 3000,
            success: function (data) {
                if (typeof callBack == 'function' || (typeof eval(callBack) == 'function')) {
                    if (typeof callBack == 'function') {
                        call_use_func = callBack;
                    } else {
                        call_use_func = eval(callBack);
                    }
                    call_use_func(data)
                } else {
                    that.alert(data.msg)
                }
                that.done();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 999) {
                    that.shade();
                    that.getHtml('alert/login', 'body', 'append');
                } else {
                    // that.alert('STATUS:' + XMLHttpRequest.status + ';ERROR:' + textStatus + ';TEXT:' + XMLHttpRequest.responseText);
                }
                that.done();
            }
        });
    },

    getHtml: function (action, node, type) {
        if (typeof  node == 'undefined') {
            this.alert('加载节点不能为空');
            return false;
        }
        this.waiting();
        var that = this;
        $.ajax({
            url: "/" + this.homePage + "/" + action,
            type: 'get',
            async: false,
            dataType: 'html',
            timeout: 3000,
            success: function (data) {
                if (typeof type != 'undefined') {
                    if (type == 'append') {
                        $(node).append(data);
                    } else {
                        $(node).html(data);
                    }
                } else {
                    $(node).html(data);
                }

                that.done();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 999) {
                    that.shade();
                    that.getHtml('alert/login', 'body', 'append');
                } else if (XMLHttpRequest.status == 998) {
                    location.href = '/index.php'
                } else {
                    $(node).html(XMLHttpRequest.responseText);
                }
                that.done();
            }
        });

    },

    postHtml: function (action, params, node, type) {
        if (typeof  node == 'undefined') {
            this.alert('加载节点不能为空');
            return false;
        }
        this.waiting();
        var that = this;
        $.ajax({
            url: "/" + this.homePage + "/" + action,
            data: params,
            type: 'post',
            async: false,
            dataType: 'html',
            timeout: 3000,
            success: function (data) {
                if (typeof type != 'undefined') {
                    if (type == 'append') {
                        $(node).append(data);
                    } else {
                        $(node).html(data);
                    }
                } else {
                    $(node).html(data);
                }

                that.done();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 999) {
                    that.shade();
                    that.getHtml('alert/login', 'body', 'append');
                } else if (XMLHttpRequest.status == 998) {
                    location.href = '/index.php'
                } else {
                    $(node).html(XMLHttpRequest.responseText);
                }
                that.done();
            }
        });

    },

    formatTpl: function (data, tpl) {
        tpl = tpl.replace('data-img', 'src');
        tpl = tpl.replace(/\{\{([^\{]+)\}\}/gi, function ($1, $2) {
            try {
                re = eval('data.' + $2);
                if (re == 'undefined' || re == null) {
                    re = '';
                }
            } catch (e) {
                re = eval($2);
                if (re == 'undefined' || re == null) {
                    re = '';
                }
            }

            return re;
        });
        return tpl;
    },

    sendForm: function (id) {
        var params = {};
        var that = this;
        var flag = true;
        var input_len = $("#" + id).find(':input').length;
        for (var i = 0; i < input_len; i++) {
            $input = $("#" + id).find(':input').eq(i);
            if ($input[0].tagName == 'BUTTON' || $input.attr('type') == 'button') {
                continue;
            }
            if (typeof $input.attr('name') == 'undefined') {
                _.alert('name属性不能为空');
                $input.focus();
                return;
            }
            if ($input.attr('type') == 'checkbox') {
                if ($input.is(':checked')) {
                    params[$input.attr('name')] = $input.val().trim();
                }
                continue;
            }
            if ($input.data('type') == 'check') {
                if ($input.val().trim() == '') {
                    $input.parent().next().text($input.attr('nullmsg'));
                    $input.focus();
                    return false;
                } else {
                    var check = $input.data('check');
                    msg = $input.attr('errmsg');
                    if (typeof msg == 'undefined') {
                        msg = $input.attr('placeholder');
                    }
                    $input.parent().next().text('');
                    switch (check) {
                        case 'preg':
                            preg = $input.data('condition');
                            preg = preg.substring(1, preg.length - 1);
                            p = new RegExp(preg);
                            if (!$input.val().match(preg)) {
                                $input.parent().next().text(msg);
                                $input.focus();
                                return false;
                            }
                            break;
                        case 'email':
                            if (!$input.val().match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
                                $input.parent().next().text('邮箱格式错误');
                                $input.focus();
                                return false;
                            }
                            break;
                        case 'length':
                            length = $input.data('condition').split('-');
                            if ($input.val().length < length[0] || $input.val().length > length[1]) {
                                $input.parent().next().text(msg);
                                $input.focus();
                                return false;
                            }
                            break;
                        case 'match':
                            m_id = $input.data('condition');
                            if ($input.val() != $("#" + m_id).val()) {
                                $input.parent().next().text(msg);
                                $input.focus();
                                return false;
                            }
                            break;
                        case 'mobile':
                            if (!$input.val().match(/^1[3456789][0-9]{9}$/)) {
                                $input.parent().next().text('手机格式错误');
                                $input.focus();
                                return false;
                            }
                            break;
                    }
                }
            }
            params[$input.attr('name')] = $input.val().trim();
        }
        if (flag) {
            return params;
        }
        return false;
    },

    clearForm: function (id) {
        var input_len = $("#" + id).find('input').length;
        for (var i = 0; i < input_len; i++) {
            $("#" + id).find('input').eq(i).val('');
        }
        var textarea_len = $("#" + id).find('textarea').length;
        for (var i = 0; i < textarea_len; i++) {
            $("#" + id).find('textarea').eq(i).val('');
        }
    },

    alert: function (msg, callback) {
        // var w_h = $(window).height();
        $("#alert-msg-info").remove();
        var div = '<div id="alert-msg-info"  class="m-common-alert"><p class="u-alert-text">' + msg + '</p></div>'
        $('body').append(div);
        t = setTimeout(function () {
            $("#alert-msg-info").fadeOut(500);
            if (typeof callback == 'function' || (typeof eval(callback) == 'function')) {
                if (typeof callback == 'function') {
                    call_use_func = callback;
                } else {
                    call_use_func = eval(callback);
                }
                call_use_func()
            }
        }, 500);
        $("#alert-msg-info").click(function () {
            $("#alert-msg-info").fadeOut(500);
            clearTimeout(t);
            if (typeof callback == 'function' || (typeof eval(callback) == 'function')) {
                if (typeof callback == 'function') {
                    call_use_func = callback;
                } else {
                    call_use_func = eval(callback);
                }
                call_use_func()
            }
        });

    },
    confirm: function (msg, callback) {
        // var w_h = $(window).height();
        // pad = (w_h - 100) / 2;
        $("#alert-msg-info,#alert-msg-info-shadow,#prop-msg-info-shadow").remove();
        var div = '<div id="alert-msg-info-shadow" style="width: 100%;position: fixed;background-color:#000000;opacity:0.38;text-align: center;z-index: 9998;top:0;"></div>';
        div += '<div id="alert-msg-info" class="m-common-tips ">'
            + '<h5 class="f-fs14">提示</h5><p class="f-fs14 f-tac">' + msg + '</p><div class="u-common-tipsbtn"><span class="z-ok" id="confirm-ok">确定</span><span id="confirm-cancel">取消</span></div></div>';
        $('body').append(div);

        $("#confirm-cancel,#confirm-ok").click(function () {
            $(this).css('background-color', '#eeeeee').unbind('click');
            $("#alert-msg-info,#alert-msg-info-shadow").fadeOut(500);
            if ($(this).attr('id') == 'confirm-ok') {
                confirm_re = true;
            } else {
                confirm_re = false;
            }
            if (typeof callback == 'function' || (typeof eval(callback) == 'function')) {
                if (typeof callback == 'function') {
                    call_use_func = callback;
                } else {
                    call_use_func = eval(callback);
                }
                call_use_func(confirm_re)
            }
        });
    },

    prop: function (msg, callback) {
        // var w_h = $(window).height();
        // pad = (w_h - 100) / 2;
        $("#alert-msg-info,#prop-msg-info-shadow,#alert-msg-info-shadow").remove();
        var div = '<div id="prop-msg-info-shadow" style="width: 100%;position: fixed;background-color:#000000;opacity:0.38;text-align: center;z-index: 9996;top:0;"></div>';
        div += '<div id="alert-msg-info" class="m-common-tips m-common-prop"><h5 class="f-fs14">' + msg + '</h5><input class="prop-input" type="text" name=""><div class="u-common-tipsbtn"><span class="z-ok" id="prop-ok">确定</span><span id="prop-cancel">取消</span></div></div>';
        $('body').append(div);

        $("#prop-cancel,#prop-ok").click(function () {
            $(this).css('background-color', '#eeeeee').unbind('click');
            $("#alert-msg-info,#prop-msg-info-shadow").fadeOut(500);
            if ($(this).attr('id') == 'prop-ok') {
                confirm_re = true;
            } else {
                confirm_re = false;
            }
            if (typeof callback == 'function' || (typeof eval(callback) == 'function')) {
                if (typeof callback == 'function') {
                    call_use_func = callback;
                } else {
                    call_use_func = eval(callback);
                }
                if (confirm_re) {
                    $msg = $('.prop-input').val().trim();
                    if ($msg == '') {
                        _.alert('内容不能为空');
                        return false;
                    }
                    call_use_func($msg)
                }
            }

        });
    },
    waiting: function () {
        var w_h = $(window).height();
        pad = (w_h - 100) / 2;
        var div = '<div id="waiting-image" style="text-align: center; width: 100%;height: 100%;position: fixed;z-index: 99999;top:0;padding-top: ' + pad + 'px">' +
            '<img src="/styles/images/loading.gif"></div>';
        $('body').append(div);
    },

    done: function () {
        $("#waiting-image").remove();
    },
    hsah_change_get: function () {
        var href = window.location.href;
        var query = href.substr(href.lastIndexOf("#") + 1);
        query = query.replace('?', '&');
        if (href.lastIndexOf("#") != -1) {
            if (query.length > 0)
                this.getHtml(query, '#main-content');
            else
                return true;
        } else {
            this.getHtml('welcome/home', '#main-content');
        }
    },

    base64Encode: function (str) {
        str = str + '';
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    },

    base64Decode: function (str) {
        var base64DecodeChars = new Array(
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
            52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
            -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
            -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
        );
        str = str + '';
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            }
            while (i < len && c1 == -1);
            if (c1 == -1)
                break;
            /* c2 */
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            }
            while (i < len && c2 == -1);
            if (c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = base64DecodeChars[c3];
            }
            while (i < len && c3 == -1);
            if (c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = base64DecodeChars[c4];
            }
            while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    },
    // 遮罩
    shade: function () {
        $("body").append("<div class='u-shade'></div>");
    },
         // 向上滚动
    //参数分别表示（id:id/class名，speed:速度，timer:时间间隔，hei:滚动高度，lengt:大于多少个才开始滚动，onoff：1表示开其他值或者没有值表示关）
    scrollT:function(id,speed,timer,hei,lengt,onoff){
        var $ul=$("#"+id);
            h=hei;
            len=$ul.find("li").length;
        var t=function(){
            $ul.animate({marginTop:-h}, speed)
            setTimeout(function(){
                $ul.find("li").eq(0).appendTo($ul)
            },speed)
            $ul.animate({marginTop:0}, 0)
        }
        if (len>lengt) {
            var setI=setInterval(t,timer)
            if(onoff==1){
                $ul.on("mouseenter",function(){
                 clearInterval(setI)
                }).on("mouseleave",function(){
                     setI=setInterval(t,timer)
                })
            }
        }
    }

};


// var href = window.location.href;
// var host = href.split('#')[0];
// var file = host.split('/').pop();
// _.homePage = file;

var change_parent = '';
$(".parent-node").click(function () {
    text = $(this).text();
    change_parent = text;
});

$(".child-node").click(function () {
    sessionStorage.clear();
    text = $(this).text();
    sessionStorage.child_node = text;
    sessionStorage.parent_node = change_parent;
    $(".breadcrumb li").not(":first").remove();
    $(".nav-list-child").removeClass('active');
    $(this).parent('li').addClass('active');
    $(".breadcrumb").append('<li class="active">' + sessionStorage.parent_node + '</li>');
    $(".breadcrumb").append('<li class="active child-node-li">' + text + '</li>');
});

if (typeof sessionStorage.parent_node != 'undefined') {
    change_parent = sessionStorage.parent_node;
    $(".breadcrumb").append('<li class="active">' + sessionStorage.parent_node + '</li>');
    $(".parent-node").each(function () {
        if ($(this).text() == sessionStorage.parent_node) {
            $(this).parent().addClass('open');
            $(this).siblings('ul').css({display: 'block'});
        }
        $('.child-node').each(function () {
            if ($(this).text() == sessionStorage.child_node) {
                $(this).parent('li').addClass('active');
                $(this).parent('li').siblings('li').removeClass('active');
            }
        })
    });
    if (typeof sessionStorage.child_node != 'undefined') {
        $(".breadcrumb").append('<li class="active child-node-li">' + sessionStorage.child_node + '</li>');

    }
}

// 关闭弹层
$(".j-popup-close").on("click", function () {
    $(this).parent().addClass("f-dn");
    $(".u-shade").remove()
});
var D = new Date();


// document.onkeydown = function (e) {
//     var ev = window.event || e;
//     var code = ev.keyCode || ev.which;
//     if (code == 116) {
//         if (typeof localStorage.current_url_page != 'undefined' && localStorage.current_url_page == location.href) {
//             // console.log('bbbbb');
//             D = new Date();
//             if (localStorage.current_url_time > D.getTime() - 1000) {
//                 // console.log(location.href, D.getTime())
//                 _.alert('您的操作太快了，请休息下！');
//                 localStorage.current_url_page = location.href;
//                 localStorage.current_url_time = D.getTime();
//                 return false;
//             }
//         }
//         // console.log('aaaaa')
//     }
// };
localStorage.current_url_page = location.href;
localStorage.current_url_time = D.getTime();




