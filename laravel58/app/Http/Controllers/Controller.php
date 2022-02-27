<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function validate_deal($rules, $data)
    {
        $validate = Validator::make($data, $rules);
        if ($validate->fails()) {
            $msg = '';
            $fails = json_decode($validate->messages(), true);
            foreach ($fails as $f_row) {
                $msg .= $f_row[0];
            }
            return ['status' => 500, 'msg' => $msg];
        } else {
            return ['status' => 200, 'msg' => 'validated'];
        }
    }

}
