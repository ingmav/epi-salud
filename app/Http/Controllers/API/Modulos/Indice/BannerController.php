<?php

namespace App\Http\Controllers\API\Modulos\Indice;

use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

use \Validator,\Hash, \Response, \DB, \Storage, \File;

use App\Http\Controllers\Controller;
use App\Models\Indice\Banner;
use Carbon\Carbon;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try{
            $parametros = $request->all();
            $obj = Banner::getModel();

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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
        
            $obj = Banner::find($id);
            $image =  '';
            $image = base64_encode(\Storage::get('public\\banners\\'.$obj->id.'.'.$obj->extension));
            
            return response()->json(['data'=>$obj, 'imagen'=>$image],HttpResponse::HTTP_OK);
        }catch(\Exception $e){
            throw new \App\Exceptions\LogError('Ocurrio un error al intentar obtener la lista de temas',0,$e);
        }
    }
    public function Slides()
    {
        try{
        
            $obj = Banner::where("estatus_id",1);
            //return response()->json(['images'=>$obj],HttpResponse::HTTP_OK);
            $image = [];
            for ($i=0; $i <count($obj) ; $i++) { 
                $image[] = base64_encode(\Storage::get('public\\banners\\'.$obj[$i]['id'].'.'.$obj[$i]['extension']));    
            }
            return response()->json(['images'=>$image],HttpResponse::HTTP_OK);
            
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
    public function store(Request $request)
    {
        try{
            $mensajes = [
            
                'required'      => "required",
            ];
    
            $reglas = [
                'descripcion'                   => 'required',
                'orden'                         => 'required',
                'estatus_id'                    => 'required',
            ];

            $inputs = $request->all();
            
            $v = Validator::make($inputs, $reglas, $mensajes);
            if ($v->fails()) {
                return response()->json(['error' => "No se encuentra el recurso que esta buscando."], HttpResponse::HTTP_NOT_FOUND);
            }

                DB::beginTransaction();    
                if(intval($inputs['id']) > 0)
                {
                    $obj = Banner::find($inputs['id']);
                }else{
                    $obj = new Banner();
                }

                $obj->descripcion           = strtoupper($inputs['descripcion']);
                $obj->estatus_id            = $inputs['estatus_id'];
                $obj->orden                 = $inputs['orden'];
                
                
                
                $name = $obj->id.".".$obj->extension;
                if(is_file($request->file("archivo")))
                {
                    $request->file("archivo")->storeAs("public/banners", $name);
                    $obj->extension             = $inputs['extension'];
                    $obj->nombre                = $inputs['nombre'];
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $obj = Banner::find($id);

            if(!$obj){
                return response()->json(['mensaje' => 'No se encontró el usuario seleccionado'], HttpResponse::HTTP_CONFLICT);
            }

            $obj->delete();

            return response()->json(['eliminado'=>true],HttpResponse::HTTP_OK);
        }catch(\Exception $e){
            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }
}
