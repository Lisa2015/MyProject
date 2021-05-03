@extends('layouts.commPage')
@section('title', $user->name)

@section('content')
{{--  {{ $user->name }} - {{ $user->email }}--}}
  <p>注册时间：{{$user->created_at}}</p>
{{--  <p>{{$user->getAvatar($user->name)}}</p>--}}
  <div class="row">
    <div class="offset-md-2 col-md-8">
      <div class="col-md-12">
        <div class="offset-md-2 col-md-8">
          <section class="user_info">
            @include('layouts._user_info', ['user' => $user])
          </section>
        </div>
      </div>
    </div>
  </div>
@stop
<script type="text/javascript">


</script>
