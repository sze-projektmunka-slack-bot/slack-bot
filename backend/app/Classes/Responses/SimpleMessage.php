<?php

namespace App\Classes\Responses;

use App\Classes\ResponseInterface;

class SimpleMessage implements ResponseInterface {
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
                "name" => "message"
            ]
        ];
    }


    private array $inputValues;

    public function __construct(array $inputValues) {
        $this->inputValues = $inputValues;
    }

    public function GetPayload(): string {
        return "{text:`{$this->inputValues['message']}`}";
    }
}
