<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rule extends Model {
    protected $guarded = [];

    public function workspace() {
        return $this->belongsTo(Workspace::class);
    }
}
