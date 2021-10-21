<?php

namespace App\Classes;

class BaseResponse {

    protected array $inputValues;

    public function __construct(array $inputValues = null) {
        $this->inputValues = $inputValues;
    }
}