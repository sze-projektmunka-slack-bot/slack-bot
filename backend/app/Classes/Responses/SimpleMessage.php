<?php

namespace App\Classes\Responses;

use App\Classes\BaseResponse;
use App\Classes\ResponseInterface;

class SimpleMessage extends BaseResponse implements ResponseInterface {
    public static function GetIdentifier() : string {
        return "response_simple_message";
    }

    public static function GetName(): string {
        return "Egyszerű üzenet";
    }


    public static function GetType(): string {
        return "say";
    }

    public static function GetInputs(): array{
        return [
            "input" => [
                "type" => "text",
                "required" => true,
                "name" => "response_message"
            ]
        ];
    }

    public static function GetValidationRules(): array {
        return [
            "response_message" => "required|string"
        ];
    }

    public function GetPayload(): string {
        return "{text:`{$this->inputValues['message']}`}";
    }
}
