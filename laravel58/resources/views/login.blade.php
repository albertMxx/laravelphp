<head>
    <title>仌</title>
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
        min-width: 300px;
    }

    .wrap {
        min-width: 300px;
        margin: 0 auto;
    }

    .head-logo img {
        width: 100%;
    }

    /*head foot*/
    .panel-title {
        color: #000;
        padding-top: 75px;
        text-align: center;
    }

    .panel-title .mt {
        line-height: 68px;
        font-size: 40px;
    }

    .panel-title .line {
        width: 54px;
        height: 2px;
        margin: 0 auto;
        background: #000;
        overflow: hidden;
    }

    .panel-title .sub {
        font-size: 24px;
        line-height: 72px;
    }

    .contact-text {
        text-align: center;
        height: 100px;
    }

    .contact-text span {
        font-size: 18px;
        font-weight: bold;
        color: #2f2f2f;
        display: block;
    }

    .contact-text input {
        padding-left: 10px;
        width: 350px;
        height: 40px;
        border: 2px solid;
        border-radius: 6px;
    }

    .contact-text select {
        padding-left: 10px;
        width: 100px;
        height: 40px;
        border: 2px solid;
        border-radius: 6px;
    }

    .contact-text div p {
        font-size: 14px;
        color: #353535;
        line-height: 30px;
    }

    .contact-text div a {
        color: #ec4a59;
        text-decoration: underline;
    }
</style>

<body>
<div class="wrap">
    <div class="panel-title">
        <h4 class="mt">仌</h4>
        <div class="line"></div>
    </div>
    <div style="padding-top: 30px;">
        <div class="contact-text">
            <div>
                <label for="username"><span>昵称</span></label>
                <input id="username" name="username" type="text"/>
            </div>
        </div>

        <div class="contact-text">
            <div>
                <label for="password"><span>密码</span></label>
                <input id="password" name="password" type="password"/>
            </div>
        </div>

        <div class="contact-text">
            <div>
                <label for="sex"><span>性别</span></label>
                <select id="sex" name="sex">
                    <option value="O">保密</option>
                    <option value="F">女</option>
                    <option value="M">男</option>
                </select>
            </div>
        </div>

        <div class="contact-text">
            <div>
                <span style="margin: 15px 0;">
                    <b id="login"
                       style="cursor: pointer; border: dotted; padding: 5px; background-color: #dddddd">登录</b>
                    <b id="register"
                       style="cursor: pointer; border: dashed; padding: 5px; background-color: #cc4a59;margin-left:55px;">注册</b>
                </span>
                <span>有账号的点登录，没有就点注册先搞个账号</span>
            </div>
        </div>
    </div>
</div>

</body>

<script type="text/javascript" src="/styles/js/common/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="/styles/js/common/iciyuan.js"></script>
<script>
    var un = localStorage.getItem('jurui_un');
    var pd = localStorage.getItem('jurui_pd');
    if (un) {
        _.postData('/index.php/login/billEntry', {
            username: un,
            password: pd
        }, function (res) {
            if (res.status == 200) {
                location.href = '/index.php/bill';
            }
        });
    }

    $("#login").unbind('click').click(function () {
        _.postData('/index.php/login/billEntry', {
            username: $("#username").val(),
            password: $("#password").val()
        }, function (res) {
            if (res.status == 200) {
                localStorage.setItem('jurui_un', $("#username").val());
                localStorage.setItem('jurui_pd', $("#password").val());
                _.alert(res.msg, function () {
                    location.href = '/index.php/bill';
                })
            } else {
                _.confirm(res.msg);
            }
        });
    });

    $("#register").unbind('click').click(function () {
        _.postData('/index.php/login/billRegister', {
            username: $("#username").val(),
            password: $("#password").val()
        }, function (res) {
            if (res.status == 200) {
                _.alert(res.msg)
            } else {
                _.confirm(res.msg);
            }
        });
    });
</script>
