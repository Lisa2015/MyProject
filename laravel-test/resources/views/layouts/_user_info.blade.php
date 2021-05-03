
<a href="{{ route('users.show', $user->id) }}">
  <img src={{asset('/img/002.jpg')}} alt="{{ $user->name }}" class="gravatar"/>
</a>
<h1 class="userName" style="font-weight: bold">{{ $user->name }}</h1>

