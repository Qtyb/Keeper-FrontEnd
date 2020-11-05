import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { CameraComponent } from './camera/camera.component';
import { HomeComponent } from './home/home.component';
import { ThingsComponent } from './things/things.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'things', component: ThingsComponent },
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