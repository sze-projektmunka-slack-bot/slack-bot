<?php

namespace App\Classes\Responses;

use App\Classes\BaseResponse;
use App\Classes\ResponseInterface;

class Image extends BaseResponse implements ResponseInterface {

    public static function GetIdentifier(): string {
        return "response_simple_image";
    }

    protected string $name = "Egyszerű Kép";

    protected array $inputs = [
        [
            "type"     => "url",
            "required" => true,
            "name"     => "response_image_url"
        ],
        [
            "type"     => "text",
            "required" => true,
            "name"     => "response_image_alt_text"
        ]
    ];

    protected string $type = "say";

    protected array $validationRules = [
        "response_image_url" => ["required", "url"],
        "response_image_alt_text" => ["required", "string"]
    ];

    public function GetPayload(): string {
        return '
        {
			"type": "image",
			"image_url": "'.$this->inputValues["response_image_url"].'",
			"alt_text": "'. $this->inputValues["response_image_alt_text"].'"
		}';
    }

    public function GetNotificationText() :string {
        return $this->inputValues['response_image_alt_text'];
    }
}
