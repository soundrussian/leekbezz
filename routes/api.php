<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')->group(function () {
    Route::post('/login', 'SessionController@create');
    Route::delete('/logout', 'SessionController@destroy');

    Route::post('/users', 'UserController@store');

    Route::post('/forgot', 'PasswordResetController@store');
    Route::put('/forgot', 'PasswordResetController@update');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::name('password.reset')->get('/reset-password/{token}', function() {
    return view('welcome');
});
