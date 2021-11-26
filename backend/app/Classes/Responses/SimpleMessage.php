<?php

namespace App\Classes\Responses;

use App\Classes\BaseResponse;
use App\Classes\ResponseInterface;

class SimpleMessage extends BaseResponse implements ResponseInterface {

    public static function GetIdentifier(): string {
        return "response_simple_message";
    }

    protected string $name = "Egyszerű üzenet";

    protected array $inputs = [
        [
            "type"     => "text",
            "required" => true,
            "name"     => "response_message"
        ]
    ];

    protected string $type = "say";

    protected array $validationRules = [
        "response_message" => ["required", "string"]
    ];

    public function GetPayload(): string {
        return "{\"text\":`{$this->inputValues['response_message']}`}";
    }

    public function GetNotificationText() :string {
        return $this->inputValues['response_message'];
    }
}
