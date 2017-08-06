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
import { Customer } from "./models/customer.model";
import { CustomerService } from "./services/customer.service";
import { Observable } from "rxjs/Rx";
import { fakeAsync } from "@angular/core/testing";
import { tick } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

describe('EditCustomerComponent', () => {
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
                {
                    provide: ActivatedRoute,
                    useValue:
                    {
                        snapshot: {
                            params: { id: 111 }
                        }
                    }
                }, { provide: CustomerService }
            ]
        }).compileComponents();
    }));

    let component: EditCustomerComponent;
    let fixture: ComponentFixture<EditCustomerComponent>;

    let testCustomer = new Customer(111, 'a', 'b', new Date(1900, 1, 1), "m", new Date(2000, 1, 1), 1.01)

    let customerService;

    let spy1;

    beforeEach(() => {
        fixture = TestBed.createComponent(EditCustomerComponent);
        component = fixture.componentInstance;

        customerService = fixture.debugElement.injector.get(CustomerService);

        spy1 = spyOn(customerService, 'get')
            .and.returnValue(Observable.of(testCustomer));

        fixture.detectChanges();
    });

    it('should be created', fakeAsync(() => {
        tick();
        expect(component).toBeTruthy();
    }));

    it('should contain label \'Customer ID\'', fakeAsync(() => {
        tick();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('label[for="id"]').textContent).toContain('Customer ID');
    }));

    it('should contain ID of 111', fakeAsync(() => {
        tick();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('input').getAttribute('ng-reflect-model')).toContain('111');
    }));
});
