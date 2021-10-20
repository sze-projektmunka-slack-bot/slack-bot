<?php

namespace App\Classes\Triggers;

use App\Classes\TriggerInterface;

class Message implements TriggerInterface{
    public static function GetName() :string {
        return "Üzenet";
    }

    public static function GetInputs() :array {
        return [
            "input" => [
                "type" => "text",
                "required" => true,
                "name" => "trigger_message"
            ]
        ];
    }

    public static function GetType() :string {
        return "message";
    }

    private array $inputValues;

    public function __construct(array $inputValues) {
        $this->inputValues = $inputValues;
    }

    public function GetTrigger() :string {
        return $this->inputValues["trigger_message"];
    }
}
