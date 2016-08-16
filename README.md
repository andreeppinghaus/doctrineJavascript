# doctrineJavascript
Métodos em javascript para emular as funcionalidades do Doctrine. Facilita o trabalho com SqlLite no cordova.

Exemplo de uso.

1) Inclua a funcao no index.html
<script src="js/doctrineJavascript.js"></script>

2) crie um servico para cada tabela

.service('UsuarioService', function() {
	campos={'codigo': 'integer', 'nome':'text', 'data':'data'};
	return new DoctrineJavascript('usuario', campos, 'codigo');
    
})

onde:
/**
	 * tabela = nome da tabela
	 * campos = estrutura dos campos da tabela
	 * campos={'codigo': 'integer', 'nome':'text', 'data':'data'};
	 * id = chave primária
	 * 'codigo'
	 */

No Controlador:

.controller('AdoptDetailCtrl', function($scope, $stateParams, 
		UsuarioService, NotasService
		) {

  //Criacao do objeto
	  var usuario = UsuarioService;
//dados para insercao no banco sem a chave primaria insere	  
	  dados = { "nome":'andre', "data":"2016/08/01"};
	  usuario.save(dados);
	  
	//dados para alteracao no banco basta colocar a chave primaria   
	  dados = {'codigo': 2, "nome":'andre', "data":"2016/08/01"};
	  usuario.save(dados);

	  });
	  
	  
	  Resultado no console.log()
	  insert into usuario (nome,data)  values('andre','2016/08/01')
	  update usuario set nome='andre',data='2016/08/01' where codigo=2
	  
	  
