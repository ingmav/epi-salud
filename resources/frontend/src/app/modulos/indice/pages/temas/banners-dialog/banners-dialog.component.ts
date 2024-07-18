import { Component, Inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertPanelComponent } from 'src/app/shared/components/alert-panel/alert-panel.component';


import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { BannersService } from '../../../services/banners.service';
import { DialogConfirmActionComponent } from 'src/app/shared/components/dialog-confirm-action/dialog-confirm-action.component';

export interface DialogData {
  id: number;
  orden:number;
  estatus_id:number;
  descripcion:string;
  extension:string;
  nombre:string;
}

@Component({
  selector: 'app-banners-dialog',
  templateUrl: './banners-dialog.component.html',
  styleUrl: './banners-dialog.component.css'
})
export class BannersDialogComponent {
  @ViewChild(AlertPanelComponent) alertPanel: AlertPanelComponent;
  constructor(
    public dialogRef: MatDialogRef<BannersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inData: DialogData,
    private formBuilder: FormBuilder,
    private bannersService: BannersService,
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

  isLoadingImage:boolean = false;
  isLoading:boolean;
  isSaving:boolean;
  isLoadingResults:boolean;
  dialogMaxSize:boolean;
  dataImage = "";
  cargandoImage: boolean = false;

  savedData:boolean;
  data:any = [];
  form:FormGroup;
  changesDetected:boolean;

  file_store: File;
  resumen:any = {};
  
  ngOnInit(): void {
    this.savedData = false;
    this.isLoading = false;

    this.form = this.formBuilder.group({
      'id':                          [''],
      'descripcion':                 ['',Validators.required],
      'archivo':                     ['',[Validators.required]],
      'orden':                       [1,[Validators.required]],
      'extension':                       [1,[Validators.required]],
      'estatus_id':                  [1,[Validators.required]],
      });

      this.form.patchValue({id: this.inData.id, archivo:this.inData.nombre, descripcion: this.inData.descripcion, orden:this.inData.orden, estatus_id:this.inData.estatus_id});
      if(this.inData.id)
      {
        this.cargarImage(); 
        this.cargandoImage = true; 
      }else{

      }
      
  }

  ngAfterViewInit(){
    if(this.currentScreenSize == 'sm' || this.currentScreenSize == 'xs'){
      this.resizeDialog();
    }
  }

  handleFileInputChange(l: File, evt:any): void {

    const f = l[0];
    console.log(f);
    if(f.type == "image/png" || f.type=="image/jpeg" || f.type=="image/jpg"){
      this.file_store = f;
      // this.resumen.nombre = f.name;
      // this.resumen.peso = (f.size / 1048576).toFixed(2);
      
         this.form.patchValue({archivo: f.name, nombre: f.name, extension: f.name.split('.').pop()});

    }
    
  }

  cargarImage()
  {
    this.isLoadingImage = false;
    this.bannersService.cargarImage(this.inData.id).subscribe({
      next:(response:any)=>{
       
        this.dataImage = "data:image/png;base64, "+response.imagen;
        this.isLoadingImage = true;
      },
      error:(response:any)=>{
        this.isLoadingImage = false;
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

  guardar()
  {
    this.alertPanel.closePanel();
    if(this.form.valid){
      this.isSaving = true;

      let valueForm:any = this.form.value;
     this.bannersService.guardar(valueForm, this.file_store).subscribe({
        next:(response:any)=>{
          this.cerrar();
          this.isSaving = false;
          this.alertPanel.showSuccess('Datos guardados con éxito',3);
          this.savedData = true;
          this.form.patchValue({id:0, descripcion:'', orden:1, estatus_id:1,archivo: "", extension:""});

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


  edit(obj?)
  {
    this.form.patchValue(obj);
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
