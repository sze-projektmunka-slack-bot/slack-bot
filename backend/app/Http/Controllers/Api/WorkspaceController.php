<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Workspace\CreateWorkspaceRequest;
use App\Models\Workspace;
use Illuminate\Http\Request;

class WorkspaceController extends Controller {

    public function list() {
        $workspaces = Workspace::where("user_id", auth()->id())->get()->map(function ($workspace) {
            return [
                "workspace_id" => $workspace->id,
                "team_name" => $workspace->team_name
            ];
        });

        return response()->json($workspaces);
    }

    public function store(CreateWorkspaceRequest $request) {
        $client_id = config("slack_bot.client_id");
        $client_secret = config("slack_bot.client_secret");

        $oauth_raw_response = shell_exec(
            "curl -F code={$request->code} -F client_id={$client_id} -F client_secret={$client_secret} https://slack.com/api/oauth.v2.access"
        );

        $oauth_response = json_decode($oauth_raw_response, true);

        if (!$oauth_response["ok"]) {
            return response()->json(null, 400);
        }

        $bot_test_raw_response = shell_exec(
            'curl https://slack.com/api/auth.test -H "Accept: application/json" -H "Authorization: Bearer ' . $oauth_response["access_token"] . '"'
        );

        $bot_test_response = json_decode($bot_test_raw_response, true);

        if (!$bot_test_response["ok"] || empty($bot_test_response["bot_id"])) {
            return response()->json(null, 400);
        }

        $workspace = Workspace::create([
            "user_id" => auth()->id(),
            "access_token" => $oauth_response["access_token"],
            "team_name" => $oauth_response["team"]["name"],
            "team_id" => $oauth_response["team"]["id"],
            "bot_user_id" => $oauth_response["bot_user_id"],
            "bot_id" => $bot_test_response["bot_id"]
        ]);

        return response()->json([
            "workspace_id" => $workspace->id,
            "team_name"    => $workspace->team_name
        ]);
    }
}
