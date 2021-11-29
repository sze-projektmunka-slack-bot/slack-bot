<?php

namespace App\Http\Requests\Rule;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRuleRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            "workspace_id" => "required|integer|exists:workspaces,id",

            "trigger.identifier"  => "required|string",
            "response.identifier" => "required|string",
        ];
    }
}
