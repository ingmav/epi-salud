import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginaService } from '../../../services/pagina.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaginaBotonService } from '../../../services/pagina-boton.service';
import { DialogConfirmActionComponent } from 'src/app/shared/components/dialog-confirm-action/dialog-confirm-action.component';

export interface ButtonPage {
  id: number;
  icon_imagen: string;
  texto_boton: string;
  descripcion:string;
  enlace:string;
  pagina_boton_padre:string;
}


@Component({
  selector: 'app-pagina-edit',
  templateUrl: './pagina-edit.component.html',
  styleUrl: './pagina-edit.component.css'
})
export class PaginaEditComponent implements OnInit {
  form:FormGroup;
  srcResult:any;
  fileChangedEvent: any = '';
  archivo: File = null;
  url_imagen:any = '';
  id_pagina:any;
  id_padre:number;
  botonesInicial:Array<ButtonPage>;
  botonesPrimarios:Array<ButtonPage>;
  botonesSecundarios:Array<ButtonPage>;


  constructor(
    private formBuilder: FormBuilder,
    private paginaService:PaginaService,
    private route: ActivatedRoute,
    private paginaBotonService:PaginaBotonService,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'id':                           ['', Validators.required],
      //'iframe':                       [''],
      'descripcion':                  [''],
    }); 
    this.route.paramMap.subscribe(params => {
      if(params.get('id')){
        this.id_pagina = params.get('id');
        this.form.patchValue({id: this.id_pagina});
        this.cargarData();
      }
    });
  }

  cargarData()
  {
    this.paginaService.getPagina(this.id_pagina,{}).subscribe({
      next:(response:any) => {
        console.log(response);
        let {data} = response;
        let {imagen} = response;
        this.form.patchValue({descripcion:data.descripcion});
        if(data.imagen == 1)
        {
          //this.archivo = new File();
          this.url_imagen = "data:image/jpeg;base64,"+imagen; 
        }
        //this.botonesInicial = response.data;
        //this.botonesPrimarios = response.data_primario;
      },
      error:(response:any) => {

      }
    });
  }

  receiveId($event) {
    this.sendIdPadre($event);
  }

  sendIdPadre(id)
  {
    this.paginaBotonService.change$.next(id);
  }

  onFileSelected(event: any): void {
    this.fileChangedEvent = event;
    if (this.fileChangedEvent.target || this.fileChangedEvent.target.files.length || this.fileChangedEvent.target.files[0]) {
      let registro = this.fileChangedEvent.target.files[0];
      this.url_imagen = this.fileChangedEvent.target.srcResult;
      let fileList: FileList = event.target.files;
      if (registro.type == "image/png" || registro.type == "image/gif" || registro.type == "image/jpeg") {
        this.archivo = <File>fileList[0];
        const reader = new FileReader();
        reader.onload = e => this.url_imagen = reader.result;
        reader.readAsDataURL(registro);
      }
    } 
  }

  GuardarArchivo()
  {
    this.paginaService.ImportarFile(this.archivo, this.id_pagina).subscribe({
      next:(response:any) => {
       
      },
      error:(response:any) => {

      }
    });
  }

  EliminarArchivo()
  {
    const dialogRef = this.dialog.open(DialogConfirmActionComponent, {
      width: '500px',
      data: {title:'Eliminar Registro',message:'Esta seguro de eliminar este registro?',hasOKBtn:true,btnColor:'warn',btnText:'Eliminar',btnIcon:'delete'}
    });

    dialogRef.afterClosed().subscribe(reponse => {
      if(reponse){

        this.paginaService.eliminarImage(this.id_pagina).subscribe({
          next:(response:any) => {
          this.url_imagen = '';
          },
          error:(response:any) => {

          }
        });
      }
    });
  }

  guardaFrame()
  {
    this.paginaService.guardarFrame(this.form.value).subscribe({
      next:(response:any) => {
       
      },
      error:(response:any) => {

      }
    });
  }

}
