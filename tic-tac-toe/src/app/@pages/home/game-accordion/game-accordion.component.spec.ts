import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAccordionComponent } from './game-accordion.component';

describe('GameAccordionComponent', () => {
  let component: GameAccordionComponent;
  let fixture: ComponentFixture<GameAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
