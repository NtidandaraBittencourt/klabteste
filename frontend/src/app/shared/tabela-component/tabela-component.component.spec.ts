import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaComponentComponent } from './tabela-component.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';

describe('TabelaComponentComponent', () => {
  let component: TabelaComponentComponent<any>;
  let fixture: ComponentFixture<TabelaComponentComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TabelaComponentComponent, MatTableModule, MatPaginatorModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
