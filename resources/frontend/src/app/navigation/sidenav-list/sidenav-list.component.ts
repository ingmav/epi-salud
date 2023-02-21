import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { AuthService } from '../../auth/auth.service';
import { AppsListService } from '../../apps-list/apps-list.service';
import { App } from '../../apps-list/apps';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditProfileComponent } from '../dialog-edit-profile/dialog-edit-profile.component';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() onCloseSidenav = new EventEmitter<void>();

  isAuthenticated:boolean = false;
  user: User;
  apps: App[];

  selectedUnidad:any;

  authSubscription:Subscription;

  constructor(
    private authService:AuthService,
    private appsService: AppsListService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuth();
    if(this.isAuthenticated){
      this.user = this.authService.getUserData();
      this.selectedUnidad = this.authService.getUnidadActual();
      this.getApps();
    }

    this.authSubscription = this.authService.authChange.subscribe(
      status => {
        this.getApps();
        this.isAuthenticated = status;
        if(status){
          this.user = this.authService.getUserData();
          this.selectedUnidad = this.authService.getUnidadActual();
        }else{
          this.user = new User();
        }
      }
    );
  }

  openEditProfile(){
    const dialogRef = this.dialog.open(DialogEditProfileComponent,{maxWidth: '100%',disableClose: true});
  }

  getApps():void{
    this.apps = this.appsService.getApps();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
  
  logout(){
    this.authService.logout();
    this.close();
  }
  
  close(){
    this.onCloseSidenav.emit()
  }
}
