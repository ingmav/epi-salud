<?php

namespace App\Models\Indice;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tema extends Model
{
    use SoftDeletes;
    protected $table = 'catalogo_tema';

    protected static function booted () {
        static::deleting(function(Tema $tema) { // before delete() method call this
             $tema->subtema()->delete();
             // do the rest of the cleanup...
        });
    }

    public function subtema(){
        return $this->hasMany('App\Models\Indice\Subtema', 'catalogo_tema_id');
    }
}
