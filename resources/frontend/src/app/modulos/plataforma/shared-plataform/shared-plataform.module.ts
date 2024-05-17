import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { HeadBarComponent } from './components/head-bar/head-bar.component';
import { DinamicBarComponent } from './components/dinamic-bar/dinamic-bar.component';
import { LogoBarComponent } from './components/logo-bar/logo-bar.component';
import { InformationBarComponent } from './components/information-bar/information-bar.component';
import { FoorBarComponent } from './components/foor-bar/foor-bar.component';



@NgModule({
  declarations: [
    HeadBarComponent,
    DinamicBarComponent,
    LogoBarComponent,
    InformationBarComponent,
    FoorBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule,
    HeadBarComponent,
    DinamicBarComponent,
    LogoBarComponent,
    InformationBarComponent,
    FoorBarComponent
  ]
})
export class SharedPlataformModule { }
