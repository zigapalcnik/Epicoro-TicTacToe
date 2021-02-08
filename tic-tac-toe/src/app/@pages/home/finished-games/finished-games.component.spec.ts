import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedGamesComponent } from './finished-games.component';

describe('FinishedGamesComponent', () => {
  let component: FinishedGamesComponent;
  let fixture: ComponentFixture<FinishedGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
