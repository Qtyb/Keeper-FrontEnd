import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { CameraComponent } from './camera/camera.component';
import { HomeComponent } from './home/home.component';
import { ThingsComponent } from './things/things.component';
import { ThingDetailComponent } from './thingDetail/thingDetail.component';
import { PlacesComponent } from './places/places.component';
import { PlaceDetailComponent } from './placeDetail/placeDetail.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'things', component: ThingsComponent },
  { path: 'thing/:id', component: ThingDetailComponent },
  { path: 'thing', component: ThingDetailComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'place/:id', component: PlaceDetailComponent },
  { path: 'place', component: PlaceDetailComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth-callback', component: AuthCallbackComponent  },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }