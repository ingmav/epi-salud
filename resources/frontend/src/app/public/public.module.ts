import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { getEspPaginatorIntl } from 'src/app/esp-paginator-intl';

import { PublicRoutingModule } from './public-routing.module';
import { RegistroDonadorComponent } from './registro-donador/registro-donador.component';
import { InfoQrDonanteComponent } from './info-qr-donante/info-qr-donante.component';
import { ListaDonadoresComponent } from './lista-donadores/lista-donadores.component';



@NgModule({
    declarations: [
        RegistroDonadorComponent,
        InfoQrDonanteComponent,
        ListaDonadoresComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatNativeDateModule,
        MatDatepickerModule,
        PublicRoutingModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
        { provide: MatPaginatorIntl, useValue: getEspPaginatorIntl() }
    ]
})
export class PublicModule { }
