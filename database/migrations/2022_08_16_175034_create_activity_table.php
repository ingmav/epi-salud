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
        Schema::create('logs_movimientos', function (Blueprint $table) {
            //logger
            $table->id();
            $table->date('fecha');
            $table->bigInteger('usuario_id');
            $table->bigInteger('registro_tabla_id');
            $table->string('path_modelo');
            $table->string('accion');
            $table->string('estatus')->nullable();
            $table->string('descripcion');
            $table->jsonb('registro');

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
        Schema::dropIfExists('logs_movimientos');
    }
}
