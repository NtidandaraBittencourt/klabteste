import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProdutosListComponent } from './produtos-list.component';
import { TabelaComponentComponent } from '../../shared/tabela-component/tabela-component.component';
import { LoadingComponentComponent } from '../../shared/loading-component/loading-component.component';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('ProdutosListComponent', () => {
  let component: ProdutosListComponent;
  let fixture: ComponentFixture<ProdutosListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ProdutosListComponent,],
      providers: [
        { provide: TabelaComponentComponent, useValue: {} },
        { provide: LoadingComponentComponent, useValue: {} }
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading true', () => {
    expect(component.loading).toBeTrue();
  });

  it('should fetch data successfully', () => {
    const mockData = [
      { id: 1, nome: 'Produto 1', quantidades: 10, defeitos: 1, preco: 'R$ 10,00', quantidadeDisponivel: 9 }
    ];

    component.fetchData();
    const req = httpMock.expectOne('produtos');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(component.data).toEqual(mockData);
    expect(component.loading).toBeFalse();
    expect(component.isErroTabela).toBeFalse();
    expect(component.columns).toEqual(['nome', 'quantidades', 'defeitos', 'preco', 'quantidadeDisponivel']);
  });

  it('should handle error on fetch data', () => {
    const mockError = { status: 404, statusText: 'Not Found' };

    component.fetchData();
    const req = httpMock.expectOne('produtos');
    req.flush('Error', mockError);

    expect(component.loading).toBeFalse();
    expect(component.isErroTabela).toBeTrue();
    expect(component.errorMessage).toBe('Os dados solicitados não foram encontrados. Por favor, verifique o link ou tente novamente mais tarde.');
  });

  it('should determine columns correctly', () => {
    const mockData = [
      { id: 1, nome: 'Produto 1', quantidades: 10, defeitos: 1, preco: 'R$ 10,00', quantidadeDisponivel: 9 }
    ];

    const columns = component.determineColumns(mockData);

    expect(columns).toEqual([
      { title: 'Nome  do produto', key: 'nome' },
      { title: 'Quantidade total', key: 'quantidades' },
      { title: 'Quantidade defeito', key: 'defeitos' },
      { title: 'Preço', key: 'preco' },
      { title: 'Quantidade disponível para venda', key: 'quantidadeDisponivel' }
    ]);
  });

  it('should return correct error messages', () => {
    expect(component.getErrorMessage({ status: 404 })).toBe('Os dados solicitados não foram encontrados. Por favor, verifique o link ou tente novamente mais tarde.');
    expect(component.getErrorMessage({ status: 500 })).toBe('Houve um erro no servidor. Por favor, tente novamente mais tarde.');
    expect(component.getErrorMessage({ status: 123 })).toBe('Ocorreu um erro inesperado. Tente novamente mais tarde.');
  });
});
