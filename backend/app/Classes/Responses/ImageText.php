<?php

namespace App\Classes\Responses;

use App\Classes\BaseResponse;
use App\Classes\ResponseInterface;

class ImageText extends BaseResponse implements ResponseInterface {

    public static function GetIdentifier(): string {
        return "response_image_text";
    }

    protected string $name = "Feliratos Kép";

    protected array $inputs = [
        [
            "type"     => "url",
            "required" => true,
            "name"     => "response_image_url",
            "label"    => "Kép url",
        ],
        [
            "type"     => "text",
            "required" => true,
            "name"     => "response_image_alt_text",
            "label"    => "Alternatív szöveg",
        ],
        [
            "type"     => "text",
            "required" => true,
            "name"     => "response_message",
            "label"    => "Felirat szöveg",
        ]
    ];

    protected string $type = "say";

    protected array $validationRules = [
        "response_image_url"      => ["required", "url"],
        "response_image_alt_text" => ["required", "string"],
        "response_message"        => ["required", "string"],
    ];

    public function GetPayload(): string {
        return '
        {
			"type": "image",
			"title": {
				"type": "plain_text",
				"text": "' . $this->inputValues["response_message"] . '",
				"emoji": true
			},
			"image_url": "' . $this->inputValues["response_image_url"] . '",
			"alt_text": "' . $this->inputValues["response_image_alt_text"] . '"
		}';
    }

    public function GetNotificationText(): string {
        return $this->inputValues['response_image_alt_text'];
    }
}
