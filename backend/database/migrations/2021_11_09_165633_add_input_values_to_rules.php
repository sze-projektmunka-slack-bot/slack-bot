<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInputValuesToRules extends Migration
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
            $table->dropColumn("trigger_content");
            $table->dropColumn("response_content");
            $table->json("trigger_inputs")->after("trigger_type");
            $table->json("response_inputs")->after("response_type");
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
            $table->text("trigger_content")->after("trigger_type");
            $table->text("response_content")->after("response_type");
            $table->dropColumn("trigger_inputs");
            $table->dropColumn("response_inputs");
        });
    }
}
