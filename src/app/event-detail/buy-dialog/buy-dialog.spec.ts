import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyDialog } from './buy-dialog';

describe('BuyDialog', () => {
  let component: BuyDialog;
  let fixture: ComponentFixture<BuyDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
