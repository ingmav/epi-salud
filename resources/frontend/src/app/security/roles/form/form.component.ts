import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../../shared/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { RolesService } from '../roles.service';
import { CustomValidator } from '../../../utils/classes/custom-validator';
import { PermissionsService } from '../../permissions/permissions.service';
import { Observable, of } from 'rxjs';
import { startWith, map, combineLatestWith } from 'rxjs/operators';

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
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
    public dialogRef: MatDialogRef<FormComponent>,
    private fb: UntypedFormBuilder,
    public sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData
  ) {}
  
  isSaving:boolean;
  isLoading:boolean = false;
  rol:any = {};
  
  catalogPermissions: any[] = [];
  listOfPermissions$: Observable<any[]>;
  filterInput: UntypedFormControl = new UntypedFormControl('');
  filterInput$: Observable<string> = this.filterInput.valueChanges.pipe(startWith(''));
  filteredPermissions$: Observable<any[]>;
  
  selectedPermissions: any[] = [];
  selectedItems: any = {};


  rolForm = this.fb.group({
    'name': ['',[Validators.required]],
    'permissions': [[],[Validators.required]]
  });

  ngOnInit() {

    this.permissionsService.getAllPermissions().subscribe({

      next:(response) => {
        this.catalogPermissions = response.data;

        this.listOfPermissions$ = of(this.catalogPermissions);

        this.filteredPermissions$ = this.listOfPermissions$.pipe(
          combineLatestWith(this.filterInput$),
          map(
            ([permissions,filterString]) => permissions.filter(
              permission => (permission.description.toLowerCase().indexOf(filterString.toLocaleLowerCase()) !== -1) || (permission.group.toLowerCase().indexOf(filterString.toLocaleLowerCase()) !== -1)
            )
          )
          
        );
      },
      error:(error: HttpErrorResponse) => {
        let errorMessage = Object.keys(error.error)[0];
        if(error.status === 409){
          
          this.sharedService.showSnackBar("Status Code: "+error.status+', '+error.error[errorMessage].message, 'Cerrar', 5000);
        }
        this.isLoading = false;
      }
    });
    
    let id = this.data.id;
    if(id){
      this.isLoading = true;
      this.rolesService.getRole(id).subscribe(
        response => {
          this.rol = response.data;
          this.rolForm.patchValue(this.rol);
          this.selectedPermissions = this.rol.permissions;
          for(let i in this.selectedPermissions){
            this.selectedItems[this.selectedPermissions[i].id] = true;
          }
          this.isLoading = false;
        }
      );
    }
  }

  clearPermissionSearch(){
    this.filterInput.setValue('')
  }

  removePermission(index){
    let permission = this.selectedPermissions[index];
    this.selectedPermissions.splice(index,1);
    this.selectedItems[permission.id] = false;
    this.rolForm.get('permissions').patchValue(this.selectedPermissions);
  }

  selectPermission(permission){
    if(!this.selectedItems[permission.id]){
      this.selectedPermissions.push(permission);
      this.selectedItems[permission.id] = true; 
      this.rolForm.get('permissions').patchValue(this.selectedPermissions);
    }else{
      let permissionIndex = this.selectedPermissions.findIndex(item => item.id == permission.id);
      this.removePermission(permissionIndex);
    }
  }

  saveRole(){
    this.isLoading = true;
    if(this.rol.id){
      this.rolesService.updateRole(this.rol.id,this.rolForm.value).subscribe({

        next:(response) => {
          this.dialogRef.close(true);
          console.log(response);
          this.isLoading = false;
        },
        error:(error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
        }

      });
    }else{
      this.rolesService.createRole(this.rolForm.value).subscribe({

        next:(response) => {
          this.dialogRef.close(true);
          console.log(response);
          this.isLoading = false;
        },
        error:(error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
        }

      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  nuevoRol(){
    this.rolForm.reset();
    this.data.id = null;
    this.rol = {};

    this.catalogPermissions = [];
    this.selectedPermissions.length = 0;

    this.selectedPermissions.pop();
    this.listOfPermissions$.subscribe();
    this.selectedPermissions.slice(0);
    this.selectedItems = {};

    console.log(this.selectedPermissions);





  }

  cancelarAccion(){
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }
}
