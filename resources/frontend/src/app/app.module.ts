import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from '@coreui/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';

import { SharedService } from './shared/shared.service';
import { TokenInterceptor, ErrorInterceptor } from './token.service';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MAT_DATE_LOCALE } from '@angular/material/core';

//Para el Lenguaje de las Fechas
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/es-MX';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


registerLocaleData(locale);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AlertModule,
    NgbModule
  ],
  providers: [
    AuthService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-MX'
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    },
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
