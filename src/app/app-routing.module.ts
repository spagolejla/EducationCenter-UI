import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Route[] = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
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
    loadChildren: './administrator/administrator.module#AdministratorModule'
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
