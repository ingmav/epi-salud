import { Component, OnInit } from '@angular/core';
import { TemasService } from 'src/app/modulos/indice/services/temas.service';
import { Router } from '@angular/router';

export interface MenuGeneral {
  title:string,
  columnas:Array<Menu>
}

export interface Menu {
  title:string,
  temas:Array<SubMenu>
}

export interface SubMenu {
  titleSubtema:string,
  url:String,
  tipo:number,
  id:number
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  semana_epidemiologica:string = "--";
  simulacroMenu:Array<MenuGeneral> = [];
  loading:boolean = false;

  constructor(
    private temaService:TemasService,
    private router:Router) { }

  ngOnInit(): void {
    this.obtenerMenu();
  }

  obtenerMenu()
  {
    this.loading = true;
    this.temaService.obtenerTemasPlataforma().subscribe({
      next:(response:any) => {
        this.loading = false;
        let { data } = response;
        this.semana_epidemiologica = response.semana;
        data.forEach(element => {
          let arreglo:MenuGeneral = { title:'', columnas:[]};
          arreglo.title = element.descripcion;

          element.tema.forEach(element_tema => {
            let temas:Menu = { title:'', temas:[]};
            
            temas.title = element_tema.descripcion;
            element_tema.subtema.forEach(element_subtema => {
              let subtemas:SubMenu = { titleSubtema:'', url:'', tipo:0, id:0};
              subtemas.titleSubtema = element_subtema.descripcion;  
              subtemas.url = element_subtema.enlace;
              subtemas.tipo = element_subtema.tipoSubtitulo;
              subtemas.id = element_subtema.id;
              temas.temas.push(subtemas);
            });
            arreglo.columnas.push(temas);
          });
          this.simulacroMenu.push(arreglo);  
        });
        
      },
      error:(response:any) => {
        this.loading = false;
      }
    });
  }

  linkPage(obj)
  {
    if(obj.tipo == 1)
    {
      let route = '/page/' + obj.url +'/' + obj.id;
      this.router.navigate([route]);
    }else if(obj.tipo == 2)
    {
      window.open(obj.url, "_blank");
    }
  }
}
