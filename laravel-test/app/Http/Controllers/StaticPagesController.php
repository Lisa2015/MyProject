<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StaticPagesController extends Controller
{

     //要在控制器中指定渲染某个视图，则需要使用到 view 方法，view 方法接收两个参数，
     //第一个参数是视图的路径名称，第二个参数是与视图绑定的数据，第二个参数为可选参数
    public function home()
    {
        return view('static_pages/home');  //渲染在 resources/views 文件夹下的 static_pages/home.blade.php 文件
    }

    public function help()
    {
        return view('static_pages/help');
    }

    public function about()
    {
        return view('static_pages/about');
    }
}
