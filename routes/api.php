<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('logout',           'API\Auth\AuthController@logout');
    Route::get('perfil',            'API\Auth\AuthController@me');
    //Route::post('change-session',   'API\Auth\AuthController@updateToken');
});

Route::post('signin',               'API\Auth\AuthController@login');
Route::post('refresh',              'API\Auth\AuthController@refresh');
Route::post('reset-password',       'API\Auth\AuthController@resetPassword');
Route::post('send-reset-password',  'API\Auth\AuthController@sendResetPassword');

/**
 *  Para envio de correos
 */
Route::get('enviar-recuperar-pass',             'API\Admin\MailerController@enviarRecuperarContrasena');

Route::group(['middleware'=>'auth'],function($router){
    Route::post('change-session',           'API\Auth\AuthController@updateToken');
    Route::get('lista-unidades-usuario',    'API\Auth\AuthController@getListaUnidadesUsuario');

    Route::get('perfil-usuario',            'API\ProfileController@getProfile');
    Route::put('perfil-usuario/{id}',       'API\ProfileController@updateProfile');

    Route::get('unidades',                          'API\Admin\UnidadesController@index');
    Route::get('buscador-unidades-catalogos',       'API\Admin\UnidadesController@catalogos');
    
    //DevTools dev-tools/sys-log-errors
    Route::apiResource('dev-tools/sys-log-errors',    'API\DevTools\SysLogErrorsController')->only([ 'index', 'show']);
    Route::get('dev-tools/ejecutar-query',            'API\DevTools\DevReporterController@executeQuery');
    Route::get('dev-tools/exportar-query',            'API\DevTools\DevReporterController@exportExcel');

    Route::apiResource('user',                      'API\Admin\UserController');
    Route::get('user-catalogs',                     'API\Admin\UserController@getCatalogs');
    Route::put('change-user-status/{id}',           'API\Admin\UserController@changeUserStatus');
    Route::get('grupo-cargar-unidades/{grupoID}',   'API\Admin\UserController@getUnidades'); //TODO: Temporalmente, se debe mover a controller de grupos

    Route::apiResource('grupos',                     'API\Admin\GRupoController')->only((['index','store','show','destroy']));

    Route::apiResource('permission',    'API\Admin\PermissionController');
    Route::apiResource('role',          'API\Admin\RoleController');
    Route::get('reloj-test',            'API\Modulos\RelojController@verificar');
    Route::apiResource('reloj',         'API\Modulos\RelojController');
    Route::apiResource('responsable',   'API\Modulos\ResponsableController');
    Route::apiResource('firmante',      'API\Modulos\FirmanteController');
    
    /**
     * Catalogo
     */
});

Route::middleware('auth')->get('/avatar-images', function (Request $request) {
    $avatars_path = public_path() . config('ng-client.path') . '/assets/avatars';
    $image_files = glob( $avatars_path . '/*', GLOB_MARK );

    $root_path = public_path() . config('ng-client.path');

    $clean_path = function($value)use($root_path) {
        return str_replace($root_path,'',$value);
    };
    
    $avatars = array_map($clean_path, $image_files);

    return response()->json(['images'=>$avatars], HttpResponse::HTTP_OK);
});