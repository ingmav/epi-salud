import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertPanelComponent } from 'src/app/shared/components/alert-panel/alert-panel.component';
import { CustomValidator } from 'src/app/utils/classes/custom-validator';
import { AVATARS } from 'src/app/avatars';
import { DialogConfirmActionComponent } from 'src/app/shared/components/dialog-confirm-action/dialog-confirm-action.component';

@Component({
  selector: 'app-dialog-edit-profile',
  templateUrl: './dialog-edit-profile.component.html',
  styleUrls: ['./dialog-edit-profile.component.css']
})
export class DialogEditProfileComponent implements OnInit {
  @ViewChild('inputPassword') inputPassword: ElementRef;
  @ViewChild(AlertPanelComponent) alertPanel: AlertPanelComponent;


  constructor(
    public dialogRef: MatDialogRef<DialogEditProfileComponent>,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ){}

  isLoading:boolean;
  isSaving:boolean;
  changesDetected:boolean;
  savedData:boolean;
  dialogMaxSize:boolean;
  changePass:boolean;

  hidePassword:boolean;
  hideConfirmPassword:boolean;

  avatarsList: any[];
  selectAvatar:boolean;
  showAvatarList:boolean;

  createdAt:any;

  formPerfil:FormGroup;
  selectedAvatar:string;
  userName:string;

  ngOnInit(): void {
    this.isLoading = true;
    this.savedData = false;
    this.dialogRef.updateSize('80%', 'auto');

    this.avatarsList = AVATARS;

    this.formPerfil = this.formBuilder.group({
      'id':                         [''],
      'name':                       ['',Validators.required],
      'email':                      ['',[Validators.required, Validators.email]],
      'avatar':                     [this.selectedAvatar],
    });

    this.authService.getProfileData().subscribe({
      next: (response:any) => {
        this.createdAt = new Date(response.data.created_at);
        this.formPerfil.patchValue(response.data);
        this.selectedAvatar = response.data.avatar;
        this.userName = response.data.username;
        this.isLoading = false;
        this.setConfigForm();
      },
      error: (response:any) => {
        this.alertPanel.showError(response.error.message);
        this.isLoading = false;
      }
    })
  }

  guardarPerfil(){
    if(this.formPerfil.valid){
      this.isSaving = true;
      let formData:any = this.formPerfil.value;

      this.authService.updateProfileData(formData.id,formData).subscribe({
        next: (response:any)=>{
          this.authService.updateUserData(response.usuario);
          this.savedData = true;
          this.alertPanel.showSuccess('Datos guardados con éxito',3);
          this.changesDetected = false;
          this.isSaving = false;
        },
        error: (response:any)=>{
          this.alertPanel.showError(response.error.message);
          this.isSaving = false;
        }
      })
    }
  }

  setAvatar(avatar:string){
    this.selectedAvatar = avatar;
    this.showAvatarList = false;
    this.formPerfil.get('avatar').patchValue(avatar);
  }

  toggleAvatarList(){
    this.showAvatarList = !this.showAvatarList;
  }

  toggleChangePass(){
    if(this.changePass){
      if(this.formPerfil.get('password')){
        this.formPerfil.removeControl('confirm_password');
        this.formPerfil.removeControl('password');
        this.formPerfil.removeControl('valid_password');
      }
    }else{
      if(!this.formPerfil.get('password')){
        this.hidePassword = true;
        this.hideConfirmPassword = true;
        this.formPerfil.addControl('password',new FormControl('',[Validators.required, Validators.minLength(8)]));
        this.formPerfil.addControl('confirm_password',new FormControl('',[Validators.required, CustomValidator.fieldMatchValidator('password')]));
        this.formPerfil.addControl('valid_password',new FormControl(false,Validators.requiredTrue));

        setTimeout (() => {
          if(this.inputPassword){
            this.inputPassword.nativeElement.focus();
          }
        }, 10);
      }
    }
    this.changePass = !this.changePass;
  }

  passwordValid(event){
    this.formPerfil.get('valid_password').patchValue(event);
    this.formPerfil.get('confirm_password').patchValue('');
    if(!event){
      this.formPerfil.get('password').setErrors({'lowstrenght':true});
    }
  }

  resizeDialog(){
    if(!this.dialogMaxSize){
      this.dialogRef.updateSize('100%', '100%');
      this.dialogMaxSize = true;
    }else{
      this.dialogRef.updateSize('80%','auto');
      this.dialogMaxSize = false;
    }
  }

  cancelarAccion(){
    if(this.showAvatarList){
      this.showAvatarList = false;
    }else if(this.changePass){
      this.changePass = false;
    }else{
      this.cerrar();
    }
  }

  setConfigForm(){
    this.formPerfil.valueChanges.subscribe(
      changes => {
        this.changesDetected = true;
      }
    );
  }

  cerrar(){
    if(this.changesDetected){
      let dialogConfig:any = {
        data:{title:'Hay datos sin guardar',message: 'Si continua perdera los datos no guardados', hasOKBtn:true, btnText:'Continuar'}
      };

      const confirmDialog = this.dialog.open(DialogConfirmActionComponent,dialogConfig);
  
      confirmDialog.afterClosed().subscribe(result => {
        if(result){
          this.dialogRef.close();
        }
      });
    }else{
      this.dialogRef.close(this.savedData);
    }
  }
}
