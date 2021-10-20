<?php

namespace App\Classes;

interface TriggerInterface {
    public static function GetName() :string;
    public static function GetInputs() :array;
    public static function GetType() :string; //e.g. message, event, command

    public function GetTrigger() :string; //e.g. app_mention
}
