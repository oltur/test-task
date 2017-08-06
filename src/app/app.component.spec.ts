import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { APP_BASE_HREF } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';

import { MainTableComponent } from './main-table.component';
import { EditCustomerComponent } from "./edit-customer.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { CustomerNavigationComponent } from "./customer-navigation.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainTableComponent,
        EditCustomerComponent,
        PageNotFoundComponent,
        CustomerNavigationComponent
      ],
      imports: [
        DataTablesModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Test Task for WebTrekk'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Test Task for WebTrekk');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Test Task for WebTrekk');
  }));
});
