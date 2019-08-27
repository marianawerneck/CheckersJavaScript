$(function(){
	
	//=====================Board functions=======================
	mboard = [[0,3,0,3,0,3,0,3],
                          [3,0,3,0,3,0,3,0],
                          [0,3,0,3,0,3,0,3],
                          [1,0,1,0,1,0,1,0],
                          [0,1,0,1,0,1,0,1],
                          [2,0,2,0,2,0,2,0],
                          [0,2,0,2,0,2,0,2],
                          [2,0,2,0,2,0,2,0]];
						  
	var selected = 0;
	var selectedPiece = '';
	var player = 3;
	var computer = true;
	
	function copyBoard(board){
		if(board.length <= 0){
			return [];
		}
		var line = [];
		for (var i=0; i<board.length; ++i){
			var column = [];
			for (var k=0; k<board.length; ++k){
				column.push(board[i][k]);
			}
			line.push(column);
		}
		return line;
	}
	
	function printBoard(){
		var light = 1;
		var columns = ['0','1','2','3','4','5','6','7'];
		for (var c = 0; c < columns.length; ++c){
				for (var l = 0; l < 8 ; ++l){
					var sq = columns[c]+l;
					var squareColor = (light == 1) ? 'light' : 'dark';
					$('.board').append('<div class="square '+squareColor+'" id="'+sq+'"></div>');
					light ^= 1;
				}
				
			light ^=1;
		}
	}
						  
	function drawPiece(board){
		
		$('div').remove('.piece');
						  
		for (var i = 0; i < 8; ++i){
			for (var  k= 0; k < 8; ++k){
				if (board[i][k] == 2){
					$('#'+i+k+'').append('<div class="piece blackPiece"></div>');
				}
				if (board[i][k] == 3){
					$('#'+i+k+'').append('<div class="piece whitePiece"></div>');
				}
				if (board[i][k] == -2){
					$('#'+i+k+'').append('<div class="piece blackKing"></div>');
				}
				if (board[i][k] == -3){
					$('#'+i+k+'').append('<div class="piece whiteKing"></div>');
				}
			}
		}
	}
	
	function makeMove(xi,yi,xf,yf,player,board){
		
		enemy = 0;
        if (player == 2){
            enemy = 3;
		}
        else if(player == 3){
            enemy = 2;
		}
        else{
            console.log('player nao existe');
            return [];
		}
		
		if (xi >= 0 && xi < 8 && yi >= 0 && yi <8 && xf >=0 && xf < 8 && yf >= 0 && yf <8){
		
		if (player == 3){
			if(board[xi][yi] == 3){
				var tBoard = moveUpDown(xi,yi,xf,yf,player,enemy,board);
				return tBoard;
			}else if(board[xi][yi] == -3){
				var tup = moveUpDown(xi,yi,xf,yf,player,enemy,board);
				var tdown = moveDownUp(xi,yi,xf,yf,player,enemy,board);
				if (tup.length > 0){
					return tup;
				}else{
					return tdown;
				}
			}
		}else if(player == 2){
			if(board[xi][yi] == 2){
				var tBoard = moveDownUp(xi,yi,xf,yf,player,enemy,board);
				return tBoard;
			}else if(board[xi][yi] == -2){
				var tup = moveUpDown(xi,yi,xf,yf,player,enemy,board);
				var tdown = moveDownUp(xi,yi,xf,yf,player,enemy,board);
				if (tup.length > 0){
					return tup;
				}else{
					return tdown;
				}
			}
		}
		}
		return [];
	}
	
	function moveUpDown(xi,yi,xf,yf,player,enemy,board){
		/*check move direction*/
		if( xf == (xi+1) && ((yf == yi -1) || (yf == yi + 1))){
			valorPeca = board[xi][yi];
			/*check enemy existence*/
			if(board[xf][yf] == enemy || board[xf][yf] == enemy*(-1)){
				if ((xi+2) < 8){
					/*verifica a direcao do movimento*/
                    if (yf == yi -1){
						if (yf -1 >= 0){
							if (board[xf+1][yf-1] == 1){
								board[xi][yi] = 1;
                                board[xf][yf] = 1;
								if(xf+1 == 7 && valorPeca == player){
									board[xf+1][yf-1] = player*(-1);
								}else{
									board[xf+1][yf-1] = valorPeca;
								}
								return board;
							}
							return [];
						}
						return [];
					}
					else{
						if (yf +1 < 8){
							if (board[xf+1][yf+1] == 1){
								board[xi][yi] = 1;
                                board[xf][yf] = 1;
								if(xf+1 == 7 && valorPeca == player){
									board[xf+1][yf+1] = player*(-1);
								}else{
									board[xf+1][yf+1] = valorPeca;
								}
								return board;
							}
							return [];
						}
						return [];
					}
				}return [];
                                       
			}else if(board[xf][yf] == 1){
                board[xi][yi] = 1;
                if(xf == 7 && valorPeca == player){
                    board[xf][yf] = player*(-1);
				}else{
                    board[xf][yf] = valorPeca;
                     
				
				}
				return board;
			}else{
				return [];
			}
				
			
		}
		return [];
	}
	
	function moveDownUp(xi,yi,xf,yf,player,enemy,board){
		/*check move direction*/
		if( xf == (xi-1) && ((yf == yi -1) || (yf == yi + 1))){
			valorPeca = board[xi][yi];
			/*check enemy existence*/
			if(board[xf][yf] == enemy || board[xf][yf] == enemy*(-1)){
				if ((xi-2) >= 0){
					/*verifica a direcao do movimento*/
                    if (yf == yi -1){
						if (yf -1 >= 0){
							if (board[xf-1][yf-1] == 1){
								board[xi][yi] = 1;
                                board[xf][yf] = 1;
								if(xf-1 == 0 && valorPeca == player){
									board[xf-1][yf-1] = player*(-1);
								}else{
									board[xf-1][yf-1] = valorPeca;
								}
								return board;
							}
							return [];
						}
						return [];
					}
					else{
						if (yf +1 < 8){
							if (board[xf-1][yf+1] == 1){
								board[xi][yi] = 1;
                                board[xf][yf] = 1;
								if(xf-1 == 0 && valorPeca == player){
									board[xf-1][yf+1] = player*(-1);
								}else{
									board[xf-1][yf+1] = valorPeca;
								}
								return board;
							}
							return [];
						}
						return [];
					}
				}return [];
                                       
			}else if(board[xf][yf] == 1){
                board[xi][yi] = 1;
                if(xf == 0 && valorPeca ==player){
                    board[xf][yf] = player*(-1);
				}else{
                    board[xf][yf] = valorPeca;
                     
				
				}
				return board;
			}else{
				return [];
			}
				
			
		}
		return [];
	}
	
	function endOfGame(board,player){
		var player2 = 0;
		var player3 = 0;
		for( var i = 0; i < board.length; ++i){
			for( var k = 0; k < board.length; ++k){
				if(board[i][k] == 3 || board[i][k] == -3){
					player3+=1;
				}
				if(board[i][k] == 2 || board[i][k] == -2){
					player2+=1;
				}
			}
		}
		if(player2 == 0){
			alert("White pieces won!");
			return true;
		}
		if(player3 == 0){
			alert("Black pieces won!");
			return true;
		}
		var lost2 = false;
		var lost3 = false;
		var no2 = new No([],board,[]);
		no2 = createChildren(no2,2);
		console.log("no2"+no2.filhos);
		if(no2.filhos.length <= 0){
			lost2 = true;
			//alert("Black pieces can't move, \nwhite pieces won!");
			//return true;
		}
		var no3 = new No([],board,[]);
		no3 = createChildren(no3,3);
		
		if(no3.filhos.length <= 0){
			lost3 = true;
			
			//alert("White pieces can't move, \nblack pieces won!");
			//return true;
		}
		
		if(lost2 && lost3){
			if(player == 2){
				alert("Black pieces can't move, \nwhite pieces won!");
				return true;
			}else{
				alert("White pieces can't move, \nblack pieces won!");
				return true;
			}
		}
		if(lost2){
			alert("Black pieces can't move, \nwhite pieces won!");
			return true;
		}
		if(lost3){
			alert("White pieces can't move, \nblack pieces won!");
			return true;
		}
		return false;
	}
	
	//========================AI functions======================
	
	function No(pai,valor = [],filhos = [],id = 0){
		this.id = id;
		this.pai = pai;
		this.valor = valor;
		this.filhos = filhos;
		this.score = 0;
	}
	
	function createChildren(no,player){
		//console.log(no.valor);
		var thisBoard = copyBoard(no.valor);
		var listaFilhos = [];
		for (var i=0; i < thisBoard.length; ++i){
			for (var j= 0; j < thisBoard.length; ++j){
				if(thisBoard[i][j] == player || thisBoard[i][j] == player*(-1)){
					var lista = verifyMove(thisBoard,i,j,player);
					if (lista.length > 0){
						for(m = 0; m < lista.length; ++m){
							listaFilhos.push(lista[m]);
						}
					}
				}
			}
		}
		
		for (var i=0; i < listaFilhos.length; ++i){
			novo = new No(no,listaFilhos[i],[],no.id+1);
			console.log(typeof(novo));
			no.filhos.push(novo);
		}
		
		return no;
	}
	
	function verifyMove(thisBoard, xi, yi, player){
		var jogadas = [];
		if (player == 3){
				if (thisBoard[xi][yi] == 3 || thisBoard[xi][yi] == -3){
					 var resultado = makeMove(xi,yi,xi+1,yi+1,player,copyBoard(thisBoard));
					 if(resultado.length > 0){
						 jogadas.push(resultado);
					 }
					 var resultado = makeMove(xi,yi,xi+1,yi-1,player,copyBoard(thisBoard));
					 if(resultado.length > 0){
						 jogadas.push(resultado);
					 }
				 }
				if (thisBoard[xi][yi] == -3){
					 var resultado = makeMove(xi,yi,xi-1,yi+1,player,copyBoard(thisBoard));
					 if(resultado.length > 0){
						 jogadas.push(resultado);
					 }
					 var resultado = makeMove(xi,yi,xi-1,yi-1,player,copyBoard(thisBoard));
					 if(resultado.length > 0){
						 jogadas.push(resultado);
					 }
				 } 
			return jogadas;
		}
		if(player == 2){
			if (thisBoard[xi][yi] == 2 || thisBoard[xi][yi] == -2){
					 var resultado = makeMove(xi,yi,xi-1,yi+1,player,copyBoard(thisBoard));
					 if(resultado.length > 0){
						 jogadas.push(resultado);
					 }
					 var resultado = makeMove(xi,yi,xi-1,yi-1,player,copyBoard(thisBoard));
					 if(resultado.length > 0){
						 jogadas.push(resultado);
					 }
				 }
				if (thisBoard[xi][yi] == -2){
					 var resultado = makeMove(xi,yi,xi+1,yi+1,player,copyBoard(thisBoard));
					 if(resultado.length > 0){
						 jogadas.push(resultado);
					 }
					 var resultado = makeMove(xi,yi,xi+1,yi-1,player,copyBoard(thisBoard));
					 if(resultado.length > 0){
						 jogadas.push(resultado);
					 }
				 }
			return jogadas;
		}
		
		return [];
	
	}
	
	function createTree(no,thisplayer,limite,iteracao){
        if (iteracao <= limite){
            no = createChildren(no,player);
            if (no.filhos.length > 0){
                if (thisplayer == 2){
                    thisplayer = 3;
                }else if( player == 3){
                    thisplayer = 2;
				}
                for (i = 0; i < no.filhos.length; ++i){
					//console.log(filho);
					createTree(no.filhos[i],thisplayer,limite,iteracao+1);
				}
			}
		}
}

	    function avaliacao(tabuleiro,player){
        if (player == 2){
            var pontosPlayer = 0;
            var pontosInimigo = 0;
            for (var i = 0; i < tabuleiro.length; ++i){
                for (var j = 0; j < tabuleiro.length; ++j){
					var peca = tabuleiro[i][j];
                    if (peca == 2){pontosPlayer+=1;}
                        
                    if (peca == -2){pontosPlayer+=1;}
                        
                    if (peca == 3){pontosInimigo+=2;}
                        
                    if (peca == -3){pontosInimigo+=2;}
                        
				}
			}
            return pontosPlayer - pontosInimigo;
        }else{
            var pontosPlayer = 0;
            var pontosInimigo = 0;
            for (var i = 0; i < tabuleiro.length; ++i){
                for (var j = 0; j < tabuleiro.length; ++j){
					var peca = tabuleiro[i][j];
                    if (peca == 2){pontosInimigo+=2;}
                        
                    if (peca == -2){pontosInimigo+=2;}
                        
                    if (peca == 3){pontosPlayer+=1;}
                        
                    if (peca == -3){pontosPlayer+=1;}
                        
				}
			}
            return pontosPlayer - pontosInimigo;
		}
}

function minimaxAB(no,profundidade,a,b,player,maximizing){
        if (profundidade == 0){
		return avaliacao(no.valor,player);}

        if (maximizing){
            var maxAval = Number.NEGATIVE_INFINITY;
            for (var i = 0; i < no.filhos.length; ++i){
				
                var aval = minimaxAB(no.filhos[i],profundidade-1,a,b,player,false);
                maxAval = Math.max(maxAval,aval);
                a = Math.max(aval,a);
				console.log("filhos: "+no.filhos);
				console.log("filhos i: "+no.filhos[i]);
                no.filhos[i].score = maxAval;
                if (b <= a){
				break;}
			}
            return maxAval;

        }else{
            var minAval = Infinity;
            for (var i = 0; i < no.filhos.length; ++i){
                aval = minimaxAB(no.filhos[i],profundidade-1,a,b,player,true);
                minAval = Math.min(minAval,aval);
                console.log("filhos: "+no.filhos);
				console.log("filhos i: "+no.filhos[i]);
				no.filhos[i].score = minAval;
                b = Math.min(b,aval);
                if (b <= a){
					break;}
			}
            return minAval;
		}
}

function pcMove(tabuleiro,player){
        no = new No([],tabuleiro,[]);
		//console.log(no.valor);
        createTree(no,player,8,0);
		console.log(no);
        var melhorJogada = minimaxAB(no,9,Number.NEGATIVE_INFINITY,Infinity,player,true);
        var jogadasPossiveis = [];
        for (var i = 0; i < no.filhos.length; ++i){
            if (no.filhos[i].score == melhorJogada){
                jogadasPossiveis.push(no.filhos[i]);
			}
		}
		
		tam = jogadasPossiveis.length;
		choice = Math.floor((Math.random() * 100) + 1) % tam;
		console.log("tam: "+tam+" choice: "+choice);
        jogada = jogadasPossiveis[choice];
        return jogada.valor;
}

	
		
	
	
	//==========================Main functions====================
	
	/*seleciona peças a serem jogadas*/
	$('body').on('click','.square',function(){
		
		var tileId = $(this).attr('id');
			
			var i = parseInt(tileId.substring(0,1));
			var k = parseInt(tileId.substring(1));
			
		if(selected == 1){
			$('#'+selectedPiece).fadeTo(10,1);
			$('.highlight').removeClass('highlight');
			
			if(mboard[i][k] != 0){
				
			var m = parseInt(selectedPiece.substring(0,1));
			var n = parseInt(selectedPiece.substring(1));
			
			var sucessful = makeMove(m,n,i,k,player,mboard);
			
			console.log("sucessful"+sucessful);
			console.log(sucessful.length);
			if(sucessful.length > 0){
				
				if(player==2){
					if(computer == false){
						player = 3;
						$('#player h3').text("Player: white");
						mboard = sucessful;
						drawPiece(mboard);
					}
					
				}else{
					player = 2;
					$('#player h3').text("Player: black");
					mboard = sucessful;
					drawPiece(mboard);
					
					
				}
				
				var endboard = copyBoard(mboard);
				
				if(endOfGame(endboard,player)){
					player = 1;
					$('#player h3').text("End of game!");
				}
				
				if(player != 1 && computer){
					//player = 2;
					var jogada = pcMove(mboard,player);
					mboard = jogada;
					drawPiece(mboard);
					player = 3;
					$('#player h3').text("Player: white");
				}
			}
			
			}
			selectedPiece = '';
			selected = 0;
			
			
		}
		if(selected == 0){
			
			console.log(tileId);
			console.log(i);
			console.log(k);
			console.log(player);
			console.log(mboard[i][k]);
			
			if (player == 3){
				if(mboard[i][k] == 3 || mboard[i][k] == -3){
					//console.log('white');
					//console.log(player);
					$(this).fadeTo(10,0.5);
					$(this).addClass('highlight');
					if(mboard[i][k] == 3 || mboard[i][k] == -3){
						$("#"+(i+1)+(k+1)).addClass('highlight');
						$("#"+(i+1)+(k-1)).addClass('highlight');
					}
					if(mboard[i][k] == -3){
						$("#"+(i-1)+(k+1)).addClass('highlight');
						$("#"+(i-1)+(k-1)).addClass('highlight');
					}
					selected = 1;
					selectedPiece = tileId;
				}
			}
			else if (player == 2){
				if(mboard[i][k] == 2 || mboard[i][k] == -2){
					//console.log('black');
					//console.log(player);
					$(this).fadeTo(10,0.5);
					$(this).addClass('highlight');
					if(mboard[i][k] == 2 || mboard[i][k] == -2){
						$("#"+(i-1)+(k+1)).addClass('highlight');
						$("#"+(i-1)+(k-1)).addClass('highlight');
					}
					if(mboard[i][k] == -3){
						$("#"+(i+1)+(k+1)).addClass('highlight');
						$("#"+(i+1)+(k-1)).addClass('highlight');
					}
					selected = 1;
					selectedPiece = tileId;
				}
			}
		}
		/*}else if(selected == 1){
			$('#'+selectedPiece).fadeTo(10,1);
			selectedPiece = '';
			selected = 0;
		}*/
		
	});
	
	
	$('body').append('<div id="player" ><h3>Player: white</h3></div>');
	printBoard();
	drawPiece(mboard);
	
	
});


