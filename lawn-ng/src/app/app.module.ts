import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { AuthServiceService } from './services/auth-service.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AddressService } from './services/address.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LawnComponent } from './lawn/lawn.component';
import { ChartsModule } from 'ng2-charts';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { AddComponent } from './add/add.component';
import { LawnService } from './services/lawn.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LawnComponent,
    AddComponent,
    HeaderComponent
  ],
  imports: [
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBfZuebKAQlVtruGr8j3eYpOpeOg7kim2Y'}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    FormsModule
    ],
  providers: [
    AddressService,
    AuthGuardService,
    AuthServiceService,
    LawnService,
    ProcessHttpmsgService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
