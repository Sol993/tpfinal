import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorrolesComponent } from './selectorroles.component';

describe('SelectorrolesComponent', () => {
  let component: SelectorrolesComponent;
  let fixture: ComponentFixture<SelectorrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorrolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
