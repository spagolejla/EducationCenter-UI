import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from 'src/app/shared/services/authentication.service';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private layoutService: LayoutService, private authService: AuthService, private _service: DataService) { }

  ngOnInit() {
    this._service.initUser();
  }

  toggleNavMenu() {
    this.layoutService.navMenuToggle();
  }

  openUserMenu() {
    this.layoutService.openUserMenu();
  }
}
