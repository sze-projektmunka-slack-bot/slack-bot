<?php

namespace App\Classes;

interface TriggerInterface {
    public static function GetIdentifier() :string;
    public static function GetName() :string;
    public static function GetInputs() :array;
    public static function GetType() :string; //e.g. message, event, command
    public static function GetResponses() : array;
    public static function GetValidationRules() : array;

    public static function GetTrigger(array $inputValues) :string; //e.g. app_mention
}
