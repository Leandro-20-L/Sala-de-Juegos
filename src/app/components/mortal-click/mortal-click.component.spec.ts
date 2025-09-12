import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortalClickComponent } from './mortal-click.component';

describe('MortalClickComponent', () => {
  let component: MortalClickComponent;
  let fixture: ComponentFixture<MortalClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortalClickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortalClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
