<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Rule\StoreRuleRequest;
use App\Models\Rule;
use App\Services\ResponseService;
use App\Services\TriggerService;

class RuleController extends Controller {

    public function store(StoreRuleRequest $request) {
        $trigger = TriggerService::GetTrigger($request->trigger["identifier"]);
        $response = ResponseService::GetResponse($request->response["identifier"]);

        if(empty($trigger)) {
            return response()->json(["message" => "Hibás eseményindító!", "errors" => ["trigger_identifier" => "Ez az eseményindító nem létezik!"]], 404);
        }

        if(empty($response)) {
            return response()->json(["message" => "Hibás válasz!", "errors" => ["trigger_identifier" => "Ez a válasz nem létezik!"]], 404);
        }

        $inputValues = $request->validate([
            "trigger" => $trigger->GetValidationRules(),
            "response" => $response->GetValidationRules()
        ]);

        Rule::updateOrCreate([
            "workspace_id" => $request->workspace_id,
            "trigger_identifier" => $trigger::GetIdentifier(),
            "trigger_inputs" => json_encode($inputValues["trigger"])
        ], [
            "response_identifier" => $response::GetIdentifier(),
            "response_inputs" => json_encode($inputValues["response"])
        ]);

        return response()->noContent(201);
    }
}
