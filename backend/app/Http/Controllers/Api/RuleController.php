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

        if(empty($trigger) || empty($response)) {
            //error
        }

        $request->validate(array_merge($trigger::GetValidationRules(), $response::GetValidationRules()));
    }
}
