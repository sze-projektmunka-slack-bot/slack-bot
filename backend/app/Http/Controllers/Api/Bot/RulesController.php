<?php

namespace App\Http\Controllers\Api\Bot;

use App\Http\Controllers\Controller;
use App\Models\Rule;
use App\Services\ResponseService;
use App\Services\TriggerService;
use Illuminate\Http\Request;

class RulesController extends Controller {
    public function list() {
        $rules = Rule::all()->map(function ($rule) {
            $trigger = TriggerService::GetTrigger($rule->trigger_identifier);
            $response = ResponseService::GetResponse($rule->response_identifier);

            $trigger->SetInputValues(json_decode($rule->trigger_inputs, true));
            $response->SetInputValues(json_decode($rule->response_inputs, true));

            return [
                "workspace_id" => $rule->workspace_id,
                "listen" => [
                    "type" => $trigger->GetType(),
                    "content" => $trigger->GetTrigger()
                ],
                "response" => [
                    "type" =>  $response->GetType(),
                    "content" => $response->GetPayload()
                ]
            ];
        });

        return response()->json($rules);
    }
}
