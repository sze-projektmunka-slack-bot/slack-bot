<?php

namespace App\Classes\Triggers;

use App\Classes\BaseTrigger;
use App\Classes\Responses\Button;
use App\Classes\Responses\Image;
use App\Classes\Responses\ImageText;
use App\Classes\Responses\Markdown;
use App\Classes\Responses\SimpleMessage;
use App\Classes\TriggerInterface;

class Action extends BaseTrigger implements TriggerInterface {

    public static function GetIdentifier(): string {
        return "trigger_action";
    }

    protected string $name = "Esemény";

    protected array $inputs = [
        [
            "type"     => "text",
            "required" => true,
            "name"     => "trigger_action_identifier",
            "label"    => "Esemény azonosító"
        ]
    ];

    protected string $type = "action";

    protected array $responses = [
        SimpleMessage::class,
        Markdown::class,
        Image::class,
        Button::class,
        ImageText::class
    ];

    protected array $validationRules = [
        "trigger_action_identifier" => ["required", "string"]
    ];

    public function GetTrigger(): string {
        return \Str::slug($this->inputValues["trigger_action_identifier"]);
    }
}
