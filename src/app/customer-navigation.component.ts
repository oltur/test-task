import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { DataTableDirective } from "angular-datatables";
import { Subject } from "angular-datatables/node_modules/rxjs/Subject";

import { CustomerService } from "./services/customer.service";
import { CustomerNavigation } from "./models/customer-navigation.model";
import { Customer } from "./models/customer.model";

@Component({
  selector: 'app-customer-navigation',
  templateUrl: './customer-navigation.component.html',
  styleUrls: ['./customer-navigation.component.css'],
  providers: [CustomerService]
})
export class CustomerNavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any = {};
  dtTrigger = new Subject();

  public customer: Customer;
  public customerNavigations: CustomerNavigation[];

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      columnDefs: [
        { "width": "200px", "targets": 1 }
      ],
      "order": [[1, "asc"]],
    };

    var customerId = this.route.snapshot.params['customerId'] ? this.route.snapshot.params['customerId'] : 2;

    this.customerService.get(customerId).subscribe(customer => this.customer = customer);

    this.customerService.getCustomerNavigationsByCustomerId(customerId).subscribe(customerNavigations => {
      this.customerNavigations = customerNavigations
      this.dtTrigger.next();
    });

  }

  public doBackToOverview() {
    this.router.navigate(['/']);
  }

}
