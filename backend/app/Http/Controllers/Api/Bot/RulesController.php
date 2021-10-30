<?php

namespace App\Http\Controllers\Api\Bot;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RulesController extends Controller {
    public function list() {
        //TODO ezt majd dbből szedni
        $data = [
            [
                "workspace_id" => 2,
                "listen"   => [
                    "type"    => "message",
                    "content" => "hello"
                ],
                "response" => [
                    "type"    => "string",
                    "content" => "Hello there"
                ]
            ],
            [
                "workspace_id" => 1,
                "listen"   => [
                    "type"    => "message",
                    "content" => "hey"
                ],
                "response" => [
                    "type"    => "string",
                    "content" => "Hey"
                ]
            ],
        ];

        return response()->json($data);
    }
}
