import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosListComponent } from './produtos-list.component';

describe('ProdutosListComponent', () => {
  let component: ProdutosListComponent;
  let fixture: ComponentFixture<ProdutosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { ProdutosListComponent } from './produtos-list.component';
// import { TabelaComponentComponent } from '../../shared/tabela-component/tabela-component.component';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { Produto } from './produtos-list.component';

// describe('ProdutosListComponent', () => {
//   let component: ProdutosListComponent;
//   let fixture: ComponentFixture<ProdutosListComponent>;
//   let httpMock: HttpTestingController;

//   const mockProdutos: Produto[] = [
//     { id: 1, nome: 'Produto A', quantidades: 10, defeitos: 0, preco: 'R$10,00', quantidadeDisponivel: 10 },
//     { id: 2, nome: 'Produto B', quantidades: 5, defeitos: 1, preco: 'R$20,00', quantidadeDisponivel: 4 },
//   ];

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule], // Módulo de testes HTTP
//       declarations: [ProdutosListComponent, TabelaComponentComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ProdutosListComponent);
//     component = fixture.componentInstance;
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   it('deve criar o componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('deve buscar e preencher os dados dos produtos', () => {
//     fixture.detectChanges(); // Trigger lifecycle methods como ngOnInit

//     // Simulando a requisição HTTP
//     const req = httpMock.expectOne('produtos');
//     expect(req.request.method).toBe('GET');
//     req.flush(mockProdutos); // Retorna os dados simulados

//     // Verificando se os dados foram atribuídos corretamente
//     expect(component.data.length).toBe(2);
//     expect(component.data).toEqual(mockProdutos);

//     httpMock.verify(); // Verifica se não há requisições pendentes
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });
// });
