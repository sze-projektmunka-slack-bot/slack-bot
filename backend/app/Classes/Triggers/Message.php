<?php

namespace App\Classes\Triggers;

use App\Classes\BaseTrigger;
use App\Classes\Responses\SimpleMessage;
use App\Classes\TriggerInterface;

class Message extends BaseTrigger implements TriggerInterface{

    public static function GetIdentifier(): string {
        return "trigger_message";
    }


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

    public static function GetResponses(): array {
        return [
            SimpleMessage::class
        ];
    }

    public static function GetValidationRules(): array {
        return [
            "trigger_message" => "required|string"
        ];
    }


    public function GetTrigger() :string {
        return $this->inputValues["trigger_message"];
    }
}
