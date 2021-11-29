<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::any("/", function () {
    return "server running";
});

Route::any("/migrate", function () {
    Artisan::call('migrate', [
        '--force' => true,
    ]);
});
