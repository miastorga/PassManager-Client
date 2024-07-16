import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeBoxComponent } from './safe-box.component';

describe('SafeBoxComponent', () => {
  let component: SafeBoxComponent;
  let fixture: ComponentFixture<SafeBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
