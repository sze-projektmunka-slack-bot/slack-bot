<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Workspace\CreateWorkspaceRequest;
use App\Models\Workspace;
use Illuminate\Http\Request;

class WorkspaceController extends Controller {

    public function create(CreateWorkspaceRequest $request) {
        $client_id = config("slack_bot.client_id");
        $client_secret = config("slack_bot.client_secret");

        $raw_response = shell_exec("curl -F code={$request->code} -F client_id={$client_id} -F client_secret={$client_secret} https://slack.com/api/oauth.v2.access");

        $response = json_decode($raw_response, true);

        if(!$response["ok"]) {
            return response()->json(null, 400);
        }

        $workspace = Workspace::create([
            "user_id" => auth()->id(),
            "access_token" => $response["access_token"],
            "team_name" => $response["team"]["name"],
            "team_id" => $response["team"]["id"],
        ]);

        return response()->json([
            "workspace_id" => $workspace->id,
            "team_name" => $workspace->team_name
        ]);
    }
}
