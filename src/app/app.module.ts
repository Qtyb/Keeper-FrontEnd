import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ThingsComponent } from './things/things.component';
import { ThingDetailComponent } from './thingDetail/thingDetail.component';
import { PlacesComponent } from './places/places.component';
import { PlaceDetailComponent } from './placeDetail/placeDetail.component';
import { CameraComponent } from './camera/camera.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [		
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ThingsComponent,
    PlacesComponent,
    CameraComponent,
    LoginComponent,
    RegisterComponent,
    ThingDetailComponent,
    PlaceDetailComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [NgxSpinnerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
