import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {  SupabaseClient } from '@supabase/supabase-js';
import { CurrentyearComponent } from './currentyear/currentyear.component';
import {HttpClientModule} from '@angular/common/http'
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent,SignupComponent,LoginComponent,CurrentyearComponent,DashboardComponent],
  imports: [BrowserModule, IonicModule.forRoot(),ToastrModule.forRoot(), AppRoutingModule,FormsModule,HttpClientModule],
  providers: [{ provide: SupabaseClient, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
