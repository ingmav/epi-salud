import { Component, Inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertPanelComponent } from 'src/app/shared/components/alert-panel/alert-panel.component';


import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { SubtemaService } from '../../../services/subtema.service';
import { DialogConfirmActionComponent } from 'src/app/shared/components/dialog-confirm-action/dialog-confirm-action.component';

export interface DialogData {
  id: number;
  orden:number;
  estatus_id:number;
  descripcion:string;
  subtema:any;
}

@Component({
  selector: 'app-subtema-dialog',
  templateUrl: './subtema-dialog.component.html',
  styleUrl: './subtema-dialog.component.css'
})
export class SubtemaDialogComponent {
  @ViewChild(AlertPanelComponent) alertPanel: AlertPanelComponent;
  constructor(
    public dialogRef: MatDialogRef<SubtemaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inData: DialogData,
    private formBuilder: FormBuilder,
    private subtemaService: SubtemaService,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }
  destroyed = new Subject<void>();
  currentScreenSize: string;
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xs'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xl'],
  ]);

  isLoading:boolean;
  isSaving:boolean;
  isLoadingResults:boolean;
  dialogMaxSize:boolean;

  savedData:boolean;
  data:any = [];
  form:FormGroup;
  changesDetected:boolean;
  displayedColumns: string[] = ['subtema', 'estatus'];

  ngOnInit(): void {
    this.savedData = false;
    this.isLoading = false;

    this.form = this.formBuilder.group({
      'id':                          [''],
      'catalogo_tema_id':            ['',Validators.required],
      'descripcion':                 ['',Validators.required],
      'tipoSubtitulo':               ['',[Validators.required]],
      'enlace':                      ['',[Validators.required]],
      'orden':                       [1,[Validators.required]],
      'estatus_id':                  [1,[Validators.required]],
      });

      this.data = this.inData.subtema;
      this.form.patchValue({catalogo_tema_id: this.inData.id});
      console.log("-->", this.form);
  }

  ngAfterViewInit(){
    if(this.currentScreenSize == 'sm' || this.currentScreenSize == 'xs'){
      this.resizeDialog();
    }
  }

  guardar()
  {
    this.alertPanel.closePanel();
    if(this.form.valid){
      this.isSaving = true;

      let valueForm:any = this.form.value;

      this.subtemaService.guardarSubTema(valueForm).subscribe({
        next:(response:any)=>{
          this.isSaving = false;
          this.alertPanel.showSuccess('Datos guardados con éxito',3);
          this.savedData = true;
          this.form.patchValue({id:0, enlace:'', descripcion:'', orden:1, estatus_id:1});
          this.obtenerDatos();
        },
        error:(response:any)=>{
          if(response.error.error_type == 'form_validation'){
            for (const key in response.error.data) {
              if (Object.prototype.hasOwnProperty.call(response.error.data, key)) {
                const element = response.error.data[key];
                let error:any = {};
                error[element] = true;
                this.form.get(key).setErrors(error);
              }
            }
            this.alertPanel.showError(response.error.message);
          }else{
            this.alertPanel.showError(response.error.message);
          }
          this.isSaving = false;
        }
      });
    }
  }

  obtenerDatos()
  {
    this.subtemaService.obtenerSubTemas({catalogo_tema_id: this.inData.id}).subscribe({
      next:(response:any)=>{
        this.isSaving = false;
        this.savedData = true;
        this.data = response.data;
      },
      error:(response:any)=>{
        if(response.error.error_type == 'form_validation'){
          for (const key in response.error.data) {
            if (Object.prototype.hasOwnProperty.call(response.error.data, key)) {
              const element = response.error.data[key];
              let error:any = {};
              error[element] = true;
              this.form.get(key).setErrors(error);
            }
          }
          this.alertPanel.showError(response.error.message);
        }else{
          this.alertPanel.showError(response.error.message);
        }
        this.isSaving = false;
      }
    });
  }

  eliminarRegistro(id)
  {
    this.subtemaService.eliminarSubTema(id).subscribe({
      next:(response:any)=>{
        this.isSaving = false;
        this.savedData = true;
        this.obtenerDatos();
      },
      error:(response:any)=>{
        if(response.error.error_type == 'form_validation'){
          for (const key in response.error.data) {
            if (Object.prototype.hasOwnProperty.call(response.error.data, key)) {
              const element = response.error.data[key];
              let error:any = {};
              error[element] = true;
              this.form.get(key).setErrors(error);
            }
          }
          this.alertPanel.showError(response.error.message);
        }else{
          this.alertPanel.showError(response.error.message);
        }
        this.isSaving = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  verificarEstatus(valor)
  {
    if(valor == 2)
    {
      this.form.patchValue({ enlace: ''});  
    }
  }

  verificaContenido(valor)
  {
    let enlace =  valor.toLowerCase();
    enlace = enlace.replace(/\s/g, '-');
    enlace = enlace.replace(/\\/g, "");
    this.form.patchValue({enlace:enlace});
    console.log("v->",this.form.value);
  }

  edit(obj?)
  {
    this.form.patchValue(obj);
  }
  
  eliminar(obj?)
  {
    let id:string = obj.id;
    //DialogConfirmActionComponent
    const dialogRef = this.dialog.open(DialogConfirmActionComponent, {
      width: '500px',
      data: {title:'Eliminar Registros',message:'Esta seguro de eliminar este registro?',hasOKBtn:true,btnColor:'warn',btnText:'Eliminar',btnIcon:'delete'}
    });

    dialogRef.afterClosed().subscribe(reponse => {
      if(reponse){
        this.eliminarRegistro(id);
      }
    });
  }

  resizeDialog(){
    if(!this.dialogMaxSize){
      this.dialogRef.updateSize('100%', '100%');
      this.dialogMaxSize = true;
    }else{
      this.dialogRef.updateSize('80%','80%');
      this.dialogMaxSize = false;
    }
  }

  cancelarAccion(){
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close(this.savedData);
  }

}
