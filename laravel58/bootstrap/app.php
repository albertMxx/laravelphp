<?php

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
  serves 服务  glue 胶水  component 组成部分  ioc：inversion of control 控制反转 various 各种各样的  part 部分
  illuminate 照亮 解释 阐明 foundation 基础 地基
  $app actually is vendor//foundation/application   application extends container
*/

$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
  interface 界面 接口 resolve 解决 分辨 转化  cli：command line interface 命令行界面 singleton 单独的人或物 express 表达表现
  $app->singleton()
  illuminate/foundation/application extend vendor/laravel/framework/src/illuminate/container/container
  actually it is extend from container->singleton()
  singleton($abstract, $concrete = null) 两个参数 实际调用是function bind
  bind($abstract, $concrete, true); 三个参数 1.vendor//kernel::class kernel的类名 2.app//kernel 3.true
|
*/

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

return $app;
