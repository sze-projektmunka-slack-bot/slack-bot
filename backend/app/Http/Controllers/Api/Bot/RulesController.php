<?php

namespace App\Http\Controllers\Api\Bot;

use App\Http\Controllers\Controller;
use App\Models\Rule;
use Illuminate\Http\Request;

class RulesController extends Controller {
    public function list() {
        $rules = Rule::all()->map(function ($rule) {
            return [
                "workspace_id" => $rule->workspace_id,
                "listen" => [
                    "type" => $rule->trigger_type,
                    "content" => $rule->trigger_content
                ],
                "response" => [
                    "type" => $rule->response_type,
                    "content" => $rule->response_content
                ]
            ];
        });

        return response()->json($rules);
    }
}
