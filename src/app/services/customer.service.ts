import { Injectable } from '@angular/core';

import { Customer } from "../models/customer.model";
import { CustomerNavigation } from "../models/customer-navigation.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {
    var dataCustomers = localStorage.getItem('customers');
    var dataCustomerNavigations = localStorage.getItem('customerNavigations');

    if (dataCustomers) {
      this.fillCustomers(JSON.parse(dataCustomers));
    }
    if (dataCustomerNavigations) {
      this.fillCustomerNavigations(JSON.parse(dataCustomerNavigations));
    }
  }

  private customers: Customer[];
  private customerNavigations: CustomerNavigation[];

  private maxCustomerId: number = 1;

  private fillCustomers(data) {
    this.customers = [];
    (data as any[]).forEach((item) => {
      if (this.maxCustomerId < item.id) {
        this.maxCustomerId = item.id;
      }
      this.customers.push(
        new Customer(
          item.id,
          item.firstName,
          item.lastName,
          new Date(item.birthday),
          item.gender,
          new Date(item.lastContactDate),
          item.lifetimeValue
        )
      );
    });
  }

  private fillCustomerNavigations(data) {
    this.customerNavigations = [];
    (data as any[]).forEach((item) => {
      this.customerNavigations.push(
        new CustomerNavigation(
          this.customers.find(c => (c.id == item.customerId)),
          item.pages,
          new Date(item.timeStamp)
        )
      );
    });
  }

  LoadInitData(): Observable<any> {

    let result = this.http.get('/assets/data/initData.json').map((data: any) => {
      if (this.customers && this.customerNavigations)
        return Observable.create(observer => {
          observer.next("OK");
          observer.complete();
        });

      this.fillCustomers(data.customers);
      this.fillCustomerNavigations(data.customerNavigations);

      this.saveData();

      return "OK";
    });

    return result;
  }

  public getCustomers(): Observable<Customer[]> {
    return this.LoadInitData().map(ok => this.customers);
  }

  public getCustomerNavigations(): Observable<CustomerNavigation[]> {
    return this.LoadInitData().map(ok => this.customerNavigations);
  }

  public delete(id) {
    // find and delete
    for (var i = 0; i < this.customers.length; i++) {
      var obj = this.customers[i];
      if (obj.id == id) {
        this.customers.splice(i, 1);
        i--;
      }
    }

    this.saveData();
  }

  public get(id): Customer {
    // find and delete
    for (var i = 0; i < this.customers.length; i++) {
      var obj = this.customers[i];
      if (obj.id == id) {
        return obj;
      }
    }
    return null;
  }

  public create(): Customer {
    var newId = ++this.maxCustomerId;
    var newCustomer = new Customer(newId);
    this.customers.push(newCustomer);

    this.saveData();

    return newCustomer;
  }

  private saveData() {
    localStorage.setItem('customers', JSON.stringify(this.customers));
    localStorage.setItem('customerNavigations', JSON.stringify(this.customerNavigations));
  }

}
