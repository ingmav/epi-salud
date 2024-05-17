import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './sys-log-errors/lista/lista.component';


const routes: Routes = [
  //{path:'dev-tools', redirectTo:'dev-tools/sys-log-errors',pathMatch:'full'},
  {
    path:'',
    component: ListaComponent,
    loadChildren:()=>import("./sys-log-errors/sys-log-errors.module").then(m=>m.SysLogErrorsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevToolsRoutingModule { }
