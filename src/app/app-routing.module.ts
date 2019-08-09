import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';

const routes: Route[] = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard]},
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule'
  },
  {
    path: 'payment',
    loadChildren: './payment/payment.module#PaymentModule'
  },
  {
    path: 'educator',
    loadChildren: './educator/educator.module#EducatorModule'
  },
  {
    path: 'administrator',
    loadChildren: './administrator/administrator.module#AdministratorModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'notification',
    loadChildren: './notification/notification.module#NotificationModule'
  },
  {
    path: 'course',
    loadChildren: './course/course.module#CourseModule'
  },
  {
    path: 'competition',
    loadChildren: './competition/competition.module#CompetitionModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
