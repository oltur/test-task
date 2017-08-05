import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { CustomerService } from "./services/customer.service";
import { Customer } from "./models/customer.model";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  providers: [
    CustomerService,
    FormsModule
  ]
})
export class EditCustomerComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  private customer: Customer;

  ngOnInit() {
    var customerId = this.route.snapshot.params['id'];
    if (!customerId) {
      this.customer = this.customerService.create();
    }
    else {
      this.customer = this.customerService.get(customerId);
    }
  }

}
