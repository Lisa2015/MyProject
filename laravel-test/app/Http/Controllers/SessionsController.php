<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionsController extends Controller
{
    //

    public function create() {
        return view('sessions.create');
    }
     //认证用户身份。对用户提交的数据进行验证。
    public function store(Request  $request) {
        $credentials = $this->validate($request,[
            'email'=> 'required|email|max:255',
            'password' => 'required'
            ]);
        if (Auth::attempt($credentials,$request->has('remember'))) {
            session()->flash('success', '欢迎回来！');
            return redirect()->route('users.show', [Auth::user()]);
        } else {
            session()->flash('danger', '很抱歉，您登陆的用户不存在');
            return redirect()->back()->withInput();
        }
    }

    //用户退出登录
    function  destroy() {
        Auth::logout();
        session()->flash('success','您已经成功退出！');
        return redirect('login');
    }


}
