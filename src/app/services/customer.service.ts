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

  private customerNavigationsPropertyNameReplacer(key, value) {
    if (key == "customer") return undefined;
    else return value;
  }

  private fillCustomerNavigations(data) {
    this.customerNavigations = [];
    (data as any[]).forEach((item) => {
      this.customerNavigations.push(
        new CustomerNavigation(
          this.customers.find(c => (c.id == item.customerId)),
          item.customerId,
          item.pages,
          new Date(item.timeStamp)
        )
      );
    });
  }

  loadInitData(): Observable<any> {

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
    return this.loadInitData().map(ok => this.customers);
  }

  public getCustomerNavigations(): Observable<CustomerNavigation[]> {
    return this.loadInitData().map(ok => this.customerNavigations);
  }

  public getCustomerNavigationsByCustomerId(customerId): Observable<CustomerNavigation[]> {
    return this.loadInitData().map(
      ok =>
        this.customerNavigations.filter(
          x =>
            x.customer.id == customerId
        )
    );
  }

  public delete(id) {
    return this.loadInitData().map(ok => {

      // find and delete navis
      for (var i = 0; i < this.customerNavigations.length; i++) {
        var obj2 = this.customerNavigations[i];
        if (obj2.customer.id == id) {
          this.customerNavigations.splice(i, 1);
          i--;
        }
      }

      // find and delete customers
      for (var i = 0; i < this.customers.length; i++) {
        var obj = this.customers[i];
        if (obj.id == id) {
          this.customers.splice(i, 1);
          i--;
        }
      }

      this.saveData();
    });
  }

  public get(id): Observable<Customer> {
    return this.loadInitData().map(ok => {
      for (var i = 0; i < this.customers.length; i++) {
        var obj = this.customers[i];
        if (obj.id == id) {
          return obj;
        }
      }
      return null;
    });
  }

  public getNew(): Observable<Customer> {
    return this.loadInitData().map(ok => {
      var newId = ++this.maxCustomerId;
      var newCustomer = new Customer(newId);

      return newCustomer;
    });
  }

  public save(customer: Customer): Observable<Customer> {
    return this.get(customer.id).map(existing => {
      if (!existing) {
        this.customers.push(customer);
      }
      else {
        existing.copyFrom(customer);
      }
      this.saveData();
      
      return customer;
    });
  }

  private saveData() {
    localStorage.setItem('customers', JSON.stringify(this.customers));
    localStorage.setItem('customerNavigations', JSON.stringify(this.customerNavigations, this.customerNavigationsPropertyNameReplacer));
  }

}
