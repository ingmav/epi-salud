import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndiceRoutingModule } from './indice-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TemaSubtemaComponent } from './pages/temas/tema-subtema/tema-subtema.component';
import { TemaDialogComponent } from './pages/temas/tema-dialog/tema-dialog.component';
import { SubtemaDialogComponent } from './pages/temas/subtema-dialog/subtema-dialog.component';
import { PaginaComponent } from './pages/temas/pagina/pagina.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PaginaEditComponent } from './pages/temas/pagina-edit/pagina-edit.component';
import { BotonesComponent } from './pages/temas/botones/botones.component';
import { BannersComponent } from './pages/temas/banners/banners.component';
import { BannersDialogComponent } from './pages/temas/banners-dialog/banners-dialog.component';

@NgModule({
  declarations: [TemaSubtemaComponent, TemaDialogComponent, SubtemaDialogComponent, PaginaComponent, PaginaEditComponent, BannersComponent, BannersDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    BotonesComponent,
    IndiceRoutingModule
  ]
})
export class IndiceModule { }
