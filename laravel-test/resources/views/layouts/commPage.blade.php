<!DOCTYPE html>
<html>
  <head>
    <title>@yield('title', 'Weibo App')</title>
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/css/index.css">  <!-- 自定义css -->
  </head>
  <body>
    @include('layouts._header')

    <div class="container">
      <div class="offset-md-1 col-md-10">
        @include('shared._message')
        @yield('content')
        @include('layouts._footer')
      </div>
    </div>
  </body>
</html>
