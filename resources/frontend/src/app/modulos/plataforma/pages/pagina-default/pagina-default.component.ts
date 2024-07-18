import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlataformaService } from '../../servicios/plataforma.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-pagina-default',
  templateUrl: './pagina-default.component.html',
  styleUrl: './pagina-default.component.css'
})
export class PaginaDefaultComponent implements OnInit {

  @ViewChild(MatMenuTrigger,{static:false}) menu: MatMenuTrigger; 

  titulo_general:string = "";
  subtitulo_general:string = "";
  buttonsInicials:Array<any>;
  buttonsPrimarios:Array<any> = [];
  buttonsSecundarios:Array<any>;
  buttonsLinks:Array<any> = [];
  iframe:SafeResourceUrl;
  iframe_bool:boolean = false;
  loadpage:boolean = false;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private plataformaService:PlataformaService,
    private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get('subtema')){
        this.cargarInformacion(params.get('subtema'));
      }
    });
  }

  cargarInformacion(id)
  {
    this.loadpage = true;
    this.plataformaService.obtenerInformacion(id).subscribe({
      next: (response:any) => {
        this.loadpage =false;
        let { data } = response;
        let { pagina } = data;
        
        this.titulo_general = data.tema.descripcion;
        this.buttonsInicials = pagina.pagina_boton_inicial;
        this.buttonsPrimarios = pagina.pagina_boton_primario;
        pagina.pagina_links_externos.map(element =>{
          element.enlace = this.sanitizer.bypassSecurityTrustResourceUrl(element.enlace);
        });
        this.buttonsLinks     = pagina.pagina_links_externos;
        this.subtitulo_general =  pagina.descripcion;
      },
      error: (response:any) => {
        this.loadpage =false;
      }
    });
  }

  goTo(url)
  {
    let route = '/' + url;
      this.router.navigate([route]);
  }
  
  goToUrl(url)
  {
    window.open(url, "_blank");
  }

  verificarContenido(obj)
  {
    let tamano = obj.pagina_boton_secundario.length;
    if(tamano > 0)
    {
      this.buttonsSecundarios = obj.pagina_boton_secundario;
      
    }else{
      this.menu.closeMenu()
      //this.buttonsSecundarios =  [ obj ];
      window.open(obj.enlace, "_blank");
    }
     
  }

}
