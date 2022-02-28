<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
*/

#测试 & php学习
Route::any('/test', 'TestController@test')->middleware('test');

#首页
Route::get('/', function () {
    return view('index');
});
#注册登录
Route::get('/userEntrance', function () {
    return view('user/loginAndRegister');
});
#请求登录
Route::post('/userLogin', 'UserController@login');
#注册用户
Route::post('/userRegister', 'UserController@register');
# must be logged in
Route::middleware(['login'])->group(function () {
    #用户主页
    Route::get('/user', 'UserController@index');
    #用户信息修改
    Route::post('/userInfoSave', 'UserController@userInfoSave');
    #账单主页
    Route::get('/bill', function () {
        return view('/bill/index');
    });
});

