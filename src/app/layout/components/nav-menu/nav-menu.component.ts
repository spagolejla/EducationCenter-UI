import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/authentication.service";
import { User } from "src/app/shared/models/user";
import { Router } from "@angular/router";
import { LayoutService } from "../../services/layout.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.scss"]
})
export class NavMenuComponent implements OnInit {
  currentUser: User;
  isAdmin: boolean;
  isEducator: boolean;
  isStudent: boolean;
  constructor(
    private router: Router,
    private authService: AuthService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser.accountType === "Administrator") {
      this.isAdmin = true;
    } else if (this.currentUser.accountType === "Educator") {
      this.isEducator = true;
    } else {
      this.isStudent = true;
    }
  }
}
