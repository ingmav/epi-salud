<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableCorrejir extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('catalogo_subtema', function (Blueprint $table) {
            $table->string("descripcion", 250)->nullable()->change();
        });
        
        Schema::table('catalogo_pagina', function (Blueprint $table) {
            $table->string("iframe", 500)->nullable()->change();
            $table->smallInteger("iframe_boolean")->nullable()->change();
            $table->smallInteger("imagen")->default(0)->change();
        });
        
        Schema::table('catalogo_pagina_boton', function (Blueprint $table) {
            $table->string("icon_imagen", 100)->nullable()->change();
            $table->string("descripcion", 250)->nullable()->change();
            $table->bigInteger("pagina_boton_padre")->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('catalogo_subtema', function (Blueprint $table) {
            $table->string("descripcion", 250)->change();
        });
        
        Schema::table('catalogo_pagina', function (Blueprint $table) {
            $table->string("iframe", 500)->change();
            $table->smallInteger("iframe_boolean")->change();
        });
        
        Schema::table('catalogo_pagina_boton', function (Blueprint $table) {
            $table->string("icon_imagen", 100)->change();
            $table->string("descripcion", 250)->change();
            $table->bigInteger("pagina_boton_padre")->change();
        });
    }
}
