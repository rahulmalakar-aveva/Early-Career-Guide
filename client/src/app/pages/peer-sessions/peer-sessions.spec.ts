import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerSessionsComponent } from './peer-sessions';

describe('PeerSessions', () => {
  let component: PeerSessionsComponent;
  let fixture: ComponentFixture<PeerSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeerSessionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeerSessionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
