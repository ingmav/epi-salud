<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableDonadores extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('donadores', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido_paterno');
            $table->string('apellido_materno');
            $table->date('fecha_nacimiento');
            $table->string('curp',18);
            $table->string('sexo',1);
            $table->bigInteger('seguro_id')->unsigned()->nullable();
            $table->string('seguro_otro')->nullable();
            $table->bigInteger('entidad_federativa_id')->unsigned();
            $table->string('ciudad');
            $table->string('codigo_postal');
            $table->string('email');
            $table->string('telefono_contacto');
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
        Schema::dropIfExists('donadores');
    }
}
