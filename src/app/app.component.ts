import { Component, OnDestroy } from '@angular/core';
import { LayoutService } from './layout/services/layout.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/authentication.service';
import { User } from './shared/models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {

  title = 'Education Center';

  onDestroy$ = new Subject();
  userMenuOpen: boolean;
  navigationOpen: boolean;
  headerShowed: boolean;
  currentUser: Observable<User>;


  constructor(private layoutService: LayoutService, router: Router, private authService: AuthService) {
    this.layoutService
      .onUserMenuToggle()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isOpen => (this.userMenuOpen = isOpen));

    this.layoutService
      .onNavMenuToggle()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isOpen => (this.navigationOpen = isOpen));

    // this.authService
    // .onHeaderToggle()
    // .pipe(takeUntil(this.onDestroy$))
    // .subscribe(isOpen => (this.headerShowed = isOpen));

  }

  closeUserProfile() {
    this.layoutService.closeUserProfile();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
