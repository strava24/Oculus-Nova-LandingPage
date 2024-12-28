import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchingSsonPageComponent } from './launching-sson-page.component';

describe('LaunchingSsonPageComponent', () => {
  let component: LaunchingSsonPageComponent;
  let fixture: ComponentFixture<LaunchingSsonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchingSsonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchingSsonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
