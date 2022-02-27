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

Route::get('/', function () {
    return view('index');
});
Route::get('/userEntrance', function () {
    return view('user/loginAndRegister');
});
Route::get('/bill', function () {
    return view('/bill/index');
});
Route::post('/userLogin', 'UserController@login');
# must be logged in
Route::middleware(['login'])->group(function () {

});

