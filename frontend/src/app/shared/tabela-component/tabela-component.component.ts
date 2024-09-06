import { NgModule, AfterViewInit, Component, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-tabela-component',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './tabela-component.component.html',
  styleUrls: ['./tabela-component.component.scss'],
})

export class TabelaComponentComponent<T> implements AfterViewInit, OnChanges  {
  @Input() columns: string[] = [];
  @Input() data: T[] = [];

  dataSource = new MatTableDataSource<T>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
  }
}
