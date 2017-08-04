import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTableComponent } from './main-table.component';

import { DataTablesModule } from 'angular-datatables';

describe('MainTableComponent', () => {
  let component: MainTableComponent;
  let fixture: ComponentFixture<MainTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainTableComponent],
      imports: [
        DataTablesModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain ID column', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('th').textContent).toContain('ID');
  });
});
