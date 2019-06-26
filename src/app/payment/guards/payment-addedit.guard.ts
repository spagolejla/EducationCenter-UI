import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate
} from "@angular/router";
import { Observable } from "rxjs";
import { PaymentAddEditComponent } from "../components/payment-add-edit/payment-add-edit.component";

@Injectable({
  providedIn: "root"
})
export class PaymentAddeditGuard
  implements CanDeactivate<PaymentAddEditComponent> {
  canDeactivate(
    component: PaymentAddEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

        return component.canDeactivate();

  }
}
