<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ResponseService;
use Illuminate\Http\Request;

class ResponseController extends Controller {
    public function get(string $response_identifier) {

        $data = [];

        foreach(ResponseService::GetRegisteredResponses() as $response) {
            $response = new $response();
            if($response->GetIdentifier() == $response_identifier) {
                $data = [
                    "identifier" => $response->GetIdentifier(),
                    "name" => $response->GetName(),
                    "inputs" => $response->GetInputs(),
                ];
            }
        }

        return response()->json($data);
    }
}
