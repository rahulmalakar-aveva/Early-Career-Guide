import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaComponent } from './qna.component';

describe('Qna', () => {
  let component: QnaComponent;
  let fixture: ComponentFixture<QnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QnaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QnaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
