import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/authentication.service";
import { User } from "src/app/shared/models/user";
import { LayoutService } from '../../services/layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"]
})
export class UserMenuComponent implements OnInit {
  currentUser: User;
  constructor(private router: Router, private authService: AuthService, private layoutService: LayoutService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }
  getCurrentUser() {
    this.authService.getCurrentUser2().subscribe(
      cu => {this.currentUser = cu}
    );
  }
  show() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  logout() {
    this.authService.logout();
    localStorage.removeItem('currentUser');
    this.layoutService.closeUserMenu();
    this.layoutService.closeNavMenu();

  }
}
