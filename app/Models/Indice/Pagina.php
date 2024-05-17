<?php

namespace App\Models\Indice;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pagina extends Model
{
    use SoftDeletes;
    protected $table = 'catalogo_pagina';

    protected static function booted () {
        static::deleting(function(Pagina $pagina) { // before delete() method call this
             $pagina->pagina_boton()->delete();
             // do the rest of the cleanup...
        });
    }

    public function pagina_boton(){
        return $this->hasMany('App\Models\Indice\PaginaBoton', "catalogo_pagina_id");
    }
    
    public function pagina_boton_inicial(){
        return $this->hasMany('App\Models\Indice\PaginaBoton', "catalogo_pagina_id")->where("tipo",1);
    }
    
    public function pagina_boton_primario(){
        return $this->hasMany('App\Models\Indice\PaginaBoton', "catalogo_pagina_id")->where("tipo",2);
    }
    
    public function subtema(){
        return $this->belongsTo('App\Models\Indice\SubTema', "catalogo_subtema_id");
    }

    
}
