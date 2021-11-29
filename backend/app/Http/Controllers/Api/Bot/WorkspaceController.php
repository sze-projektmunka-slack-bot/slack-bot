<?php

namespace App\Http\Controllers\Api\Bot;

use App\Http\Controllers\Controller;
use App\Models\Workspace;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    public function list() {
        $workspaces = Workspace::all()->map(function ($workspace) {
            return [
                "workspace_id" => $workspace->id,
                "access_token" => $workspace->access_token,
                "team_name" => $workspace->team_name,
                "team_id" => $workspace->team_id,
                "bot_id" => $workspace->bot_id,
                "bot_user_id" => $workspace->bot_user_id,
            ];
        });

        return response()->json($workspaces);
    }
}
