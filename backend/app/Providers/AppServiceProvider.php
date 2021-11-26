<?php

namespace App\Providers;

use App\Classes\Responses\Image;
use App\Classes\Responses\Markdown;
use App\Classes\Responses\SimpleMessage;
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

        $this->app->singleton("registered_responses", function () {
            return [
                SimpleMessage::class,
                Markdown::class,
                Image::class
            ];
        });
    }
}
