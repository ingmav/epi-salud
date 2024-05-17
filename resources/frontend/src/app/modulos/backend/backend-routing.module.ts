import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppsListModule } from 'src/app/apps-list/apps-list.module';

const routes: Routes = [
  {
    path:'hubs',
    loadChildren:()=>import("../../apps-list/apps-list.module").then(m=>m.AppsListModule)
  },
  {
    path:'control-acceso',
    loadChildren:()=>import("../control-acceso/control-acceso.module").then(m=>m.ControlAccesoModule)
  },
  {
    path:'indice',
    loadChildren:()=>import("../indice/indice.module").then(m=>m.IndiceModule)
  },
  {
    path:'dev-tools',
    loadChildren:()=>import("../../dev-tools/dev-tools.module").then(m=>m.DevToolsModule)
  },
  {
    path:'**',
    redirectTo:'hubs'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
