import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogueComponent } from './analogue.component';

describe('AnalogueComponent', () => {
  let component: AnalogueComponent;
  let fixture: ComponentFixture<AnalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
