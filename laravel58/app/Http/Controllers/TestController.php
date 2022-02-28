<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpParser\Node\Expr\ClosureUse;

class TestController extends Controller
{
    public function test()
    {
        $str = 'aaaa';
        $helloClosure = function () use($str) {
            echo 'hello! ' . $str;
        };
        $helloClosure();

        var_dump($helloClosure instanceof ClosureUse);
    }


}
