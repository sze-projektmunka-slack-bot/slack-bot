<?php
namespace App\Services;

use App\Classes\ResponseInterface;
use Illuminate\Support\Collection;

class ResponseService {

    public static function GetRegisteredResponses(): Collection {
        return app("registered_responses"); //TODO ez majd mehet configba vagy dbbe
    }

    public static function GetResponse(string $identifier) : ?ResponseInterface {
        return self::GetRegisteredResponses()->firstWhere("identifier", $identifier) ?? null;
    }
}
