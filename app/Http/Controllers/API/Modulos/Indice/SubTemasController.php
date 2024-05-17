<?php

namespace App\Http\Controllers\API\Modulos\Indice;

use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

use \Validator,\Hash, \Response, \DB;

use App\Http\Controllers\Controller;
use App\Models\Indice\Pagina;
use App\Models\Indice\SubTema;
use Carbon\Carbon;

class SubTemasController extends Controller
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
            $obj = subTema::where("catalogo_tema_id",$parametros['catalogo_tema_id']);

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
            'orden'                         => 'required',
            'estatus_id'                    => 'required',
            'descripcion'                   => 'required', 
            'enlace'                        => 'required', 
            'orden'                         => 'required', 
        ];

        $inputs = $request->all();
        $inputs = $inputs['params'];
        
        $v = Validator::make($inputs, $reglas, $mensajes);
        if ($v->fails()) {
            return response()->json(['error' => "No se encuentra el recurso que esta buscando."], HttpResponse::HTTP_NOT_FOUND);
        }

        DB::beginTransaction();
        try {
            
            $bandera = 0;
            if($inputs['id']!=0)
            {
                $bandera = 1;
                $obj = subTema::find($inputs['id']);
                if($obj->tipoSubtitulo !=$inputs['tipoSubtitulo'])
                {
                    if($inputs['tipoSubtitulo'] == 1)//Interno
                    {
                        $page = new Pagina();
                        $page->catalogo_subtema_id = $obj->id;
                        $page->imagen = 0;
                        $page->descripcion = 0;
                        $page->iframe_boolean = 0;
                        $page->iframe = '';
                        $page->save();
                    }else{
                        $del = Pagina::find($obj->id);
                        if($del)
                        {
                            $del->delete();
                        }
                    }
                }
            }else{
                $obj = new subTema();
            }
            $obj->catalogo_tema_id                      = $inputs['catalogo_tema_id'];
            $obj->orden                                 = $inputs['orden'];
            $obj->estatus_id                            = $inputs['estatus_id'];
            $obj->descripcion                           = $inputs['descripcion'];
            $obj->enlace                                = $inputs['enlace'];
            $obj->tipoSubtitulo                         = $inputs['tipoSubtitulo'];
            
            $obj->save();

            if($bandera ==0)
            {
                $page = new Pagina();
                $page->catalogo_subtema_id = $obj->id;
                $page->imagen = 0;
                $page->descripcion = 0;
                $page->iframe_boolean = 0;
                $page->iframe = '';
                $page->save();
            }
            
            
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
        try{
        
            $obj = SubTema::with("tema","pagina.pagina_boton_inicial", "pagina.pagina_boton_primario.pagina_boton_secundario")->find($id);//with("subtema", "pagina_boton");
            $image =  '';
            //echo $obj['pagina']['imagen'];
            if($obj['pagina']['imagen'] == 1)
            {
                $image = base64_encode(\Storage::get('public\\cabecera\\'.$obj['pagina']['id'].'.jpg'));
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
        try{
            $obj = subTema::find($id);

            if(!$obj){
                return response()->json(['mensaje' => 'No se encontró el usuario seleccionado'], HttpResponse::HTTP_CONFLICT);
            }

            $obj->delete();

            return response()->json(['eliminado'=>true],HttpResponse::HTTP_OK);
        }catch(\Exception $e){
            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }

    public function getInformation($id)
    {
        try{
        
            $obj = SubTema::with("tema","pagina.pagina_boton_inicial", "pagina.pagina_boton_primario.pagina_boton_secundario")->find($id);//with("subtema", "pagina_boton");
            $image =  '';
            if($obj['pagina']['imagen'] == 1)
            {
                $image = base64_encode(\Storage::get('public\\cabecera\\'.$obj['pagina']['id'].'.jpg'));
            }
            return response()->json(['data'=>$obj, 'imagen'=>$image],HttpResponse::HTTP_OK);
        }catch(\Exception $e){
            throw new \App\Exceptions\LogError('Ocurrio un error al intentar obtener la lista de temas',0,$e);
        }
    }
}
