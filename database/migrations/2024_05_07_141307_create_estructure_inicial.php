<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstructureInicial extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('columna', function (Blueprint $table) {
            $table->id();
            $table->string("descripcion", 100);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('catalogo_tema', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("columna_id")->unsigned();
            $table->string("descripcion", 250);
            $table->smallInteger("orden")->default(1)->unsigned();
            $table->smallInteger("estatus_id")->default(1)->unsigned()->comment("1-> Activo, 2->Inactivo");
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('catalogo_subtema', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("catalogo_tema_id")->unsigned();
            $table->string("descripcion", 250);
            $table->smallInteger("tipoSubtitulo")->unsigned()->comment("1=>url, 2=>pagina");
            $table->smallInteger("orden")->default(1)->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('catalogo_pagina', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("catalogo_subtema_id")->unsigned();
            $table->smallInteger("imagen")->default(0)->unsigned();
            $table->string("descripcion", 250);
            $table->smallInteger("iframe_boolean")->default(0)->unsigned();
            $table->string("iframe", 500);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('catalogo_pagina_boton', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("catalogo_pagina_id")->unsigned();
            $table->smallInteger("type_boton")->default(1)->unsigned()->comment("1=> Normal, 2=> Boton Diseñado");
            $table->smallInteger("imagen")->default(0)->unsigned();
            $table->smallInteger("type_imagen")->default(0)->unsigned()->comment("1=> icono, 2=>url");
            $table->string("icon_imagen",100)->nullable();
            $table->string("texto_boton",200);
            $table->string("descripcion", 250);
            $table->string("enlace", 250);
            $table->bigInteger("pagina_boton_padre")->unsigned()->nullable();
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
        Schema::dropIfExists('columna');
        Schema::dropIfExists('catalogo_tema');
        Schema::dropIfExists('catalogo_subtema');
        Schema::dropIfExists('catalogo_pagina');
        Schema::dropIfExists('catalogo_pagina_boton');
    }
}
