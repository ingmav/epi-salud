import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendRoutingModule } from './backend-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidenavListComponent } from 'src/app/navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from 'src/app/navigation/header/header.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    BackendRoutingModule,
    SharedModule,
    SidenavListComponent,
    HeaderComponent
  ]
})
export class BackendModule { }
