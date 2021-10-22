<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthBotServer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if($request->header("api-key") !== config("slack_bot.api_key")) {
            return response()->noContent(401);
        }


        return $next($request);
    }
}
