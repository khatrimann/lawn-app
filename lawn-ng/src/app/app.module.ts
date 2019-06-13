import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { AuthService} from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AddressService } from './services/address.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LawnComponent } from './lawn/lawn.component';
import { ChartsModule } from 'ng2-charts';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { AddComponent } from './add/add.component';
import { LawnService } from './services/lawn.service';
import { HeaderComponent } from './header/header.component';
import { WeatherService } from './services/weather.service';
import { VerifyUserComponent } from './verify-user/verify-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LawnComponent,
    AddComponent,
    HeaderComponent,
    VerifyUserComponent
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
    AuthService,
    LawnService,
    ProcessHttpmsgService,
    WeatherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
