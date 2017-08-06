import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { APP_BASE_HREF } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';

import { MainTableComponent } from './main-table.component';
import { EditCustomerComponent } from "./edit-customer.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { CustomerNavigationComponent } from "./customer-navigation.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { tick } from "@angular/core/testing";
import { fakeAsync } from "@angular/core/testing";
import { CustomerService } from "./services/customer.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Customer } from "./models/customer.model";

describe('MainTableComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainTableComponent,
        EditCustomerComponent,
        PageNotFoundComponent,
        CustomerNavigationComponent
      ],
      imports: [
        DataTablesModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: CustomerService },
      ]
    }).compileComponents();
  }));

  let component: MainTableComponent;
  let fixture: ComponentFixture<MainTableComponent>;

  let testCustomers = [
    new Customer(111, 'a', 'b', new Date(1900, 1, 1), "m", new Date(2000, 1, 1), 1.01),
    new Customer(999, 'c', 'd', new Date(1901, 1, 1), "m", new Date(2001, 1, 1), 1000000.01)
  ];

  let customerService;

  let spy1;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTableComponent);
    component = fixture.componentInstance;

    customerService = fixture.debugElement.injector.get(CustomerService);

    spy1 = spyOn(customerService, 'getCustomers')
      .and.returnValue(Observable.of(testCustomers));

    fixture.detectChanges();
  });

  it('should be created', fakeAsync(() => {
    tick();
    expect(component).toBeTruthy();
  }));

  it('should contain First Name column', fakeAsync(() => {
    tick();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('th').textContent).toContain('First name');
  }));

  it('should contain \'a\' value', fakeAsync(() => {
    tick();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('td').textContent).toContain('a');
  }));
});
