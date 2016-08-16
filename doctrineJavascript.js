function DoctrineJavascript (tabela,campos, id){
	/**
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
	  
	  this.getAll = function() {
		var obj = this.obj;
		for (var i in obj) {
			console.log(i,obj[i]);
		}
	  },

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
	  },
	  
	  this.save = function(dados) {
		this.hydrator(dados);
		var obj = this.obj;
		var insere=0;
		for (var i in obj) {
			//console.log(i,obj[i]);
			if (this.id==i && obj[i] == undefined) {
				insere=1;
			}
		}
		
		if(insere==1) {
			this.insert();
		}else {
			this.update();
		}
		//console.log(insere);
	  }
}