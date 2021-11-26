<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Rule\DeleteRule;
use App\Http\Requests\Rule\StoreRuleRequest;
use App\Models\Rule;
use App\Models\Workspace;
use App\Services\ResponseService;
use App\Services\TriggerService;

class RuleController extends Controller {

    public function list(Workspace $workspace) {
        if ($workspace->user_id != auth()->id()) {
            return response()->json([
                "message" => "Ehhez a szerverhez nincs hozzáférésed!",
            ], 401);
        }

        $rules = Rule::where("workspace_id", $workspace->id)->get()->map(function ($rule) {
            $trigger_data = json_decode($rule->trigger_inputs, true);
            $trigger_data["name"] = TriggerService::GetTrigger($rule->trigger_identifier)->GetName();

            $response_data = json_decode($rule->response_inputs, true);
            $response_data["name"] = ResponseService::GetResponse($rule->response_identifier)->GetName();
            return [
                "workspace_id" => $rule->workspace_id,
                "rule_id"      => $rule->id,
                "trigger"      => $trigger_data,
                "response"     => $response_data
            ];
        });

        return response()->json($rules);
    }

    public function store(StoreRuleRequest $request) {
        $trigger = TriggerService::GetTrigger($request->trigger["identifier"]);
        $response = ResponseService::GetResponse($request->response["identifier"]);

        if (empty($trigger)) {
            return response()->json(
                [
                    "message" => "Hibás eseményindító!",
                    "errors"  => ["trigger_identifier" => "Ez az eseményindító nem létezik!"]
                ],
                404
            );
        }

        if (empty($response)) {
            return response()->json(
                ["message" => "Hibás válasz!", "errors" => ["trigger_identifier" => "Ez a válasz nem létezik!"]],
                404
            );
        }

        $inputValues = $request->validate([
            "trigger"  => $trigger->GetValidationRules(),
            "response" => $response->GetValidationRules()
        ]);

        Rule::updateOrCreate([
            "workspace_id"       => $request->workspace_id,
            "trigger_identifier" => $trigger::GetIdentifier(),
            "trigger_inputs"     => json_encode($inputValues["trigger"])
        ], [
            "response_identifier" => $response::GetIdentifier(),
            "response_inputs"     => json_encode($inputValues["response"])
        ]);

        return response()->noContent(201);
    }

    public function destroy(Rule $rule) {
        if ($rule->workspace->user_id != auth()->id()) {
            return response()->json([
                "message" => "Ehhez a szabályhoz nincs hozzáférésed!",
            ], 401);
        }

        $rule->delete();

        return response()->json(null);
    }
}
