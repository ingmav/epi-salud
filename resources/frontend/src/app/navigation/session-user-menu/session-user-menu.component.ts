import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { App } from 'src/app/apps-list/apps';
import { AppsListService } from 'src/app/apps-list/apps-list.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/models/user';
import { DialogEditProfileComponent } from '../dialog-edit-profile/dialog-edit-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'session-user-menu',
  standalone: true,
  imports:[ SharedModule, RouterModule, CommonModule],
  templateUrl: './session-user-menu.component.html',
  styleUrls: ['./session-user-menu.component.css']
})
export class SessionUserMenuComponent {
  @Input() mode:string;
  @Output() onClose = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private appsService: AppsListService,
    public dialog: MatDialog,
  ){}

  isAuthenticated: boolean;
  isSideNav: boolean;
  user: User;
  apps: App[];
  authSubscription: Subscription;
  fechaHoy: Date;
  
  ngOnInit(){
    this.isSideNav = false;
    this.isAuthenticated = this.authService.isAuth();
    this.fechaHoy = new Date();

    if(this.isAuthenticated){
      this.user = this.authService.getUserData();
    }

    this.authSubscription = this.authService.authChange.subscribe(
      status => {
        this.isAuthenticated = status;
        if(status){
          this.user = this.authService.getUserData();
        }else{
          this.user = new User();
        }
      }
    );

    this.apps = this.appsService.getApps();

    if(this.mode == 'sidenav'){
      this.isSideNav = true;
    }
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  openEditProfile(){
    this.dialog.open(DialogEditProfileComponent,{maxWidth: '100%',disableClose: true});
  }

  logout(){
    this.authService.logout();
    this.close();
  }

  close(){
    this.onClose.emit(true);
  }
}
