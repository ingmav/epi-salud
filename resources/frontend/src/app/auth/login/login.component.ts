import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  isLoading:boolean = false;

  avatarPlaceholder = 'assets/profile-icon.svg';

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = new UntypedFormGroup({
      usuario: new UntypedFormControl('',{ validators: [Validators.required] }),
      password: new UntypedFormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit(){
    this.isLoading = true;
    let usuario   = this.loginForm.value.usuario;
    let password  = this.loginForm.value.password;

    this.authService.logIn( usuario,password ).subscribe({

      next:(response) => {

        let loginHistory:any = {};
        if(localStorage.getItem('loginHistory')){
          loginHistory = JSON.parse(localStorage.getItem('loginHistory'));
        }
        loginHistory[response.user_data.username] = response.user_data.avatar;
        localStorage.setItem('loginHistory',JSON.stringify(loginHistory));

        this.router.navigate(['/apps']);

      },
      error:(error: HttpErrorResponse) => {

        let errorMessage =  Object.keys(error.error)[0];

        if(error.status != 401){
          errorMessage = "Ocurrió un error.";
        }
        this.sharedService.showSnackBar(error.error[errorMessage], 'Cerrar', 5000);
        this.isLoading = false;
        
      },
      complete:() => {
        this.sharedService.showSnackBar('¡Bienvenido al Sistema!', 'Cerrar', 3000);
      },
    });
  }

  checkAvatar(username){
    this.avatarPlaceholder = 'assets/profile-icon.svg';

    if(localStorage.getItem('loginHistory')){
      let loginHistory = JSON.parse(localStorage.getItem('loginHistory'));
      
      if(loginHistory[username]){
        this.avatarPlaceholder = loginHistory[username];
      }
    }
  }

}
