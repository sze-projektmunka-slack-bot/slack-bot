<?php

namespace App\Classes\Responses;

use App\Classes\BaseResponse;
use App\Classes\ResponseInterface;

class Button extends BaseResponse implements ResponseInterface {

    public static function GetIdentifier(): string {
        return "response_button";
    }

    protected string $name = "Gomb";

    protected array $inputs = [
        [
            "type"     => "text",
            "required" => true,
            "name"     => "response_message",
            "label"    => "Üzenet",
        ],
        [
            "type"     => "text",
            "required" => true,
            "name"     => "button_text",
            "label"    => "Gomb szövege",
        ],
        [
            "type"     => "text",
            "required" => true,
            "name"     => "button_action",
            "label"    => "Esemény azonosító",
        ]
    ];

    protected string $type = "say";

    protected array $validationRules = [
        "response_message" => ["required", "string"],
        "button_text"      => ["required", "string"],
        "button_action"    => ["required", "string"],
    ];

    public function GetPayload(): string {
        return '
        {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "' . $this->inputValues["response_message"] . '"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "' . $this->inputValues["button_text"] . '",
					"emoji": true
				},
				"value": ' . $this->workspaceId . ',
				"action_id": "' . \Str::slug($this->inputValues["button_action"]) . '"
			}
		}';
    }

    public function GetNotificationText(): string {
        return $this->inputValues['response_message'];
    }
}
