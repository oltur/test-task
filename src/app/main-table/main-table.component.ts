import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../services/customer.service";
import { Subject } from "angular-datatables/node_modules/rxjs/Subject";
import { Customer } from "../models/customer.model";

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css'],
  providers: [CustomerService]
})
export class MainTableComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  customers: Customer[];

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {

    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      this.dtTrigger.next();
    });

    // this.customerService.getCustomerNavigations().subscribe(data => {
    //   //tbd
    // });

    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
