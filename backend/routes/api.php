<?php

use Illuminate\Support\Facades\Route;

Route::group([
    "prefix" => "auth",
    "as"     => "auth."
], function () {
    Route::post("register", [\App\Http\Controllers\Api\AuthController::class, "register"])
         ->name("register");

    Route::post("login", [\App\Http\Controllers\Api\AuthController::class, "login"])
         ->name("login");

    Route::post("logout", [\App\Http\Controllers\Api\AuthController::class, "logout"])
         ->middleware("auth:sanctum")
         ->name("logout");
});

Route::group([
    "prefix" => "triggers",
    "as"     => "triggers.",
    //"middleware" => "auth:sanctum" TODO
], function () {
    Route::get("/", [\App\Http\Controllers\Api\TriggerController::class, "list"])
        ->name("list");
});

Route::group([
    "prefix" => "workspaces",
    "as"     => "workspaces.",
    "middleware" => "auth:sanctum"
], function () {
    Route::post("/", [\App\Http\Controllers\Api\WorkspaceController::class, "create"])
        ->name("create");
});
