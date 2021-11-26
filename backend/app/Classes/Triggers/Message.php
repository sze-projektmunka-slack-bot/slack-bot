<?php

namespace App\Classes\Triggers;

use App\Classes\BaseTrigger;
use App\Classes\Responses\Image;
use App\Classes\Responses\Markdown;
use App\Classes\Responses\SimpleMessage;
use App\Classes\TriggerInterface;

class Message extends BaseTrigger implements TriggerInterface {

    public static function GetIdentifier(): string {
        return "trigger_message";
    }

    protected string $name = "Üzenet";

    protected array $inputs = [
        [
            "type"     => "text",
            "required" => true,
            "name"     => "trigger_message",
            "label"    => "Szöveg"
        ]
    ];

    protected string $type = "message";

    protected array $responses = [
        SimpleMessage::class,
        Markdown::class,
        Image::class
    ];

    protected array $validationRules = [
        "trigger_message" => ["required", "string"]
    ];

    public function GetTrigger(): string {
        return $this->inputValues["trigger_message"];
    }
}
