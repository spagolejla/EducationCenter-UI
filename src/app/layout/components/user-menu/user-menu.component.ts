import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/authentication.service";
import { User } from "src/app/shared/models/user";
import { LayoutService } from '../../services/layout.service';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"]
})
export class UserMenuComponent implements OnInit {
  currentUser: User;
  constructor(private router: Router, private authService: AuthService, private layoutService: LayoutService, private _service: DataService) {}

  ngOnInit() {
    this._service.initUser();
    this.currentUser = this._service.currentUser;


  }
  getCurrentUser() {
    this.authService.getCurrentUser2().subscribe(
      cu => {this.currentUser = cu}
    );
  }
  showProfile() {
    this.router.navigate(["/profile"]);
    this.layoutService.closeUserMenu();
  }
  logout() {
    this.authService.logout();
    this.authService.logged=false;
    localStorage.removeItem('currentUser');
    this.layoutService.closeUserMenu();
    this.layoutService.closeNavMenu();

  }
}
