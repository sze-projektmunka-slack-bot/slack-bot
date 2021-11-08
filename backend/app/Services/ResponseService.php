<?php
namespace App\Services;

use App\Classes\ResponseInterface;
use Illuminate\Support\Collection;

class ResponseService {

    public static function GetRegisteredResponses(): array {
        return app("registered_responses"); //TODO ez majd mehet configba vagy dbbe
    }

    public static function GetResponse(string $identifier) : ?string {
        foreach (self::GetRegisteredResponses() as $response) {
            if($response::GetIdentifier() == $identifier){
                return $response;
            }
        }
        return null;
    }
}
