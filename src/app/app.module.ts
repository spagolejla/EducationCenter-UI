import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {LayoutModule} from './layout/layout.module';
import { MaterialDesignModule } from './shared/material-design/material-design.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialDesignModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
