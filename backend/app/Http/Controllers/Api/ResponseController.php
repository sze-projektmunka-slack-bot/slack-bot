<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ResponseController extends Controller {
    public function get(string $response_identifier) {

        $response_class = null;

        foreach(app("registered_responses") as $response) {
            if($response::GerIdentifier() == $response_identifier) {
                $response_class = $response;
            }
        }



    }
}
