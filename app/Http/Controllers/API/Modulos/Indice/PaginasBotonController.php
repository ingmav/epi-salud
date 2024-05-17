<?php

namespace App\Http\Controllers\API\Modulos\Indice;

use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

use \Validator,\Hash, \Response, \DB, \Storage, \File;

use App\Http\Controllers\Controller;
use App\Models\Indice\PaginaBoton;
use Carbon\Carbon;

class PaginasBotonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $mensajes = [
            
                'required'      => "required",
            ];
    
            $reglas = [
                'texto_boton'                         => 'required',
                'descripcion'                   => 'required',
                'enlace'                        => 'required',
            ];

            $inputs = $request->all();
            $inputs = $inputs['params'];

            $v = Validator::make($inputs, $reglas, $mensajes);
            if ($v->fails()) {
                return response()->json(['error' => "No se encuentra el recurso que esta buscando."], HttpResponse::HTTP_NOT_FOUND);
            }

                DB::beginTransaction();    
                if($inputs['id'])
                {
                    $obj = PaginaBoton::find($inputs['id']);
                }else{
                    $obj = new PaginaBoton();
                }
                $obj->catalogo_pagina_id    = $inputs['page'];
                $obj->tipo                  = $inputs['tipo'];
                $obj->icon_imagen           = $inputs['icon_imagen'];
                $obj->texto_boton           = strtoupper($inputs['texto_boton']);
                $obj->descripcion           = strtoupper($inputs['descripcion']);
                $obj->enlace                = $inputs['enlace'];
                if(isset($inputs['pagina_boton_padre']))
                {
                    $obj->pagina_boton_padre    = $inputs['pagina_boton_padre'];
                }
                $obj->save();
                DB::commit();
                return response()->json($obj,HttpResponse::HTTP_OK);
            
        }catch(\Exception $e){
            DB::rollback();
            throw new \App\Exceptions\LogError('Ocurrio un error al intentar guardar los datos del usuario',0,$e);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        try{
            $inputs = $request->all();
            $inputs = $inputs['params'];

            $obj = PaginaBoton::find($inputs['id']);
            return response()->json($obj,HttpResponse::HTTP_OK);
            
        }catch(\Exception $e){
            DB::rollback();
            throw new \App\Exceptions\LogError('Ocurrio un error al intentar guardar los datos del usuario',0,$e);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            DB::beginTransaction();    
            $obj = PaginaBoton::find($id);
            $obj->delete();
            DB::commit();
            return response()->json($obj,HttpResponse::HTTP_OK);
            
        }catch(\Exception $e){
            DB::rollback();
            throw new \App\Exceptions\LogError('Ocurrio un error al intentar guardar los datos del usuario',0,$e);
        }
    }
}
