import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, NavMenuComponent, UserMenuComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    RouterModule
  ],
  exports: [HeaderComponent, NavMenuComponent, UserMenuComponent ]
})
export class LayoutModule { }
