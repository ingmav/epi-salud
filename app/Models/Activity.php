<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
//use Illuminate\Database\Eloquent\SoftDeletes;

class Activity extends Model
{
    //use SoftDeletes;
    protected $table = 'activity';
    protected $fillable = [
        
        'id',
        'user_id',
        'contentId',
        'contentType',
        'action',
        'description',
        'details'

    ];

    // public function entidad_federativa(){
    //     return $this->belongsTo('App\Models\EntidadFederativa','entidad_federativa_id');
    // }

    // public function seguro(){
    //     return $this->belongsTo('App\Models\Seguro','seguro_id');
    // }

}
