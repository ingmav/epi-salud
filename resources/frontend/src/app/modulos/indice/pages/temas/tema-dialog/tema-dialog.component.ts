import { Component, Inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
//import { UsuariosService } from '../usuarios.service';
import { AlertPanelComponent } from 'src/app/shared/components/alert-panel/alert-panel.component';


import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { TemasService } from '../../../services/temas.service';

export interface DialogData {
  id: number;
  columna_id:number;
  orden:number;
  estatus_id:number;
  descripcion:string;
}

@Component({
  selector: 'app-tema-dialog',
  templateUrl: './tema-dialog.component.html',
  styleUrl: './tema-dialog.component.css'
})
export class TemaDialogComponent implements OnInit {
  @ViewChild(AlertPanelComponent) alertPanel: AlertPanelComponent;

  constructor(
    public dialogRef: MatDialogRef<TemaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inData: DialogData,
    private formBuilder: FormBuilder,
    private temaService: TemasService,
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
  isSendingEmail:boolean;
  dialogMaxSize:boolean;

  isRoot:boolean;

  savedData:boolean;

  form:FormGroup;
  configPass:boolean;
  hidePassword:boolean;
  hideConfirmPassword:boolean;
  changesDetected:boolean;
  
  avatarsList: any[];
  selectedAvatar:string;
  avatarRowCount:number;

  statusUser:number;

  lastLogin:any;

  listaGrupos:any[];

  ngOnInit(): void {
    this.savedData = false;
    this.isLoading = false;

    this.form = this.formBuilder.group({
      'id':                         [''],
      'columna_id':                    [1,Validators.required],
      'descripcion':                       ['',[Validators.required]],
      'orden':                      ['',[Validators.required]],
      'estatus_id':                    [1,[Validators.required]],
      });

      console.log(this.inData);
      if(this.inData.columna_id)
      {
        this.form.patchValue(
          {
            id: this.inData.id,
            columna_id: this.inData.columna_id,
            descripcion: this.inData.descripcion,
            orden: this.inData.orden,
            estatus_id: this.inData.estatus_id
          }
        );
      }

  }

  ngAfterViewInit(){
    if(this.currentScreenSize == 'sm' || this.currentScreenSize == 'xs'){
      this.resizeDialog();
      if(this.currentScreenSize == 'xs'){
        this.avatarRowCount = 4;
      }else{
        this.avatarRowCount = 8;
      }
    }
  }

  guardar()
  {
    this.alertPanel.closePanel();
    if(this.form.valid || status){
      this.isSaving = true;

      let valueForm:any = this.form.value;

      this.temaService.guardarTema(valueForm).subscribe({
        next:(response:any)=>{
          this.isSaving = false;
          this.inData.id = response.data.id;
          this.alertPanel.showSuccess('Datos guardados con éxito',3);
          this.savedData = true;
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


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
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

  cancelarAccion(){
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close(this.savedData);
  }

}
