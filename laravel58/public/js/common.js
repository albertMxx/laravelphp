/**
 * Created by Administrator on 2016/5/4 0004.
 */
window._ = {
    homePage: 'index.php',
    getData: function (url, params, callBack,async) {
        this.ajaxData(url, params, 'get', callBack,async);
    },

    postData: function (url, params, callBack,async) {
        this.ajaxData(url, params, 'post', callBack,async);
    },

    ajaxData: function (url, params, type, callBack,async) {
        this.waiting();
        if (typeof async == 'undefined') {
            async = false;
        }
        var that = this;
        if (typeof params == 'undefined') {
            params = {};
        }
        $.ajax({
            url: url,
            type: type,
            async: async,
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
                    alert('登录已过期，请重新登录');
                    location.href = '/';
                }else{
                    alert('STATUS:' + XMLHttpRequest.status + ';ERROR:' + textStatus + ';TEXT:' + XMLHttpRequest.responseText);
                }that.done();
            }
        });
    },

    getJsonPData: function (url, params, callBack) {
        this.ajaxJsonPData(url, params, 'get', callBack);
    },

    postJsonPData: function (url, params, callBack) {
        this.ajaxJsonPData(url, params, 'post', callBack);
    },

    ajaxJsonPData: function (url, params, type, callBack) {
        this.waiting();
        var that = this;
        if (typeof params == 'undefined') {
            params = {};
        }
        $.ajax({
            url: url,
            type: type,
            async: false,
            dataType: 'jsonp',
            data: params,
            jsonp: "jsoncallback",
            jsonpCallback: "success_jsonpCallback",
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
                    alert('登录已过期，请重新登录');
                    location.href = '/';
                }else{
                    alert('STATUS:' + XMLHttpRequest.status + ';ERROR:' + textStatus + ';TEXT:' + XMLHttpRequest.responseText);
                }that.done();
            }
        });
    },
    /**
     * 下载专用，打开新窗口
     * @param url
     * @param params
     */
    openUrl: function (url, params) {
        if (typeof url == 'undefined') {
            this.alert('请填写URL');
        }
        url = url.indexOf('?') > 0 ? (url + '&') : (url + '?');
        if (typeof params != 'undefined') {
            for (var i in params) {
                url = url + i + '=' + params[i] + '&';
            }
        }
        url = url.substring(0, url.length - 1);
        window.open(url);
    },

    getHtml: function (action) {
        this.waiting();
        var that = this;
        $.ajax({
            url: "/" + this.homePage + "/" + action,
            type: 'get',
            async: false,
            dataType: 'html',
            timeout: 3000,
            success: function (data) {
                $("#main-page").html(data);
                that.done();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 999) {
                    location.href = '/index.php/welcome/login#' + action;
                } else {
                    $("#main-page").html(XMLHttpRequest.responseText);
                    that.done();
                }
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
            if ($input[0].tagName == 'BUTTON') {
                continue;
            }
            if (typeof $input.attr('name') == 'undefined') {
                _.alert('name属性不能为空');
                $input.focus();
                return;
            }
            if ($input.attr('type') == 'checkbox') {
                if ($input.is(':checked')) {
                    if (typeof params[$input.attr('name')] == 'undefined') {
                        params[$input.attr('name')] = [];
                    }
                    params[$input.attr('name')].push($input.val().trim());
                }
                continue;
            }

            if ($input.attr('type') == 'radio') {
                if ($input.is(':checked')) {
                    params[$input.attr('name')] = $input.val().trim();
                }
                continue;
            }

            if ($input.val().trim() == '' && $input.data('type') == 'check') {
                that.alert($input.attr('placeholder') + '不能为空');
                $input.focus();
                return false;
            } else {
                params[$input.attr('name')] = $input.val().trim();
            }
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

    fillForm: function (xid, data) {
        for (var i in data) {
            $("#" + xid).find(":input[name='" + i + "']").val(data[i]);
        }
    },

    alert: function (msg, callback) {
        var w_h = $(window).height();
        $("#alert-msg-info").remove();
        var div = '<div id="alert-msg-info" style="width: 100%;opacity:0.8;position: fixed;text-align: center;z-index: 9999;top:0;padding-top: ' + (w_h - 20) / 2 + 'px">' +
            '<a style="padding: 10px;background-color:#000000;color: #fff;border-radius: 5px;font-size: 14px;">' + msg + '</a></div>';
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
        var w_h = $(window).height();
        pad = (w_h - 100) / 2;
        $("#alert-msg-info,#alert-msg-info-shadow").remove();
        var div = '<div id="alert-msg-info-shadow" style="width: 100%;position: fixed;background-color:#000000;opacity:0.38;text-align: center;z-index: 9998;top:0;"></div>';
        div += '<div id="alert-msg-info" style="width: 100%;position: fixed;z-index: 9999;top:0;padding-top: ' + pad + 'px">' +
            '<div style="width: 80%;margin:0 auto;height: auto;padding:20px;background-color:#FFFFFF;display: block;box-shadow: 0 2px 8px rgba(0, 0, 0, .24);"><div>' +
            '<a style="font-size: 16px;font-family: \'Microsoft YaHei\';">' + msg + '</a></div>' +
            '<div style="margin-top: 12px;text-align: right;font-size: 15px;">' +
            '<a id="confirm-cancel" style="height: 30px;padding: 8px;border-radius: 4px;color:#2AB4EB;cursor: pointer; ">取消</a>' +
            '<a id="confirm-ok" style="height: 30px;padding: 8px;margin-left: 20px;border-radius: 4px;color:#2AB4EB;cursor: pointer;">确定</a></div>' +
            '</div></div>';
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
        var w_h = $(window).height();
        pad = (w_h - 100) / 2;
        $("#alert-msg-info,#alert-msg-info-shadow").remove();
        var div = '<div id="alert-msg-info-shadow" style="width: 100%;position: fixed;background-color:#000000;opacity:0.38;text-align: center;z-index: 9996;top:0;"></div>';
        div += '<div id="alert-msg-info" style="width: 100%;position: fixed;z-index: 9997;top:0;padding-top: ' + pad + 'px">' +
            '<div style="width: 30%;margin:0 auto;height: auto;padding:20px;background-color:#FFFFFF;display: block;box-shadow: 0 2px 8px rgba(0, 0, 0, .24);"><div>' +
            '<a style="font-size: 16px;font-family: \'Microsoft YaHei\';">' + msg + '</a></div>' +
            '<div style="padding: 20px 10px;"><input type="text" placeholder="请输入内容" class="prop-input col-xs-12 form-control"/></div>' +
            '<div style="margin-top: 12px;text-align: right;font-size: 15px;"><br class="space-10">' +
            '<a id="prop-cancel" style="height: 30px;padding: 8px;border-radius: 4px;color:#2AB4EB;cursor: pointer ">取消</a>' +
            '<a id="prop-ok" style="height: 30px;padding: 8px;margin-left: 20px;border-radius: 4px;color:#2AB4EB;cursor: pointer">确定</a></div>' +
            '</div></div>';
        $('body').append(div);

        $("#prop-cancel,#prop-ok").click(function () {
            $(this).css('background-color', '#eeeeee').unbind('click');
            $("#alert-msg-info,#alert-msg-info-shadow").fadeOut(500);
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
        var div = '<div id="waiting-image" style="text-align: center; width: 100%;height: 100%;position: fixed;z-index: 99999;top:0;padding-top: ' + pad + 'px">';
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
                this.getHtml(query);
            else
                return true;
        } else {
            this.getHtml('welcome/home');
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

    get_strlen: function (str) {
        str = str.replace(/\s/g,'');
        if (str == null) return 0;
        if (typeof str != "string") {
            str += "";
        }
        var len = str.replace(/[^\x00-\xff]/g, "011").length;
        return Math.ceil(len / 3);
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

