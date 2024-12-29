import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterBoardComponent } from './letter-board.component';

describe('LetterBoardComponent', () => {
  let component: LetterBoardComponent;
  let fixture: ComponentFixture<LetterBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
