<?php
namespace App\Http\Controllers\API\Modulos\Indice;

use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

use \Validator,\Hash, \Response, \DB, \Storage, \File;

use App\Http\Controllers\Controller;
use App\Models\Indice\Pagina;
use App\Models\Indice\PaginaBoton;
use Carbon\Carbon;


class PaginasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try{
            $loggedUser = auth()->userOrFail();

            $parametros = $request->all();
            $obj = Pagina::with("subtema", "pagina_boton");

            //Filtros, busquedas, ordenamiento
            if($parametros['query']){
                $obj = $obj->where(function($query)use($parametros){
                    return $query->where('descripcion','LIKE','%'.$parametros['query'].'%');
                });
            }

            if(isset($parametros['page'])){
                $resultadosPorPagina = isset($parametros["per_page"])? $parametros["per_page"] : 20;
    
                $obj = $obj->paginate($resultadosPorPagina);
            } else {
                $obj = $obj->get();
            }

            return response()->json(['data'=>$obj],HttpResponse::HTTP_OK);
        }catch(\Exception $e){
            throw new \App\Exceptions\LogError('Ocurrio un error al intentar obtener la lista de temas',0,$e);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
        
            $obj = Pagina::find($id);//with("subtema", "pagina_boton");
            $image =  '';
            if($obj->imagen == 1)
            {
                $image = base64_encode(\Storage::get('public\\cabecera\\'.$obj->id.'.jpg'));
            }
            return response()->json(['data'=>$obj, 'imagen'=>$image],HttpResponse::HTTP_OK);
        }catch(\Exception $e){
            throw new \App\Exceptions\LogError('Ocurrio un error al intentar obtener la lista de temas',0,$e);
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
        //
    }

    public function cabecera(Request $request)
    {
        ini_set('memory_limit', '-1');
        $inputs = $request->all();
      
        try{  
            $parametros = $request->all();
            $folder = "";
            
            $folder = "cabecera";
            $img = $request->file("archivo");
            $extension = $img->extension();
            Storage::disk('public')->put($folder."\\".$parametros['id'].".".$extension , File::get($request->file("archivo")));

            //actualiza la pagina, se describe que tiene imagen de cabecera
            $obj = Pagina::find($parametros['id']);
            $obj->imagen = 1;
            $obj->save();
            return response()->json(['data'=>$parametros, "extension"=>$extension],HttpResponse::HTTP_OK);
            
        }catch(\Exception $e){

            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }

    public function getButtons(Request $request)
    {
        try{  
            $parametros = $request->all();
            //actualiza la pagina, se describe que tiene imagen de cabecera
            $obj = PaginaBoton::where("catalogo_pagina_id",$parametros['id'])->where("tipo", 1)->get();
            $obj_primario = PaginaBoton::where("catalogo_pagina_id",$parametros['id'])->where("tipo", 2)->get();
            return response()->json(['data'=>$obj, 'data_primario'=>$obj_primario],HttpResponse::HTTP_OK);
            
        }catch(\Exception $e){

            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }
    
    public function getButtonsHijos(Request $request)
    {
        try{  
            $parametros = $request->all();
            //actualiza la pagina, se describe que tiene imagen de cabecera
            $obj = PaginaBoton::where("pagina_boton_padre",$parametros['id'])->get();
            return response()->json(['data'=>$obj],HttpResponse::HTTP_OK);
            
        }catch(\Exception $e){

            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }

    public function iframe(Request $request)
    {
        ini_set('memory_limit', '-1');
        $inputs = $request->all();
      
        try{  
            $parametros = $request->all();
            $parametros = $parametros['params'];
            
            
            $obj = Pagina::find($parametros['id']);
            if($parametros['iframe'] == '' || $parametros['iframe'] == null)
            {
                $obj->iframe_boolean = 0; 
                $obj->iframe = '';
            }else{
                $obj->iframe_boolean = 1;
                $obj->iframe = $parametros['iframe'];
            }
            
            $obj->descripcion = strtoupper($parametros['descripcion']);
            $obj->save();
            return response()->json(['data'=>$obj],HttpResponse::HTTP_OK);
            
        }catch(\Exception $e){

            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }
    
    public function deleteImagen($id, Request $request)
    {
        try{  
            $obj = Pagina::find($id);
            $obj->imagen = 0;
            $obj->save();
            return response()->json(['data'=>$obj],HttpResponse::HTTP_OK);
            
        }catch(\Exception $e){

            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }
}
