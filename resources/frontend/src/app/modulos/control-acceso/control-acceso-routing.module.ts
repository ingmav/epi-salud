import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { IndexComponent } from './index/index.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  { path: '',           component: IndexComponent,          canActivate: [AuthGuard] },
  { path: 'usuarios',  component: ListaUsuariosComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlAccesoRoutingModule { }
