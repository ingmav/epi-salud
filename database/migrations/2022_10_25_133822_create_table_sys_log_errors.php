<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableSysLogErrors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_log_errors', function (Blueprint $table) {
            $table->id();
            $table->timestamp('created_at')->useCurrent();
            $table->bigInteger('logged_user_id')->index();
            $table->string('ip')->nullable();
            $table->string('method',10);
            $table->text('browser_info')->nullable();
            $table->integer('code')->nullable();
            $table->string('file')->index();
            $table->integer('line')->nullable();
            $table->text('message')->nullable();
            $table->text('trace')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_log_errors');
    }
}
