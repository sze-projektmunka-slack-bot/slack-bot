<?php

namespace App\Classes\Triggers;

use App\Classes\BaseTrigger;
use App\Classes\Responses\SimpleMessage;
use App\Classes\TriggerInterface;

class Mention extends BaseTrigger implements TriggerInterface{
    public static function GetIdentifier(): string {
        return "trigger_app_mention";
    }

    public static function GetName() :string {
        return "Bot Említése";
    }

    public static function GetInputs() :array {
        return [];
    }

    public static function GetType() :string {
        return "event";
    }

    public static function GetResponses(): array {
        return [
           SimpleMessage::class
        ];
    }

    public static function GetValidationRules(): array {
        return [];
    }

    public static function GetTrigger(array $inputValues) :string {
        return "app_mention";
    }
}
