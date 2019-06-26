import { Component, OnInit } from "@angular/core";
import { Administrator } from "src/app/shared/models/administrator";
import { AdministratorService } from "../../services/administrator.service";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-administrator-list",
  templateUrl: "./administrator-list.component.html",
  styleUrls: ["./administrator-list.component.scss"]
})
export class AdministratorListComponent implements OnInit {
  hideSpinner = false;
  admins: Administrator[];
  displayedColumns: string[] = [
    "Firstname",
    "Lastname",
    "Email",
    "Phone",
    "Username",
    "Active",
    "Action"
  ];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private adminService: AdministratorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAdmins();
  }

  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  getAdmins(): void {
    this.adminService.getAdministrators().subscribe(admin => {
      this.toggleSpinner();
      this.admins = admin;
      this.dataSource = new MatTableDataSource(this.admins);
      console.log(this.admins);
    });
  }
}
