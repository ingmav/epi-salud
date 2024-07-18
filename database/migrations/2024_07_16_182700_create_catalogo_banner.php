<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCatalogoBanner extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('catalogo_banner', function (Blueprint $table) {
            $table->id();
            $table->string("descripcion", 200);
            $table->string("nombre", 250);
            $table->string("extension", 10);
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
        Schema::dropIfExists('catalogo_banner');
    }
}
