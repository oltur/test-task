import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { PageNotFoundComponent }  from './page-not-found.component';
import { MainTableComponent }  from './main-table.component';
import { EditCustomerComponent }  from './edit-customer.component';
import { CustomerNavigationComponent } from "./customer-navigation.component";

const appRoutes: Routes = [
  // { path: 'customers-list', component: MainTableComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'new-customer', component: EditCustomerComponent },
  { path: 'customer-navi/:customerId', component: CustomerNavigationComponent },
  { path: '', component: MainTableComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes) 
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
