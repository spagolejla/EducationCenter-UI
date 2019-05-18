import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from 'src/app/config/config';
import { Payment } from 'src/app/shared/models/payment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AddPayment } from 'src/app/shared/models/addPayment';
import { EditPayment } from 'src/app/shared/models/editPayment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private pathAPI = this.config.setting['PathAPI'] ;
  constructor(private http: HttpClient, private config: AppConfig) { }

  getPayments() {
    return this.http.get<Payment[]>(this.pathAPI + 'api/payments').pipe(
      catchError(this.handleError)
    );
  }

  getPaymentById(id: number): Observable<EditPayment> {
    return this.http.get<EditPayment>(this.pathAPI + `api/payments/${id}`);
  }

  addPayment(payment: AddPayment) {
     return this.http.post<AddPayment>(this.pathAPI + 'api/payment', payment).pipe(
      catchError(this.handleError)
     );
  }

  updatePayment(payment: EditPayment) {
    return this.http.post<AddPayment>(this.pathAPI + 'api/payment', payment).pipe(
     catchError(this.handleError)
    );
 }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
