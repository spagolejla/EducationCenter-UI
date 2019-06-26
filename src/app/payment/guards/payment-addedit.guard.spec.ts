import { TestBed, async, inject } from '@angular/core/testing';

import { PaymentAddeditGuard } from './payment-addedit.guard';

describe('PaymentAddeditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentAddeditGuard]
    });
  });

  it('should ...', inject([PaymentAddeditGuard], (guard: PaymentAddeditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
