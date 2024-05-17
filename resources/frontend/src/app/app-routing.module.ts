import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { GuessGuard } from './auth/guess.guard';
import { PrincipalComponent } from './modulos/plataforma/pages/principal/principal.component';
import { DashboardComponent } from './modulos/backend/pages/dashboard/dashboard.component';
import { PaginaDefaultComponent } from './modulos/plataforma/pages/pagina-default/pagina-default.component';


const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    loadChildren:()=>import('./modulos/plataforma/plataforma.module').then(m => m.PlataformaModule),
  },
  
  {
    path: 'auth',
    loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'backend',
    component: DashboardComponent,
    loadChildren:()=>import('./modulos/backend/backend.module').then(m => m.BackendModule),
     canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, GuessGuard]
})
export class AppRoutingModule { }