<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            //logger
            $table->id();
            $table->date('fecha_hora');
            $table->bigInteger('usuario_id');
            $table->bigInteger('registro_id');
            $table->string('path_modelo');
            $table->string('accion');
            $table->string('descripcion');
            $table->jsonb('detalles_registro');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activity_logs');
    }
}
