<?php

namespace App\Models\Indice;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaginaBoton extends Model
{
    use SoftDeletes;
    protected $table = 'catalogo_pagina_boton';

    public function pagina_boton_secundario(){
        return $this->hasMany('App\Models\Indice\PaginaBoton', 'pagina_boton_padre', 'id');
    }
}
