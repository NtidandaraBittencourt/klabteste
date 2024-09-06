import { Component, ViewChild, inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TabelaComponentComponent } from '../../shared/tabela-component/tabela-component.component';
import { LoadingComponentComponent } from '../../shared/loading-component/loading-component.component';

export interface Produto {
  id: number;
  nome: string;
  quantidades: number;
  defeitos: number;
  preco: string;
  quantidadeDisponivel: number;
}

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [CommonModule, TabelaComponentComponent, LoadingComponentComponent],
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss'],
})

export class ProdutosListComponent {
  loading: boolean = true;
  isErroTabela: boolean = false;
  errorMessage: string = '';
  data: Produto[] = [];
  columns: any[] = [];

  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.httpClient.get<Produto[]>('produtos').subscribe(
      (response) => {
        this.data = response;
        this.loading = false;
        this.isErroTabela = false
        this.columns = this.determineColumns(response);
      },
      (error) => {
        console.error('Erro ao carregar dados:', error);
        this.isErroTabela = true
        this.loading = false;
        this.errorMessage = this.getErrorMessage(error);
      }
    );
  }

  determineColumns(data: Produto[]): any[] {
    return [
      { title: 'Nome  do produto', key: 'nome' },
      { title: 'Quantidade total', key: 'quantidades' },
      { title: 'Quantidade defeito', key: 'defeitos' },
      { title: 'Preço', key: 'preco' },
      { title: 'Quantidade disponível para venda', key: 'quantidadeDisponivel' }
    ];
  }

  getErrorMessage(error: any): string {
    if (error.status === 404) {
      return 'Os dados solicitados não foram encontrados. Por favor, verifique o link ou tente novamente mais tarde.';
    } else if (error.status === 500) {
      return 'Houve um erro no servidor. Por favor, tente novamente mais tarde.';
    } else {
      return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
    }
  }
}


