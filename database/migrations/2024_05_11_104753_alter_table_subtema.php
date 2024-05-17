<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableSubtema extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('catalogo_subtema', function (Blueprint $table) {
             $table->string("enlace", 250)->after("tipoSubtitulo");
             $table->smallInteger("estatus_id")->after("orden")->default(1)->unsigned()->comment("1-> Activo, 2->Inactivo");
        });

        Schema::table('catalogo_pagina_boton', function (Blueprint $table) {
            $table->renameColumn('type_boton', 'tipo');
            $table->dropColumn('imagen');
            $table->dropColumn('type_imagen');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('catalogo_pagina_boton', function (Blueprint $table) {
            $table->renameColumn('tipo', 'type_boton');
            $table->smallInteger("type_imagen")->default(0)->unsigned()->comment("1=> icono, 2=>url")->after("catalogo_pagina_id");
            $table->smallInteger("imagen")->default(0)->unsigned()->after("catalogo_pagina_id");
            
        });
        Schema::table('catalogo_subtema', function (Blueprint $table) {
            $table->dropColumn("enlace");
            $table->dropColumn("estatus_id");

        });
    }
}
