<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIdentifiersToRules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\Rule::truncate();
        Schema::table('rules', function (Blueprint $table) {
            $table->renameColumn("trigger_type", "trigger_identifier");
            $table->renameColumn("response_type", "response_identifier");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('rules', function (Blueprint $table) {
            $table->renameColumn("trigger_identifier", "trigger_type");
            $table->renameColumn("response_identifier", "response_type");
        });
    }
}
