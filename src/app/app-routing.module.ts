import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Route[] = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule'
  },
  {
    path: 'payment',
    loadChildren: './payment/payment.module#PaymentModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
