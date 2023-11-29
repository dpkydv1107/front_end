import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CurrentyearComponent } from './currentyear/currentyear.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'currentyear',component:CurrentyearComponent},
  {path:'dashboard',component:DashboardComponent},
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
