@extends('layouts.commPage')
@section('title', $user->name)

@section('content')
  {{ $user->name }} - {{ $user->email }}
@stop
