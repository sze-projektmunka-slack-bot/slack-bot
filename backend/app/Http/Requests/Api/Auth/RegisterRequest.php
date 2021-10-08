<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest {

    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            "username" => "required|string|max:255|unique:users,username",
            "email" => "required|email|unique:users,email",
            "password" => "required|string|confirmed|regex:/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/" //kisbetu nagybetu szam min 8 karakter
        ];
    }
}
