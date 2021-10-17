import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyUrlComponent } from './tiny-url.component';

describe('TinyUrlComponent', () => {
  let component: TinyUrlComponent;
  let fixture: ComponentFixture<TinyUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinyUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
