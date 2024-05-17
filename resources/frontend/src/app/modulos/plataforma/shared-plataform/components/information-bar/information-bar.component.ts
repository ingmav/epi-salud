import { Component, OnInit } from '@angular/core';
import { TemasService } from 'src/app/modulos/indice/services/temas.service';

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
  url:String
}

@Component({
  selector: 'app-information-bar',
  templateUrl: './information-bar.component.html',
  styleUrls: ['./information-bar.component.css']
})
export class InformationBarComponent implements OnInit {

  semana_epidemiologica:string = "--";
  simulacroMenu:Array<MenuGeneral> = [];
  constructor(private temaService:TemasService) { }

  ngOnInit(): void {
    this.obtenerMenu();
  }

  obtenerMenu()
  {
    this.temaService.obtenerTemasPlataforma().subscribe({
      next:(response:any) => {
        let { data } = response;
        this.semana_epidemiologica = response.semana;
        data.forEach(element => {
          let arreglo:MenuGeneral = { title:'', columnas:[]};
          arreglo.title = element.descripcion;

          element.tema.forEach(element_tema => {
            let temas:Menu = { title:'', temas:[]};
            
            temas.title = element_tema.descripcion;
            element_tema.subtema.forEach(element_subtema => {
              let subtemas:SubMenu = { titleSubtema:'', url:''};
              subtemas.titleSubtema = element_subtema.descripcion;  
              subtemas.url = "";
              temas.temas.push(subtemas);
            });
            arreglo.columnas.push(temas);
          });
          this.simulacroMenu.push(arreglo);  
        });
        
      },
      error:(response:any) => {
      }
    });
  }

}
