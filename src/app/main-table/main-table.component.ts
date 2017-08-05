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

  dtOptions: any = {};
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
      pagingType: 'full_numbers',
      columnDefs: [
        { "width": "50px", "targets": [2, 3] },
        { "width": "165px", "targets": 4 }
      ],
      "order": [[1, "asc"]],
      dom: 'Bfrtip',
      buttons: [
        'print',
        {
          text: 'Add New Customer',
          key: '1',
          action: function (e, dt, node, config) {
            this.doAddNew();
          }
        }
      ]
    };
  }

  doAddNew() {
    alert("Add new");
  }

  doEdit(customerId: number) {
    alert(customerId);
  }

  doDelete(customerId: number) {
    alert(customerId);
  }

  doShowNavi(customerId: number) {
    alert(customerId);
  }

}
