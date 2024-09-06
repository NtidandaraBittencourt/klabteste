package com.example.demo;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.models.ProdutoModel;
import com.example.demo.services.NativeScriptService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.eq;

@SpringBootTest
class DemoApplicationTests {

	@InjectMocks
	private ProdutoModel produtoModel;

	@Mock
	private NativeScriptService nativeScriptService;

	@Mock
	private Connection connection;

	@Mock
	private ResultSet resultSet;

	@Mock
	private PreparedStatement preparedStatement;

	@BeforeEach
	void setUp(){
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void contextLoads() {
	}

	@Test
	void produtoModelBeanIsLoaded() {
		assertThat(produtoModel).isNotNull();
	}

	@Test
	public void testGetAllProducts() throws Exception {

		when(nativeScriptService.getConectionDb()).thenReturn(connection);
		when(nativeScriptService.getPreparedStatementDb(anyString(), eq(connection))).thenReturn(preparedStatement);
		when(preparedStatement.executeQuery()).thenReturn(resultSet);

		when(resultSet.next()).thenReturn(true, false);
		when(resultSet.getObject("id")).thenReturn(1);
		when(resultSet.getObject("nome")).thenReturn("Produto A");
		when(resultSet.getObject("preco")).thenReturn(100.0);
		when(resultSet.getObject("quantidades")).thenReturn(10);
		when(resultSet.getObject("defeitos")).thenReturn(1);

		List<Map<String, Object>> result = (List<Map<String, Object>>) produtoModel.getAllProducts();

		assertNotNull(result);
		assertEquals(1, result.size());

		Map<String, Object> firstProduct = result.get(0);
		assertEquals(1, firstProduct.get("id"));
		assertEquals("Produto A", firstProduct.get("nome"));
		assertEquals(100.0, firstProduct.get("preco"));
		assertEquals(10, firstProduct.get("quantidades"));
		assertEquals(1, firstProduct.get("defeitos"));
		assertEquals(9, firstProduct.get("quantidadeDisponivel"));

		verify(connection).close();
		verify(preparedStatement).close();
	}

}
