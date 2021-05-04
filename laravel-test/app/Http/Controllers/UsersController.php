<?php


namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class UsersController extends Controller
{
    public function create()
    {
        return view('user.create');
    }

    public function show(User $user)
    {
        return view('user.show', compact('user'));
    }

   public function  store(Request  $request) {
       $this->validate($request, [
           'name' => 'required|max:50',
           'email' => 'required|email|unique:users|max:255',
           'password' => 'required|confirmed|min:6'
       ]);

       $user = User::create([
           'name' => $request->name,
           'email'=> $request->email,
           'password'=>bcrypt($request->password),
       ]);
       //注册成功后自动登录
       Auth::login($user);

       //可以使用 session() 方法来访问会话实例。
       //想存入一条缓存的数据，让它只在下一次的请求内有效时，可以使用flash()
          session()->flash('success','欢迎，将在这里开启微博');
       return redirect()->route('users.show',[$user]);
   }
}
