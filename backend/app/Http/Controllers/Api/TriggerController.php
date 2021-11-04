<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TriggerService;
use Illuminate\Http\Request;

class TriggerController extends Controller {
    public function list() {
        $triggers = [];

        foreach (TriggerService::GetRegisteredTriggers() as $trigger) {
            $responses = [];

            foreach($trigger::GetResponses() as $response) {
                $responses[] = $response::GetIdentifier();
            }

            $triggers[] = [
                "identifier" => $trigger::GetIdentifier(),
                "name" => $trigger::GetName(),
                "inputs" => $trigger::GetInputs(),
                "responses" => $responses,
            ];
        }

        return response()->json($triggers);
    }

    public function get(Request $request) {
        //
    }
}
