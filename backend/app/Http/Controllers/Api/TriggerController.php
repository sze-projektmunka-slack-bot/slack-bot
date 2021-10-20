<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TriggerController extends Controller {
    public function list() {
        $triggers = [];

        foreach (app("registered_triggers") as $trigger) {
            $triggers[] = [
                "name" => $trigger::GetName(),
                "inputs" => $trigger::GetInputs()
            ];
        }

        return response()->json($triggers);
    }

    public function get(Request $request) {
        //
    }
}
