<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller {

    public function register(RegisterRequest $request) {
        $user = User::create([
            "username" => $request->username,
            "email"    => $request->email,
            "password" => \Hash::make($request->password)
        ]);

        $token = $user->createToken("login_token")->plainTextToken;

        return response()->json(["token" => $token], 201);
    }

    public function login(LoginRequest $request) {
        $user = User::firstWhere("username", $request->username);

        if (empty($user)) {
            return response()->json(["message" => "User not found", "errors" => ["username" => "Invalid username"]], 404);
        }

        if (!auth()->attempt(["username" => $request->username, "password" => $request->password])) {
            return response()->json(["message" => "Wrong password", "errors" => ["password" => "Invalid password"]], 404);
        }

        $token = $user->createToken("login_token")->plainTextToken;

        return response()->json(["token" => $token], 200);
    }

    public function logout() {
        auth()->user()->tokens()->delete();

        return response()->noContent();
    }
}
