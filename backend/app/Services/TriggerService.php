<?php
namespace App\Services;

use App\Classes\TriggerInterface;
use Illuminate\Support\Collection;

class TriggerService {

    public static function GetRegisteredTriggers(): Collection {
        return app("registered_triggers"); //TODO ez majd mehet configba vagy dbbe
    }

    public static function GetTrigger(string $identifier) : ?TriggerInterface {
        return self::GetRegisteredTriggers()->firstWhere("identifier", $identifier) ?? null;
    }
}
