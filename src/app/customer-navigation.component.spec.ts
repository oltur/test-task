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
import { ActivatedRoute, Params } from "@angular/router";
import { Subject } from "rxjs/Subject";
import { tick } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';
import { fakeAsync } from "@angular/core/testing";
import { CustomerService } from "./services/customer.service";
import { CustomerNavigation } from "./models/customer-navigation.model";
import { Customer } from "./models/customer.model";

describe('CustomerNavigationComponent', () => {

  let params: Subject<Params>;

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
        // ,RouterTestingModule.withRoutes([
        //   { path: '/customer-navi/:customerId', component: CustomerNavigationComponent }
        //])
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: ActivatedRoute,
          useValue:
          {
            snapshot: {
              params: { customerId: 2 }
            }
          }
        },
        { provide: CustomerService },
      ]
    }).compileComponents();
  }));

  let component: CustomerNavigationComponent;
  let fixture: ComponentFixture<CustomerNavigationComponent>;

  let testCustomer = new Customer(111, 'a', 'b', new Date(1900, 1, 1), "m", new Date(2000, 1, 1), 1.01)

  let testCustomerNavigations = [
    new CustomerNavigation(testCustomer, 111, "A", new Date(2000, 1, 1)),
    new CustomerNavigation(testCustomer, 111, "B", new Date(2001, 1, 1))
  ];

  let customerService;

  let spy1;
  let spy2;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNavigationComponent);
    component = fixture.componentInstance;

    customerService = fixture.debugElement.injector.get(CustomerService);

    spy1 = spyOn(customerService, 'get')
      .and.returnValue(Observable.of(testCustomer));

    spy2 = spyOn(customerService, 'getCustomerNavigationsByCustomerId')
      .and.returnValue(Observable.of(testCustomerNavigations));

    fixture.detectChanges();
  });

  it('should be created', fakeAsync(() => {
    tick();
    expect(component).toBeTruthy();
  }));

  it('should contain Page column', fakeAsync(() => {
    tick();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('th').textContent).toContain('Page');
  }));

  it('should contain \'A\' value', fakeAsync(() => {
    tick();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('td').textContent).toContain('A');
  }));
});

