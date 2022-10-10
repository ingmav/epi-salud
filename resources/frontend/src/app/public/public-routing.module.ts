import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuessGuard } from '../auth/guess.guard';
import { AuthGuard } from '../auth/auth.guard';

import { RegistroDonadorComponent } from './registro-donador/registro-donador.component';
import { InfoQrDonanteComponent } from './info-qr-donante/info-qr-donante.component';
import { ListaDonadoresComponent } from './lista-donadores/lista-donadores.component';

const routes: Routes = [

  { path: 'registro',          component: RegistroDonadorComponent, canActivate: [GuessGuard]  },
  { path: 'registro/nuevo',    component: RegistroDonadorComponent, data: { hideHeader: true } },


  { path: 'qr-donante/:codigo',   component: InfoQrDonanteComponent,    canActivate: [GuessGuard] },
  { path: 'donantes',             component: ListaDonadoresComponent,   canActivate: [AuthGuard] },
  { path: 'aditar-donante/:id',    component: RegistroDonadorComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
