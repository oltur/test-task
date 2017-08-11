import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { AlertModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainTableComponent } from './main-table.component';
import { EditCustomerComponent } from './edit-customer.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CustomerNavigationComponent } from './customer-navigation.component';
import { SandboxComponent } from './sandbox.component';

@NgModule({
  declarations: [
    AppComponent,
    MainTableComponent,
    EditCustomerComponent,
    PageNotFoundComponent,
    CustomerNavigationComponent,
    SandboxComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    //AlertModule.forRoot(),

    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
