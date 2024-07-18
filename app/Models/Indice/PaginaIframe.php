<?php

namespace App\Models\Indice;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaginaIframe extends Model
{
    use SoftDeletes;
    protected $table = 'catalogo_pagina_iframe';

}
