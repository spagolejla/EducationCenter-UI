import { Component, OnDestroy } from '@angular/core';
import { LayoutService } from './layout/services/layout.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  constructor(private layoutService: LayoutService, router: Router) {
    this.layoutService
      .onUserMenuToggle()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isOpen => (this.userMenuOpen = isOpen));

    this.layoutService
      .onNavMenuToggle()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isOpen => (this.navigationOpen = isOpen));

    this.headerShowed = true;
  }

  closeUserProfile() {
    this.layoutService.closeUserProfile();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
