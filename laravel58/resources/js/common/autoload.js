/**
 * Created by Administrator on 2016/5/12 0012.
 */
window.autoLoad = {
    dataList: 'data',//返回数据中参数的字段
    pageSize: 10, //每页获取数量
    currentPage: 0, // 当前页
    htmlNode: '',//数据添加节点
    scrollNode: null,//绑定div的滚动条id 默认document
    url: false,// 获取数据链接
    bindAction: null,//item中绑定的事件
    doFunction: null,//item中绑定的事件
    finished: null,//数据加载完成后执行的方法
    finishedMsg: '已经到最后一页了',
    template: null,//数据处理模版
    data: {},
    templates: '',
    load_image: '/styles/image/loading.gif',
    main_url: 'index.php',
    getData: function () {
        page = parseInt(this.currentPage);
        var that = this;
        this.data.page = page;
        this.data.page_size = this.pageSize;
        $.ajax({
            url: '/' + this.main_url + '/' + this.url,
            data: this.data,
            dataType: 'JSON',
            type: 'GET',
            async: true,
            success: function (data) {
                $("#" + that.htmlNode).html('');
                that.currentPage++;
                if (data[that.dataList].length >= 0) {
                    that.isPaused = false;
                    for (var i in data[that.dataList]) {
                        $("#" + that.htmlNode).append(that.initTpl(data[that.dataList][i]));
                    }
                    $('.remove-btn').remove();
                    try {
                        if (typeof that.bindAction == 'function' || typeof eval(that.bindAction) == 'function') {
                            if (typeof callback == 'function') {
                                call_bind_func = that.bindAction;
                            } else {
                                call_bind_func = eval(that.bindAction);
                            }
                            call_bind_func()
                        }
                        if (typeof that.doFunction == 'function' || typeof eval(that.doFunction) == 'function') {
                            if (typeof callback == 'function') {
                                call_bind_func = that.doFunction;
                            } else {
                                call_bind_func = eval(that.doFunction);
                            }
                            call_bind_func(data)
                        }
                    } catch (e) {

                    }
                }
                sessionStorage[that.url] = JSON.stringify({page: that.currentPage, 'data': that.data});
                that.page(data.count);
                $("#loading-image").remove();
            }
        });

    },
    init: function (params) {
        $("#search_form input").keyup(function (e) {
            if (e.keyCode == 13) {
                $("#search").trigger('click');
            }
        });
        if ($("#clear_search").length == 0) {
            $("#search_form").append('<button id="clear_search" class="btn btn-info btn-sm">清空搜索</button>');
        }
        $("#clear_search").click(function () {
            $("#search_form input").val('');
            $("#search_form").find('select').each(function () {
                $(this).find('option:first').prop("selected", 'selected');
            });
            $("#search").trigger('click');
        });
        var that = this;
        // var href = window.location.href;
        // var host = href.split('#')[0];
        // this.main_url = host.split('/').pop();
        if (typeof params != 'undefined') {
            for (var i in params) {
                that[i] = params[i];
            }
            if (typeof params.pageSize == 'undefined') {
                that.pageSize = 10;
            }
        }

        if (that.url === false) {
            alert('缺少请求地址');
            return false;
        }

        if (that.htmlNode == '') {
            alert('缺少请求页面加载节点');
            return false;
        }
        //判断是否
        if (typeof params.currentPage == 'undefined') {
            this.data = {};
            that.currentPage = 0;
            if (typeof sessionStorage[that.url] != 'undefined') {
                obj = JSON.parse(sessionStorage[that.url]);
                that.currentPage = parseInt(obj.page) - 1;
                that.data = obj.data;
                for (var i in that.data) {
                    $(":input[name='" + i + "']").val(that.data[i]);
                }
            }
        } else {
            that.currentPage = parseInt(that.currentPage);
        }

        // if (this.templates == '')
        this.templates = $("#" + that.htmlNode + '-tpl').html();
        return this;
    },

    page: function (total_page) {
        if (total_page <= 0) {
            $("#" + this.htmlNode + '-page').html("<div class='text-center text-muted'>没有更多数据了</div>");
            return false;
        }
        num = Math.ceil(total_page / this.pageSize);
        start = this.currentPage > 5 ? this.currentPage - 4 : 1;
        showNum = num - start > 9 ? start + 9 : num;
        pageHTml = '<div class="dataTables_paginate paging_simple_numbers">' +
            '<ul class="pagination">' +
            '<li class="paginate_button disabled" aria-controls="dynamic-table" tabindex="0"><a href="javascript:;">共' + total_page + '条</a></li>' +
            '<li class="paginate_button disabled" aria-controls="dynamic-table" tabindex="0"><a href="javascript:;">' + this.currentPage + '/' + num + '</a></li>' +
            '<li class="paginate_button disabled" aria-controls="dynamic-table" tabindex="0"><a style="padding: 1px;"><input class="page-num" type="text" ' + (num <= 1 ? 'disabled' : '') + ' value="' + this.currentPage + '" style="height: 28px;width: 40px;"></a></li>' +
            '<li class="paginate_button previous ' + (this.currentPage == 1 ? 'disabled' : '') + '" aria-controls="dynamic-table" tabindex="0" id="dynamic-table_previous"><a href="javascript:;">上一页</a></li>' +
            '<li class="paginate_button start ' + (this.currentPage == 1 ? 'disabled' : '') + '" aria-controls="dynamic-table" tabindex="0" id="dynamic-table_previous"><a href="javascript:;">首页</a></li>';
        for (var i = start; i <= showNum; i++) {
            if (i == this.currentPage) {
                pageHTml += '<li class="paginate_button page-num active" aria-controls="dynamic-table" tabindex="0"><a href="javascript:;">' + i + '</a></li>';
            } else {
                pageHTml += '<li class="paginate_button page-num" aria-controls="dynamic-table" tabindex="0"><a href="javascript:;">' + i + '</a></li>';
            }
        }
        pageHTml += '<li class="paginate_button end ' + (this.currentPage == num ? 'disabled' : '') + '" aria-controls="dynamic-table" tabindex="0" id="dynamic-table_previous"><a href="javascript:;">尾页</a></li>' +
            '<li class="paginate_button next ' + (this.currentPage >= num ? 'disabled' : '') + '" aria-controls="dynamic-table" tabindex="0" id="dynamic-table_next"><a href="javascript:;">下一页</a></li>' +
            '</ul>' +
            '</div>';
        $("#" + this.htmlNode + '-page').html(pageHTml).attr({'url': this.url, 'pageSize': this.pageSize});
        var that = this;
        $("#" + this.htmlNode + '-page li').unbind('click').click(function () {
            url = $(this).parents('.paging_simple_numbers').parent('div').attr('url');
            pageSize = $(this).parents('.paging_simple_numbers').parent('div').attr('pageSize');
            node = $(this).parents('.paging_simple_numbers').parent('div').attr('id').split('-')[0];

            if (typeof sessionStorage[url] != 'undefined') {
                obj = JSON.parse(sessionStorage[url]);
                that.currentPage = parseInt(obj.page);
            }

            that.init({
                url: url,
                htmlNode: node,
                pageSize: pageSize,
                currentPage: that.currentPage
            });
            if ($(this).hasClass('disabled')) {
                return false;
            }

            if ($(this).hasClass('next')) {
                that.getData();
                return false;
            }
            if ($(this).hasClass('end')) {
                that.currentPage = num - 1;
                that.getData();
                return false;
            }
            if ($(this).hasClass('start')) {
                that.currentPage = 0;
                that.getData();
                return false;
            }
            if ($(this).hasClass('previous')) {
                that.currentPage -= 2;
                that.getData();
                return false;
            }

            if ($(this).hasClass('page-num') && !$(this).hasClass('active')) {
                that.currentPage = parseInt($(this).find('a').text()) - 1;
                that.getData();
                return false;
            }

        });
        $("#" + this.htmlNode + '-page li .page-num').keyup(function (e) {
            if (e.keyCode == 13) {
                if (parseInt($(this).val()) > 0) {
                    if (parseInt($(this).val()) > num) {
                        $(this).val(parseInt(num))
                    } else {
                        $(this).val(parseInt($(this).val()));
                    }
                } else {
                    $(this).val(1);
                }
                that.currentPage = parseInt($(this).val()) - 1;
                that.getData();
                return false;
            }
        })
    },

    initTpl: function (data) {
        var tpl = this.templates.replace('data-img', 'src');
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

    loading: function (img) {
        var w_h = $(window).height();
        pad = (w_h - 100) / 2;
        var div = '<div id="loading-image" style="text-align: center; width: 100%;height: 100%;max-width: 640px;position: fixed;z-index: 9999;top:0;padding-top: ' + pad + 'px">' +
            '<img src="' + this.load_image + '"></div>';
        $('body').append(div);
    },
    showMsg: function (msg) {
        var w_h = $(window).height();
        pad = (w_h - 100) / 2;
        var div = '<div id="loading-msg" style="text-align: center; width: 100%;height: 40px;max-width: 640px;color: #cacaca;padding-top: 10px;line-height: 20px;">' + msg + '</div>';
        $("#" + this.htmlNode).append(div);
    },

    finishMsg: function (msg) {
        var w_h = $(window).height();
        pad = (w_h - 100) / 2;
        var div = '<div id="loading-finish-msg" style="text-align: center; width: 100%;height: 40px;max-width: 640px;color: #cacaca;padding-top: 10px;line-height: 20px;">' + msg + '</div>';
        $("#" + this.htmlNode).append(div);
    },
    removeMsg: function () {
        $("#loading-msg").remove();
    }

};