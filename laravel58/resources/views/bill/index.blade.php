<!-- 列表 -->
<!--<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">-->

<head>
    <title>仌</title>
    <link href="/favicon.ico" rel="shortcut ico">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="/resources/css/common.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/iciyuan/common.css">
</head>
<style>
    /*head foot*/
    body {
        font-family: 'MICROSOFT YAHEI';
        min-width: 100px;
    }

    .wrap {
        text-align: center;
        min-width: 300px;
        margin: 0 auto;
    }

    /*head foot*/
    .panel-title {
        color: #000;
        padding-top: 7%;
    }

    .contact-text {
        text-align: left;
        position: relative;
        left: 8%;
        top: 15px;
    }

    .contact-text span {
        font-weight: bolder;
        font-size: 14px;
    }

    .li_time {
        font-size: 10px;
        width: 42%;
        display: inline-block;
        text-align: center;
    }

    .li_single {
        width: 15%;
        font-size: 9px;
        display: inline-block;
        font-weight: bold;
        color: #2f2f2f;
    }

    .income {
        color: #dd5500;
    }

    .expend {
        color: #228888;
    }

    .params {
        border: 2px solid;
        border-radius: 6px;
        height: 35px;
        padding-left: 6px;
    }

    .challenge_list {
        width: 85%;
    }

    .challenge_list li a {
        font-size: 14px;
        font-weight: bolder;
        color: #882222;
    }

    .type_box {
        cursor: pointer;
        border: solid 1px;
        border-radius: 6px;
        padding: 0 5px;
        margin-right: 1px;
        background-color: #dddddd;
    }

    .type_box_check {
        cursor: pointer;
        border: solid 1px;
        border-radius: 6px;
        padding: 0 5px;
        margin-right: 1px;
        color: #dddddd;
        background-color: #222222;
    }

</style>

<body>
<div class="wrap">
    <div class="panel-title">
        <b></b>
    </div>
    <div class="contact-text">
        <div>
            <label for="year"><span>日期</span></label>
            <select style="width: 20%;" id="year" name="year" class="params">
                <option>2021</option>
                <option selected>2022</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
            </select>
            <label for="month"></label>
            <select style="width: 13%;" id="month" name="month" class="params">

            </select>
            <label for="day"></label>
            <input style="width: 13%;" value="" class="params" id="day"
                   name="day" type="number" min="1"
                   max="31"/>
        </div>

        <div style="margin-top: 12px;">
            <input type="hidden" id="type" name="type"/>
            <span class="type_box_check type_boxs" data-type="1">日常</span>
            <span class="type_box type_boxs" data-type="2">吃</span>
            <span class="type_box type_boxs" data-type="5">住</span>
            <span class="type_box type_boxs" data-type="6">行</span>
            <span class="type_box type_boxs" data-type="3">购物</span>
            <span class="type_box type_boxs" data-type="4">投资</span>
            <span class="type_box type_boxs" data-type="7">红包</span>
            <span class="type_box type_boxs income" data-type="101">收入</span>
        </div>
        <div style="margin-top: 12px;">
            <label for="remark"><span>备注</span></label>
            <input style="width: 74%;" class="params" id="remark" name="remark" type="text"/>
        </div>

        <div style="margin-top: 12px;">
            <label for="money"><span>金额</span></label>
            <input style="width: 57%;" class="params" id="money" name="money" type="text"/>
            <span id="add_record"
                  style="cursor: pointer; border: dotted; padding: 5px; background-color: #dddddd">记一笔</span>
        </div>

        <div style="margin-top: 12px;" id="statistics_list">
            <ul class="li_single" style="width: 9%;">
                <li>日常</li>
                <li>吃</li>
                <li>住</li>
                <li>行</li>
                <li>购物</li>
                <li>投资</li>
                <li>红包</li>
                <li>总和</li>
                <li class="income">收入</li>
            </ul>
        </div>

        <div style="margin-top: 12px;">
            <div class="li_time">本月收支：<span id="balance_month"></span></div>
            <div class="li_time">今年收支：<span id="balance_year"></span></div>
        </div>
        <div>
            <div class="li_time">本月消费/上月：<span id="percent"></span></div>
            <div class="li_time">全记录消费：<span class="income"></span></div>
        </div>
    </div>
    <div class="panel-title">
        <div style="margin: 5px;">
            <a style="font-size: 18px;color: #6d6d6d;border: 2px dashed; padding: 5px;"
               href="/index.php/bill/record"
               target="_blank">账单明细</a>
        </div>
    </div>

</div>

</body>

<script type="text/javascript" src="/resources/js/common/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="/resources/js/common/iciyuan.js"></script>
<script>
    var initData = function () {
        $(".append_ul").remove();
        _.getData('/index.php/bill/statistics', {}, function (data) {
            $("#balance_month").text(' ' + data.extend['balance_month']).addClass(data.extend['balance_month_c']);
            $("#balance_year").text(' ' + data.extend['balance_year']).addClass(data.extend['balance_year_c']);
            $("#percent").text(' ' + data.extend['percent'] + '%').addClass(data.extend['percent_c']);
            for (i in data.data) {
                $("#statistics_list").append(
                    '<ul class="append_ul li_single">' +
                    '<li>' + data.data[i].title + '</li>\n' +
                    '<li>' + data.data[i][1] + '</li>\n' +
                    '<li>' + data.data[i][2] + '</li>\n' +
                    '<li>' + data.data[i][5] + '</li>\n' +
                    '<li>' + data.data[i][6] + '</li>\n' +
                    '<li>' + data.data[i][3] + '</li>\n' +
                    '<li>' + data.data[i][4] + '</li>\n' +
                    '<li>' + data.data[i][7] + '</li>\n' +
                    '<li class="expend">' + data.data[i].total + '</li>\n' +
                    '<li class="income">' + data.data[i][101] + '</li>\n' +
                    '</ul>'
                );
            }
        });
    }

    initData();

    $("#add_record").unbind('click').click(function () {
        _.postData('/index.php/bill/addRecord', {
            year: $("#year").val(),
            month: $("#month").val(),
            day: $("#day").val(),
            type: $("#type").val(),
            money: $("#money").val(),
            remark: $("#remark").val()
        }, function (res) {
            if (res.status == 200) {
                _.alert(res.msg, function () {
                    initData();
                })
            } else {
                _.confirm(res.msg);
            }
        });
    });

    $(".type_boxs").unbind('click').click(function () {
        $(this).removeClass('type_box').addClass('type_box_check');
        $(this).siblings().removeClass('type_box_check').addClass('type_box');
        $("#type").val($(this).data('type'));
    });
</script>
