<?php

namespace App\Providers;

use App\Classes\Triggers\Mention;
use App\Classes\Triggers\Message;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->singleton("registered_triggers", function () {
            return [
                Mention::class,
                Message::class,
            ];
        });
    }
}
