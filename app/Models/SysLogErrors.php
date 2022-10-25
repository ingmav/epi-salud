<?php
namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Model;

class SysLogErrors extends Model{
    public $timestamps = false;
    protected $table = 'sys_log_errors';
    protected $fillable = [
        'created_at',
        'logged_user_id',
        'ip',
        'method',
        'browser_info',
        'code',
        'file',
        'line',
        'message',
        'trace',
    ];
    
    protected $casts = [
        'trace'         => Json::class,
    ];

    public function usuario(){
        return $this->belongsTo('App\Models\Usuario','logged_user_id');
    }
}