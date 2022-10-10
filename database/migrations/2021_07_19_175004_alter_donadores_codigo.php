<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterDonadoresCodigo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('donadores', function (Blueprint $table) {

            $table->string('codigo',6)->index()->after('id');
            $table->integer('edad')->index()->after('fecha_nacimiento');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('donadores', function (Blueprint $table) {
            
            $table->dropColumn('codigo');
            $table->dropColumn('edad');
            
        });
    }
}
