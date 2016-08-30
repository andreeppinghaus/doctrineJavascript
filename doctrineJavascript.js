function DoctrineJavascript (tabela,campos, id){
	/**
	 * Esta classe foi preparada para funcionar com sqlite
	 * tabela = nome da tabela
	 * campos = estrutura dos campos da tabela
	 * campos={'codigo': 'integer', 'nome':'text', 'data':'data'};
	 * id = chave primária
	 * 'codigo'
	 */
	this.campos=campos;
	this.tabela = tabela;
	this.id = id;
	
	this.hydrator = function(dados) {
		var campos = this.campos;
		var montasql=[];
		for (var i in campos) {
			// console.log(i, campos[i], dados[i]);
			 montasql[i] = dados[i];
//	    		 if (campos[i]=='integer') {
//	    			 montasql.push( "{ "+i+": "+dados[i]+"}");
//	    		 }
//	    		 if (campos[i]=='text') {
//	    			 montasql.push( " "+i+"= '"+dados[i]+"'");
//	    		 }
			 //this.obj[campos[i]] = dados[campos[i]];
			// console.log( this.obj[campos[i]] );
		 }
		this.obj = montasql;
		//console.log(this.obj);
	  },
	  
//	  this.getAll = function() {
//		var obj = this.campos;
//		for (var i in obj) {
//			console.log(i,obj[i]);
//		}
//		
//	  },

	  this.insert = function() {
		var obj = this.obj;
		var sql='', sql2='';
		var campos = this.campos;
		var variaveis='';
		var dado=0;
		for (var i in obj) {
			//	console.log(i,obj[i], typeof dado);
			if (typeof obj[i] === 'number') {
				sql+= obj[i]+',';	
				variaveis+=i+',';
			}else if ( obj[i] != undefined) {
				sql+= "'"+obj[i]+"',";
				variaveis+=i+',';
			}
			
		}
		//sql = sql.slice((sql.length-1), 1);
		variaveis = variaveis.slice(0,(variaveis.length-1));
		
		sql2 = 'insert into ';
		sql2 += this.tabela;
		sql2 += ' ('+variaveis+') ';
		sql2 +=' values('+sql.slice(0,(sql.length-1))+')';
		console.log(sql2);
		return sql2;
	  },

	  this.update = function() {
		var obj = this.obj;
		var sql='', where='';
		for (var i in obj) {
			//console.log(i,obj[i]);
			if (this.id==i) {
				where = i+'='+obj[i];
			}else {
				if (typeof obj[i] === 'number') {
	    			sql+= i+'='+obj[i]+',';
				}else if ( obj[i] != undefined) {
	    			sql+= i+"='"+obj[i]+"',";
	    		}
				
			}
		}
		//sql = sql.slice((sql.length-1), 1);
		sql = 'update '+this.tabela+' set '+sql.slice(0,(sql.length-1));
		sql += ' where '+where;
		console.log(sql);
		return sql;
		
	  }

	  this.remove = function() {
		var obj = this.obj;
		var sql='', where='';
		for (var i in obj) {
			//console.log(i,obj[i]);
			if (this.id==i) {
				where = i+'='+obj[i];
			}
		}
		//sql = sql.slice((sql.length-1), 1);
		sql = 'delete '+this.tabela;
		sql += ' where '+where;
		console.log(sql);
		return sql;
	  },
	  
	  this.save = function(dados) {
		this.hydrator(dados);
		var obj = this.obj;
		var insere=0, sql;
		for (var i in obj) {
			//console.log(i,obj[i]);
			if (this.id==i && obj[i] == undefined) {
				insere=1;
			}
		}
		
		if(insere==1) {
			sql = this.insert();
		}else {
			sql = this.update();
		}
		return sql;
	  },
	  
	  this.create = function() {
			var obj = this.campos;
			var ddl='', sql='';
			for (var i in obj) {
			//	console.log(i,obj[i]);
				if (this.id==i) {
					ddl+= i+' integer primary key,';
				}else if ( obj[i] != undefined) {
		    			ddl+= i+" "+obj[i]+",";
				}
			}
			ddl = ddl.slice(0,  (ddl.length-1));
			sql = 'CREATE TABLE IF NOT EXISTS '+this.tabela+' ('+ddl+')';

			console.log(sql);
			return sql;
		  },
		  
		  this.remove = function() {
				var  sql='';
				sql = 'DROP TABLE IF EXISTS '+this.tabela;
				console.log(sql);
				return sql;
			  },

		  this.getTabela = function() {
				return this.tabela;
		  },
		  
		  this.getId = function() {
				return this.id;
		  },
		  
		  this.getCampos = function() {
				return this.campos;
		  },
		  
		  this.getAll = function(id) {
			  var where='';
			  if (id != null){
				  where = ' where '+ this.getId()+' = '+id;
			  }
			  
			  var sql = {"sql": 'select * from '+this.tabela+where+' order by 1',
					   "campos": this.campos};
			//				var sql = 'select * from '+this.tabela+' order by 1';
			//				console.log(sql);
			return sql;
		  },
		  
		  this.retornaAll = function(objeto, results) {
			  var retorno = [], montaobjeto='';
			  //console.log('total de linhas'+results.rows.length);
 			  for (var i = 0;i<results.rows.length;i++){
 				  montaobjeto ="{"; //tem que zerar a variavel
              	//console.log(objeto.campos);
 				  for (var campo in objeto.campos) {
 					  montaobjeto += '"'+campo +'":"'+results.rows.item(i)[campo]+'",';	
 				  }//fim for
 				 montaobjeto = montaobjeto.slice(0,(montaobjeto.length-1));
              	montaobjeto +="}";

              	//console.log('aqui'+montaobjeto+'<--');
              	retorno.push(JSON.parse(montaobjeto));
              //	console.log(results.rows.item(i).codigo+'-'+results.rows.item(i).nome);
              	
              }//fim for
 			  
 			  //se existe where enato retorna somente a posicao zero
 			  if ( where.length > 0 ){
 				  return retorno[0];
 			  }else {
 				 return retorno;  
 			  }
 			  
		  },

		  this.vazio = function(objeto) {
			  var retorno = [], montaobjeto='';
			  //console.log('total de linhas'+results.rows.length);
 				  montaobjeto ="{"; //tem que zerar a variavel
              	//console.log(objeto.campos);
 				  for (var campo in objeto.campos) {
 					  montaobjeto += '"'+campo +'":"lista vazia",';	
 				  }//fim for
 				 montaobjeto = montaobjeto.slice(0,(montaobjeto.length-1));
              	montaobjeto +="}";

              	//console.log('aqui'+montaobjeto+'<--');
              	retorno.push(JSON.parse(montaobjeto));
              //	console.log(results.rows.item(i).codigo+'-'+results.rows.item(i).nome);
              	
 			  return retorno;
		  }


}//fim doctrine


