import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAddeditComponent } from './notification-addedit.component';

describe('NotificationAddeditComponent', () => {
  let component: NotificationAddeditComponent;
  let fixture: ComponentFixture<NotificationAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
