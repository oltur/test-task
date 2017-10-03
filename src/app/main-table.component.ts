import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

import { DataTableDirective } from "angular-datatables";
import { Subject } from "angular-datatables/node_modules/rxjs/Subject";

import { CustomerService } from "./services/customer.service";
import { Customer } from "./models/customer.model";

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css'],
  providers: [CustomerService]
})
export class MainTableComponent implements OnInit {

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) { }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any = {};
  dtTrigger = new Subject();

  public customers: Customer[];

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      columnDefs: [
        { "width": "100px", "targets": [2, 3] },
        { "width": "165px", "targets": 4 }
      ],
      "order": [[1, "asc"]],
    };

    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      this.dtTrigger.next();
    });

  }


  doAddNew() {
    this.router.navigate(['/new-customer']);
  }

  doEdit(customerId: number) {
    this.router.navigate(['/edit-customer', customerId]);
  }

  doDelete(customerId: number) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

      this.customerService.delete(customerId).subscribe(() => {

        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    });
  }

  doShowNavi(customerId: number) {
    this.router.navigate(['/customer-navi', customerId]);
  }

}
