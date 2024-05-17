<?php

namespace App\Models\Indice;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubTema extends Model
{
    use SoftDeletes;
    protected $table = 'catalogo_subtema';

    protected static function booted () {
        static::deleting(function(SubTema $subtema) { // before delete() method call this
             $subtema->pagina()->delete();
             // do the rest of the cleanup...
        });
    }

    public function pagina(){
        return $this->hasOne('App\Models\Indice\Pagina', 'catalogo_subtema_id');
    }
    
    public function tema(){
        return $this->belongsTo('App\Models\Indice\Tema', 'catalogo_tema_id');
    }
}
