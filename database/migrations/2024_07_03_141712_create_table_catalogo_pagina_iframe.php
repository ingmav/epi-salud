<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableCatalogoPaginaIframe extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('catalogo_pagina_iframe', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("catalogo_pagina_id")->unsigned();
            $table->string("icono", 50);
            $table->string("descripcion", 150);
            $table->string("iframe", 500);
            $table->smallInteger("estatus_id")->default(1)->unsigned()->comment("1-> Activo, 2->Inactivo");
            $table->smallInteger("orden")->default(1)->unsigned();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('catalogo_pagina_iframe');
    }
}
