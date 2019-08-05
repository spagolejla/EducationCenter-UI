import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {LayoutModule} from './layout/layout.module';
import { MaterialDesignModule } from './shared/material-design/material-design.module';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from './notification/notification.module';
import { UsernameValidator } from './shared/helpers/username';
import { ProfileComponent } from './shared/components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotificationModule
  ],
  providers: [
    UsernameValidator,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
