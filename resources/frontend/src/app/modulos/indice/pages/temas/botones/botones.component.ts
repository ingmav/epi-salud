import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { BotonesEditComponent } from '../botones-edit/botones-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginaBotonService } from '../../../services/pagina-boton.service';
import { DialogConfirmActionComponent } from 'src/app/shared/components/dialog-confirm-action/dialog-confirm-action.component';
import { PaginaService } from '../../../services/pagina.service';
import { Subscription } from 'rxjs';

export interface ButtonPage {
  id: number;
  descripcion:string,
  icon_imagen:string,
  texto_boton:string
}

@Component({
  selector: 'app-botones',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './botones.component.html',
  styleUrl: './botones.component.css'
})
export class BotonesComponent implements OnInit {

  @Input() botones:Array<ButtonPage>;
  @Input() tipo_boton:number;
  @Input() page:string;
  @Input() padre_id:number = 0;
  @Input() texto_cabecera:string;

  @Output() messageEvent? = new EventEmitter<number>();

  subscription: Subscription;
  arreglo:Array<ButtonPage> = [];
  obj_seleccionado:any;
  loading:boolean = false;

  constructor(
    public dialog: MatDialog,
    private paginaBotonService:PaginaBotonService,
    private paginaService:PaginaService
  ){}

  ngOnInit(): void {
    this.obtenerDatos();
    this.subscription = this.paginaBotonService.change$.subscribe((response) => this.obtenerPadre(response))
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  obtenerPadre(response)
  {
    
    if(this.tipo_boton == 3 && response)
    {
      this.padre_id = response;
      
      this.paginaService.getButtonsHijos({id:response}).subscribe({
        next:(response:any) => {
          this.arreglo = response.data;
        },
        error:(response:any) => {
  
        }
      });
    }else if(this.tipo_boton == 3){
      this.arreglo = [];
      this.padre_id = 0;
    }
  }

  verificarId(obj)
  {
    this.obj_seleccionado = obj;
    this.sendId();
  }

  sendId() {
    if(this.obj_seleccionado)
    {
      this.messageEvent.emit(this.obj_seleccionado.id);  
    }else{
      this.messageEvent.emit(0);
    }
  }

  obtenerDatos()
  {
    this.loading = true;
    this.paginaService.getButtons({id:this.page}).subscribe({
      next:(response:any) => {
        if(this.tipo_boton == 1)
        {
          this.arreglo = response.data;  
        }else if(this.tipo_boton == 2)
        {
          this.arreglo = response.data_primario;
        }else if(this.tipo_boton == 4)
          {
            this.arreglo = response.data_externos;
          }
        this.loading = false;
      },
      error:(response:any) => {
        this.loading = false;
      }
    });

  }

  addBoton(identificador:number)
  {
    let dialogConfig:any = {
      maxWidth: '100%',
      width: '80%',
      height: '250px',
      disableClose: true,
      data:{}
    };
    
    dialogConfig.data.page                = this.page;
    dialogConfig.data.tipo_boton          = this.tipo_boton;
    if(identificador == 2)
    {
      dialogConfig.data.tipo                = this.obj_seleccionado.tipo;
      dialogConfig.data.id                  = this.obj_seleccionado.id;
      dialogConfig.data.icon_imagen         = this.obj_seleccionado.icon_imagen;
      dialogConfig.data.texto_boton         = this.obj_seleccionado.texto_boton;
      dialogConfig.data.descripcion         = this.obj_seleccionado.descripcion;
      dialogConfig.data.enlace              = this.obj_seleccionado.enlace;
      dialogConfig.data.pagina_boton_padre  = this.padre_id;  
    }
    if(this.padre_id)
    {
      dialogConfig.data.pagina_boton_padre  = this.padre_id; 
    }

    
    const dialogRef = this.dialog.open(BotonesEditComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        this.obtenerDatos();
        
        if(this.tipo_boton == 2){
          this.padre_id =  0;
          this.obj_seleccionado = {};
          this.messageEvent.emit(0);
        }
        this.obtenerPadre(this.padre_id);
    });
  }



  delBoton(){
  
    const dialogRef = this.dialog.open(DialogConfirmActionComponent, {
    width: '500px',
    data: {title:'Eliminar Registro',message:'Esta seguro de eliminar este registro?',hasOKBtn:true,btnColor:'warn',btnText:'Eliminar',btnIcon:'delete'}
  });

  dialogRef.afterClosed().subscribe(reponse => {
    if(reponse){
      this.paginaBotonService.eliminarPaginaBoton(this.obj_seleccionado.id).subscribe({
        next:(response:any) => {
          this.obtenerDatos();
          this.obtenerPadre(this.padre_id);
        },
        error:(response:any) => {
  
        }
      });
    }
  });
  }
}
