import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemaSubtemaComponent } from './pages/temas/tema-subtema/tema-subtema.component';
import { PaginaComponent } from './pages/temas/pagina/pagina.component';
import { PaginaEditComponent } from './pages/temas/pagina-edit/pagina-edit.component';
import { BannersComponent } from './pages/temas/banners/banners.component';

const routes: Routes = [
  {
    path: '',
    component: TemaSubtemaComponent
  },
  {
    path: 'banners',
    component: BannersComponent
  },
  {
    path: 'temas',
    component: TemaSubtemaComponent
  },
  {
    path: 'paginas',
    component: PaginaComponent
  },
  {
    path: 'paginas/:id',
    component: PaginaEditComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndiceRoutingModule { }
