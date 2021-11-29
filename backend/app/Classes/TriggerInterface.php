<?php

namespace App\Classes;

interface TriggerInterface {
    public static function GetIdentifier() :string;

    public function SetInputValues(array $inputValues): void;
    public function GetName() :string;
    public function GetInputs() :array;
    public function GetType() :string; //e.g. message, event, command
    public function GetResponses() : array;
    public function GetValidationRules() : array;

    public function GetTrigger() :string; //e.g. app_mention
}
