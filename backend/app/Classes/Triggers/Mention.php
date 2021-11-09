<?php

namespace App\Classes\Triggers;

use App\Classes\BaseTrigger;
use App\Classes\Responses\SimpleMessage;
use App\Classes\TriggerInterface;

class Mention extends BaseTrigger implements TriggerInterface {

    public static function GetIdentifier(): string {
        return "trigger_app_mention";
    }

    protected string $name = "Bot Említése";

    protected array $inputs = [];

    protected string $type = "event";

    protected array $responses = [
        SimpleMessage::class
    ];

    protected array $validationRules = [];

    public function GetTrigger(): string {
        return "app_mention";
    }
}