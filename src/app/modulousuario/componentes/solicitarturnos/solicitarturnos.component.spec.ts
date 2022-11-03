import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarturnosComponent } from './solicitarturnos.component';

describe('SolicitarturnosComponent', () => {
  let component: SolicitarturnosComponent;
  let fixture: ComponentFixture<SolicitarturnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarturnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
