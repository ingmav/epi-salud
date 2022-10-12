import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../../shared/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { PermissionsService } from '../permissions.service';
import { CustomValidator } from '../../../utils/classes/custom-validator';

export interface FormDialogData {
  id: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private permissionsService: PermissionsService,
    public dialogRef: MatDialogRef<FormComponent>,
    private fb: UntypedFormBuilder,
    public sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData
  ) {}

  isLoading:boolean = false;
  permiso:any = {};

  provideID:boolean = false;
  
  permisoForm = this.fb.group({
    'id': [{value:'',disabled:true},[Validators.maxLength(32),Validators.minLength(32), Validators.required, CustomValidator.notEqualToValidator('repeatedId')]],
    'repeatedId':[''],
    'description': ['',[Validators.required]],
    'group': ['',[Validators.required]],
    'is_super': [false]
  });

  ngOnInit() {
    let id = this.data.id;
    if(id){
      this.isLoading = true;
      this.permissionsService.getPermission(id).subscribe({
        
        next:(response) => {
          this.permiso = response.data;
          this.permisoForm.patchValue(this.permiso);
          this.isLoading = false;
        },
        error:(error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
          if(error.error){
            if(error.error.validacion === false){
              this.manageRepeatedIDError(error);
            }
          }
        },
        complete:() => {
          this.sharedService.showSnackBar('¡Permiso Obtenido!', 'Cerrar', 3000);
        },
      });
    }
  }

  savePermission(){
    this.isLoading = true;
    if(this.permiso.id){

      this.permissionsService.updatePermission(this.permiso.id,this.permisoForm.value).subscribe({
        next:(response) => {
          this.dialogRef.close(true);
          console.log(response);
          this.isLoading = false;
        },
        error:(error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
          if(error.error){
            if(error.error.validacion === false){
              this.manageRepeatedIDError(error);
            }
          }
        }
      });
    }else{
      this.permissionsService.createPermission(this.permisoForm.value).subscribe({

        next:(response) => {
          this.dialogRef.close(true);
          console.log(response);
          this.isLoading = false;

        },
        error:(error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
          if(error.error){
            if(error.error.validacion === false){
              this.manageRepeatedIDError(error);
            }
          }          
        }
      });
    }
  }

  toggleID(){
    this.provideID = !this.provideID;
    if(this.provideID){
      this.permisoForm.get('id').enable();
      this.permisoForm.get('id').markAsDirty();
      this.permisoForm.get('id').markAsTouched();
    }else{
      this.permisoForm.get('id').disable();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  manageRepeatedIDError(errorResponse:any){
    if(errorResponse.error.errores){
      for(let i in errorResponse.error.errores){
        if(i == 'id'){
          let errores = errorResponse.error.errores[i];
          for(let j in errores){
            if(errores[j] == 'El ID debe ser único'){
              this.permisoForm.get('repeatedId').patchValue(this.permisoForm.get('id').value);
              this.permisoForm.get('id').enable();
              this.permisoForm.get('id').markAsDirty();
              this.permisoForm.get('id').markAsTouched();
              break;
            }
          }
          break;
        }
      }
    }
  }

}