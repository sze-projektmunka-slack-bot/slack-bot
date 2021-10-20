<?php

namespace App\Classes;

interface ResponseInterface {
    public static function GetName() :string;
    public static function GetType() :string; //e.g. say
    public static function GetInputs() :array;

    public function GetPayload() :string;
}
