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

  public customer: Customer;

  ngOnInit() {
    var customerId = this.route.snapshot.params['id'];
    if (!customerId) {
      this.customerService.getNew().subscribe(
        newCustomer =>
          this.customer = newCustomer
      );
    }
    else {
      this.customerService.get(customerId).subscribe(
        customer =>
          this.customer = customer);
    }
  }

  private doCancel() {
    this.router.navigate(['/']);
  }

  private doSave() {
    this.customerService.save(this.customer)
      .subscribe(x => this.router.navigate(['/']));
  }
}
