<?php

namespace App\Classes;

class BaseTrigger {

    protected array $inputValues;

    public function __construct(array $inputValues = null) {
        $this->inputValues = $inputValues;
    }
}