<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workspace extends Model {
    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function rules() {
        return $this->hasMany(Rule::class, "workspace_id", "id");
    }
}
