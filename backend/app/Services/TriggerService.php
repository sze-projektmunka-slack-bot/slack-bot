<?php
namespace App\Services;

use App\Classes\TriggerInterface;
use Illuminate\Support\Collection;

class TriggerService {

    public static function GetRegisteredTriggers(): array {
        //TODO ez majd mehet configba vagy dbbe
        return app("registered_triggers");
    }

    public static function GetTrigger(string $identifier) : ?TriggerInterface {
        foreach (self::GetRegisteredTriggers() as $trigger) {
            if($trigger::GetIdentifier() == $identifier){
                return new $trigger();
            }
        }
        return null;
    }
}
