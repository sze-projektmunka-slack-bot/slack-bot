<?php

namespace App\Classes;

class BaseResponse {
    protected string $name;
    protected array $inputs;
    protected string $type;
    protected array $validationRules;

    protected array $inputValues;

    protected int $workspaceId = -1;

    public function SetInputValues(array $inputValues): void {
        $this->inputValues = $inputValues;
    }

    public function SetWorkspaceId(int $workspaceId): void {
        $this->workspaceId = $workspaceId;
    }

    public function GetName() :string {
        return $this->name;
    }

    public function GetInputs() :array {
        return $this->inputs;
    }

    public function GetType() :string {
        return $this->type;
    }

    public function GetValidationRules(): array {
        return $this->validationRules;
    }
}
