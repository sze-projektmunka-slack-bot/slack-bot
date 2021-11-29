<?php

namespace App\Classes;

class BaseTrigger {
    protected string $name;
    protected array $inputs;
    protected string $type;
    protected array $responses;
    protected array $validationRules;

    protected array $inputValues;

    public function SetInputValues(array $inputValues): void {
        $this->inputValues = $inputValues;
    }

    public function GetName(): string {
        return $this->name;
    }

    public function GetInputs(): array {
        return $this->inputs;
    }

    public function GetType(): string {
        return $this->type;
    }

    public function GetResponses(): array {
        return $this->responses;
    }

    public function GetValidationRules(): array {
        return $this->validationRules;
    }
}
