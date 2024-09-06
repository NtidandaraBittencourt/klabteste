import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasComponent } from './vendas.component';

describe('VendasComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendasComponent], 
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(VendasComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
