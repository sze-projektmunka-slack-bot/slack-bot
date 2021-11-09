<?php
namespace App\Services;

use App\Classes\ResponseInterface;
use Illuminate\Support\Collection;

class ResponseService {

    public static function GetRegisteredResponses(): array {
        return app("registered_responses"); //TODO ez majd mehet configba vagy dbbe
    }

    public static function GetResponse(string $identifier) : ?ResponseInterface {
        foreach (self::GetRegisteredResponses() as $response) {
            if($response::GetIdentifier() == $identifier){
                return new $response();
            }
        }
        return null;
    }
}
