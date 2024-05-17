import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalComponent } from './pages/principal/principal.component';
import { PlataformaRoutingModule } from './plataforma-routing.module';
import { SharedPlataformModule } from './shared-plataform/shared-plataform.module';
import { IndexComponent } from '../plataforma/pages/index/index.component';
import { PaginaDefaultComponent } from './pages/pagina-default/pagina-default.component';

@NgModule({
  declarations: [PrincipalComponent, IndexComponent, PaginaDefaultComponent],
  imports: [
    CommonModule,
    PlataformaRoutingModule,
    SharedPlataformModule
  ]
})
export class PlataformaModule { }
