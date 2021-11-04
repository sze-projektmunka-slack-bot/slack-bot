<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Rule\StoreRuleRequest;
use App\Services\ResponseService;
use App\Services\TriggerService;

class RuleController extends Controller
{
    public function store(StoreRuleRequest $request) {
        $trigger = TriggerService::GetTrigger($request->trigger_identifier);
        $response = ResponseService::GetResponse($request->response_identifier);

        if(empty($trigger)) {
            return response()->json(["message" => "Hibás eseményindító!", "errors" => ["trigger_identifier" => "Ez az eseményindító nem létezik!"]], 404);
        }

        if(empty($response)) {
            return response()->json(["message" => "Hibás válasz!", "errors" => ["trigger_identifier" => "Ez a válasz nem létezik!"]], 404);
        }

        $request->validate(array_merge($trigger::GetValidationRules(), $response::GetValidationRules()));
    }
}
