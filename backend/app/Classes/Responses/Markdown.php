<?php

namespace App\Classes\Responses;

use App\Classes\BaseResponse;
use App\Classes\ResponseInterface;

class Markdown extends BaseResponse implements ResponseInterface {

    public static function GetIdentifier(): string {
        return "response_markdown";
    }

    protected string $name = "Markdown";

    protected array $inputs = [
        [
            "type"     => "textarea",
            "required" => true,
            "name"     => "response_markdown_message",
            "label"    => "Szöveg"
        ]
    ];

    protected string $type = "say";

    protected array $validationRules = [
        "response_markdown_message" => ["required", "string"]
    ];

    public function GetPayload(): string {
        return '
        {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "' . $this->inputValues["response_markdown_message"] . '"
			}
		}';
    }

    public function GetNotificationText(): string {
        return $this->inputValues['response_markdown_message'];
    }
}
