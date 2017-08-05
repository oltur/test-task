import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from "./services/customer.service";

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

  private customerId: number;

  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
  }

}
