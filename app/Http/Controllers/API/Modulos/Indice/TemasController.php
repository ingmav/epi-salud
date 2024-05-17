<?php

namespace App\Http\Controllers\API\Modulos\Indice;

use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

use \Validator,\Hash, \Response, \DB;

use App\Http\Controllers\Controller;
use App\Models\Indice\Columna;
use App\Models\Indice\SubTema;
use App\Models\Indice\Tema;
use Carbon\Carbon;

class TemasController extends Controller
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
            $obj = Tema::with("subtema");

            //Filtros, busquedas, ordenamiento
            if($parametros['query']){
                $obj = $obj->where(function($query)use($parametros){
                    return $query->where('descripcion','LIKE','%'.$parametros['query'].'%');
                });
            }

            if((isset($parametros['sort']) && $parametros['sort']) && (isset($parametros['direction']) && $parametros['direction'])){
                $obj = $obj->orderBy($parametros['sort'],$parametros['direction']);
            }else{
                $obj = $obj->orderBy('updated_at','desc');
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
        
        $mensajes = [
            
            'required'      => "required",
        ];

        $reglas = [
            'columna_id'                    => 'required',
            'orden'                         => 'required',
            'estatus_id'                    => 'required',
            'descripcion'                   => 'required',
            
        ];

        $inputs = $request->all();
        $inputs = $inputs['params'];
        
        $v = Validator::make($inputs, $reglas, $mensajes);
        if ($v->fails()) {
            return response()->json(['error' => "No se encuentra el recurso que esta buscando."], HttpResponse::HTTP_NOT_FOUND);
        }

        DB::beginTransaction();
        try {
            
            if($inputs['id']!=0)
            {
                $obj = Tema::find($inputs['id']);
            }else{
                $obj = new Tema();
            }
            //Hacemos la actualizacion de la unidad
            $obj->columna_id                            = $inputs['columna_id'];
            $obj->orden                                 = $inputs['orden'];
            $obj->estatus_id                            = $inputs['estatus_id'];
            $obj->descripcion                           = $inputs['descripcion'];
            
            $obj->save();
            
           DB::commit();
            
            return response()->json($obj,HttpResponse::HTTP_OK);

        }catch(\Exception $e){
            throw new \App\Exceptions\LogError('Ocurrio un error al intentar obtener la lista de temas',0,$e);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
            $obj = Tema::find($id);
            if(!$obj){
                return response()->json(['mensaje' => 'No se encontró el usuario seleccionado'], HttpResponse::HTTP_CONFLICT);
            }
            SubTema::where("catalogo_tema_id", $id)->delete();
            
            $obj->delete();

            return response()->json(['eliminado'=>true],HttpResponse::HTTP_OK);
        }catch(\Exception $e){
            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }

    public function temaPlataforma(Request $request)
    {
        try{
            $obj = Columna::with("tema.subtema")->get();

            $semana = new Carbon();
            $semana_epidemiologica =  $semana->weekOfYear;
            return response()->json(['data'=>$obj, "semana"=>$semana_epidemiologica],HttpResponse::HTTP_OK);
        }catch(\Exception $e){
            throw new \App\Exceptions\LogError('Ocurrio un error al intentar obtener la lista de temas',0,$e);
        }
    }
}
