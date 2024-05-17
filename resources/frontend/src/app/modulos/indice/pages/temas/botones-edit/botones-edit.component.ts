import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { AlertPanelComponent } from 'src/app/shared/components/alert-panel/alert-panel.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginaBotonService } from '../../../services/pagina-boton.service';

export interface DialogData {
  id: number;
  page: number;
  tipo_boton: number;
  tipo:number;
  icon_imagen:string;
  texto_boton:string;
  descripcion:string;
  enlace:string;
  pagina_boton_padre:number;

}

@Component({
  selector: 'app-botones-edit',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule ],
  templateUrl: './botones-edit.component.html',
  styleUrl: './botones-edit.component.css'
})
export class BotonesEditComponent implements OnInit {

  @ViewChild(AlertPanelComponent) alertPanel: AlertPanelComponent;

  isLoading:boolean;
  isSaving:boolean;
  dialogMaxSize:boolean;

  isRoot:boolean;
  savedData:boolean;

  form:FormGroup;
  changesDetected:boolean;
  currentScreenSize: string;
  destroyed = new  Subject<void>();
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xs'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xl'],
  ]);

  constructor(
    public dialogRef: MatDialogRef<BotonesEditComponent>,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public inData: DialogData,
    private paginaBotonService:PaginaBotonService
  ){
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
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'id':                         [''],
      'page':                       [''],
      'tipo':                       [''],
      'icon_imagen':                [''],
      'texto_boton':                ['',Validators.required],
      'descripcion':                [''],
      'enlace':                     ['',Validators.required],
      'pagina_boton_padre':         [''],
    });

    if(this.inData.id)
    {
      this.form.patchValue(this.inData); 
    }
    
    if(this.inData.pagina_boton_padre)
    {
      this.form.patchValue({pagina_boton_padre:this.inData.pagina_boton_padre}); 
    }
    console.log(this.inData);
  }

  ngAfterViewInit(){
    if(this.currentScreenSize == 'sm' || this.currentScreenSize == 'xs'){
      this.resizeDialog();
    }
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  guardar()
  {
    this.form.patchValue({ page: this.inData.page, tipo: this.inData.tipo_boton});
    this.paginaBotonService.guardarPaginaBoton(this.form.value).subscribe({
      next:(response:any)=>{
        this.cerrar();
      },
      error:(response:any)=>{
        if(response.error.error_type == 'form_validation'){
          for (const key in response.error.data) {
            if (Object.prototype.hasOwnProperty.call(response.error.data, key)) {
              const element = response.error.data[key];
              let error:any = {};
              error[element] = true;
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

  cancelarAccion(){
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close(this.savedData);
  }
  
  resizeDialog(){
    if(!this.dialogMaxSize){
      this.dialogRef.updateSize('100%', '100%');
      this.dialogMaxSize = true;
    }else{
      this.dialogRef.updateSize('80%','60%');
      this.dialogMaxSize = false;
    }
  }
}
