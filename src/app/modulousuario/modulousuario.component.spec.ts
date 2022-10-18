import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulousuarioComponent } from './modulousuario.component';

describe('ModulousuarioComponent', () => {
  let component: ModulousuarioComponent;
  let fixture: ComponentFixture<ModulousuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulousuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
