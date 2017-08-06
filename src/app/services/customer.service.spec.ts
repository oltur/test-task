import { TestBed, inject } from '@angular/core/testing';

import { CustomerService } from './customer.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { fakeAsync } from "@angular/core/testing";
import { Customer } from "../models/customer.model";
import { HttpTestingController } from "@angular/common/http/testing";

describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService],
      imports: [
        HttpClientTestingModule,
      ],

    });
  });

  it('should be created', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }));

  it('should have initial data with Peter as first user\'s First name', inject([CustomerService], (service: CustomerService) => {
    const http = TestBed.get(HttpTestingController);

    const initData = {
      "customers": [
        {
          "id": 1,
          "firstName": "Peter",
          "lastName": "Smith",
          "birthday": "1996-10-12",
          "gender": "m",
          "lastContactDate": "2013-06-01",
          "lifetimeValue": 191.12
        },
        {
          "id": 2,
          "firstName": "Anna",
          "lastName": "Hopp",
          "birthday": "1987-05-03",
          "gender": "w",
          "lastContactDate": "2013-07-08",
          "lifetimeValue": 50.99
        },
        {
          "id": 3,
          "firstName": "Christian",
          "lastName": "Cox",
          "birthday": "1991-02-21",
          "gender": "m",
          "lastContactDate": "2013-08-01",
          "lifetimeValue": 0
        },
        {
          "id": 4,
          "firstName": "Roxy",
          "lastName": "Fox",
          "birthday": "1979-06-30",
          "gender": "w",
          "lastContactDate": "2012-01-29",
          "lifetimeValue": 213.12
        },
        {
          "id": 5,
          "firstName": "Eric",
          "lastName": "Adam",
          "birthday": "1969-11-21",
          "gender": "m",
          "lastContactDate": "2013-03-18",
          "lifetimeValue": 1019.91
        }
      ],
      "customerNavigations": [
        {
          "customerId": 1,
          "pages": "A",
          "timeStamp": "2013-06-01T10:10:12"
        },
        {
          "customerId": 1,
          "pages": "B",
          "timeStamp": "2013-06-01T10:12:12"
        },
        {
          "customerId": 1,
          "pages": "A",
          "timeStamp": "2013-06-01T10:12:12"
        },
        {
          "customerId": 2,
          "pages": "C",
          "timeStamp": "2013-07-08T09:03:09"
        },
        {
          "customerId": 2,
          "pages": "A",
          "timeStamp": "2013-07-08T09:09:09"
        },
        {
          "customerId": 2,
          "pages": "D",
          "timeStamp": "2013-07-08T09:19:09"
        },
        {
          "customerId": 3,
          "pages": "B",
          "timeStamp": "2013-07-08T09:19:09"
        },
        {
          "customerId": 3,
          "pages": "A",
          "timeStamp": "2013-07-08T09:19:10"
        },
        {
          "customerId": 4,
          "pages": "D",
          "timeStamp": "2013-07-08T09:19:11"
        },
        {
          "customerId": 4,
          "pages": "S",
          "timeStamp": "2013-07-08T09:19:12"
        },
        {
          "customerId": 5,
          "pages": "X",
          "timeStamp": "2013-07-08T09:19:13"
        },
        {
          "customerId": 5,
          "pages": "A",
          "timeStamp": "2013-07-08T09:19:14"
        },
        {
          "customerId": 5,
          "pages": "B",
          "timeStamp": "2013-07-08T09:19:15"
        }
      ]
    };

    let actualCustomers = [];

    service.getCustomers().subscribe((customers: Customer[]) => {
      actualCustomers = customers;
    });

    http.expectOne('/assets/data/initData.json').flush(initData);

    expect(actualCustomers[0].firstName).toEqual("Peter");
  }));

});
