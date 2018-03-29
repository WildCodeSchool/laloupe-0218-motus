import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotusComponent } from './motus.component';

describe('MotusComponent', () => {
  let component: MotusComponent;
  let fixture: ComponentFixture<MotusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
