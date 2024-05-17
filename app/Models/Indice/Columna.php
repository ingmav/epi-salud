<?php

namespace App\Models\Indice;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Columna extends Model
{
    use SoftDeletes;
    protected $table = 'columna';

    public function tema(){
        return $this->hasMany('App\Models\Indice\Tema', 'columna_id');
    }
}
