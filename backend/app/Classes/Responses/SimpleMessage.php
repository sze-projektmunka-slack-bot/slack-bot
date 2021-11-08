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

    public static function GetPayload(array $inputValues): string {
        return "{\"text\":`{$inputValues['response_message']}`}";
    }
}
