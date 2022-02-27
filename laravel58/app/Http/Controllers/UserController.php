<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'sex' => 'required',
            'sex' => 'required',
        ]);
        $users = DB::select('select * from user');
        echo '<pre>';
        print_r($users);
    }
}
