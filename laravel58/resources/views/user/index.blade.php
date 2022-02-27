<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>仌</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="personal project --albertMao"/>
    <meta name="keywords" content="albertMao"/>
    <meta name="author" content="albertMao"/>

    <!-- Animate -->
    <link rel="stylesheet" href="/css/animate.css">
    <!-- Icomoon -->
    <link rel="stylesheet" href="/css/icomoon.css">
    <!-- Bootstrap  -->
    <link rel="stylesheet" href="/css/bootstrap.css">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>

<header id="fh5co-header">
    <div class="container-fluid">
        <a href="/"><i class="icon-back"></i></a>
        <div class="row text-center">
            <b id="fh5co-logo"><i class="icon-user"></i></b>
        </div>
    </div>

</header>
<!-- END #fh5co-header -->
<div class="container-fluid">
    <div class="row fh5co-post-entry single-entry">
        <article id="user_form"
                 class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-6 col-sm-offset-4 col-xs-12 col-xs-offset-0">
            <figure class="animate-box col-md-8 col-md-offset-2">
                <b class="fh5co-meta">{{$user_data['username']}}</b>
            </figure>

            <figure class="animate-box col-md-4 col-md-offset-4">
                <span class="fh5co-meta">性别</span>
                <select type="text" name="sex" id="sex" class="form-control">
                    <option value="O">保密</option>
                    <option value="M">男</option>
                    <option value="F">女</option>
                </select>
            </figure>

            <figure class="col-md-4 col-md-offset-4">
                <a href="#" id="but_save"><span><i class="icon-save"></i>保存</span></a>
            </figure>
        </article>
    </div>
</div>

<!-- jQuery -->
<script src="/js/jquery.min.js"></script>
<!-- jQuery Easing -->
<script src="/js/jquery.easing.1.3.js"></script>
<!-- Bootstrap -->
<script src="/js/bootstrap.min.js"></script>
<!-- Waypoints -->
<script src="/js/jquery.waypoints.min.js"></script>
<!-- Main JS -->
<script src="/js/main.js"></script>
<!-- Modernizr JS -->
<script src="/js/modernizr-2.6.2.min.js"></script>
<!-- FOR IE9 below -->
<!--[if lt IE 9]>-->
<script src="/js/respond.min.js"></script>


<script src="/js/common.js"></script>
</body>

<script type="text/javascript">
    $(function () {
        $("#but_save").unbind('click').click(function () {
            var params = _.sendForm('user_form');
            if (!params) {
                return false;
            }
            _.postData('/index.php/userInfoSave', params, function (result) {
                if (result.status == 200) {
                    _.alert(result.msg);
                } else {
                    _.confirm(result.msg);
                }
            });
        });
    });
</script>
</html>

