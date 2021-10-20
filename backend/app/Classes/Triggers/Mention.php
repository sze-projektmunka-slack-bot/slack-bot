<?php

namespace App\Classes\Triggers;

use App\Classes\TriggerInterface;

class Mention implements TriggerInterface{
    public static function GetName() :string {
        return "Bot Említése";
    }

    public static function GetInputs() :array {
        return [];
    }

    public static function GetType() :string {
        return "event";
    }


    public function GetTrigger() :string {
        return "app_mention";
    }
}
