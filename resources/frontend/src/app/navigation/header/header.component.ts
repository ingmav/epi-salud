import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { App } from 'src/app/apps-list/apps';
import { AppsListService } from 'src/app/apps-list/apps-list.service';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SharedService } from '../../shared/shared.service';
import { MatMenu } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditProfileComponent } from '../dialog-edit-profile/dialog-edit-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SessionUserMenuComponent } from '../session-user-menu/session-user-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[SharedModule, RouterModule, SessionUserMenuComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() onSidenavToggle = new EventEmitter<void>();

  @ViewChild('navmenu', {static:true}) navMenu:MatMenu;

  public isAuthenticated:boolean;
  authSubscription: Subscription;
  selectedApp: any;
  selectedAppLink: any;
  selectedUnidad:any;
  headerIcon: string;
  user: User;
  apps: App[]; 
  menus: any[]; 
  modulos:any;
  selectedChild: any;
  showAccount:boolean;

  constructor(
    private authService:AuthService,
    private appsService: AppsListService,
    private sharedService: SharedService,
    public dialog: MatDialog,
    private router: Router
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      this.headerIcon = undefined;
      this.selectedAppLink = {};

      this.getApps();
      let routes = event.url.split('/');

      let selected_route = this.getLink(routes);

      this.modulos = {};
      this.menus = [];
      if(selected_route != "")
      {
        this.apps.forEach(element => {
          let seleccion = element.route.toUpperCase().split('/');
  
          if(seleccion[(seleccion.length -1 )] == selected_route.toUpperCase()){
            if(element.menu){
              element.menu.forEach(menu => {
                if(menu.children.length){
                  this.menus.push(menu);
                  this.modulos[menu.identificador] = menu.children;
                }
              });
            }
          }
        });  
      }
      
     let currentApp = this.sharedService.getCurrentApp();
      if(currentApp.name != selected_route ){
        this.sharedService.newCurrentApp(selected_route);
      }
      
      if(selected_route){
        this.selectedApp = this.apps.find(function(element) {
          return element.route == selected_route;
        });
      }else{
        this.selectedApp = undefined;
      }
      
      if(this.selectedApp){
        this.headerIcon = this.selectedApp.icon;
        this.selectedAppLink = {name:this.selectedApp.name,route:this.selectedApp.route};

        if(this.selectedApp.apps && routes[2]){
          
          let selectedRoute = routes[1]+'/'+routes[2];
          let selectedChildApp = this.selectedApp.apps.find(function(element) {
            return element.route == selectedRoute;
          });

          if(selectedChildApp){
            this.headerIcon = selectedChildApp.icon;          }
        }
      }
     
    });
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuth();
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

  closeOverlay(){
    this.showAccount = false;
  }

  toggleSidenav(){
    this.onSidenavToggle.emit();
  }

  logout(){
    this.authService.logout();
  }

  getLink(arreglo:any):string{

    let link_response = "";
    
    const primerFiltro = arreglo.filter(links => links!='');
    const segundoFiltro = primerFiltro.filter(links => links!='backend');
    let tamano = (segundoFiltro.length - 1);
    let contador = 0;
    
    while (link_response == "" && contador<=tamano) {
      if(!Number.isInteger(parseInt(segundoFiltro[contador])))
      {
        link_response = segundoFiltro[contador];
      }
      contador++;
    }
    return link_response;
  }
}
