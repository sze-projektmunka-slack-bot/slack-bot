<?php

namespace App\Classes;

interface ResponseInterface {
    public static function GetIdentifier() :string;

    public function SetInputValues(array $inputValues): void;
    public function GetName() :string;
    public function GetType() :string; //e.g. say
    public function GetInputs() :array;
    public function GetValidationRules() :array;

    public function GetPayload() :string;
}
