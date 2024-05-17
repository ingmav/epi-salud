import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../plataforma/pages/index/index.component';
import { PaginaDefaultComponent } from './pages/pagina-default/pagina-default.component';

const routes: Routes = [
  {
    path: 'page/:directorio/:subtema',
    component: PaginaDefaultComponent
  },
  {
    path:'',
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformaRoutingModule { }
