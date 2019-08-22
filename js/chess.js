$(function(){
	
	board = [[0,3,0,3,0,3,0,3],
                          [3,0,3,0,3,0,3,0],
                          [0,3,0,3,0,3,0,3],
                          [1,0,1,0,2,0,1,0],
                          [0,1,0,1,0,1,0,1],
                          [2,0,2,0,2,0,2,0],
                          [0,2,0,2,0,2,0,2],
                          [2,0,2,0,2,0,2,0]];
						  
	var selected = 0;
	var selectedPiece = '';
						  
	function drawPiece(){
		
		$('div').remove('.piece');
						  
		for (var i = 0; i < 8; ++i){
			for (var  k= 0; k < 8; ++k){
				if (board[i][k] == 2){
					$('#'+i+k+'').append('<div class="piece blackPiece"></div>');
				}
				if (board[i][k] == 3){
					$('#'+i+k+'').append('<div class="piece whitePiece"></div>');
				}
			}
		}
	}
	
	function makeMove(xi,yi,xf,yf,player){
		
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
		
		if (player == 3){
			if(board[xi][yi] == 3){
				var tBoard = moveUpDown(xi,yi,xf,yf,player,enemy);
				return tBoard;
			}else if(board[xi][yi] == -3){
				//moveUpDown();
				//moveDownUp();
			}
		}else if(player == 2){
			if(board[xi][yi] == 2){
				var tBoard = moveDownUp(xi,yi,xf,yf,player,enemy);
				return tBoard;
			}else if(board[xi][yi] == -2){
				//moveUpDown();
				//moveDownUp();
			}
		}
	}
	
	function moveUpDown(xi,yi,xf,yf,player,enemy){
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
								if(xf+1 == 7 && valorPeca == player){
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
                if(xf == 7 && valorPeca == player){
                    board[xf][yf] = player*(-1);
				}else{
                    board[xf][yf] = valorPeca;
                     
				return board;
				}
			}else{
				return [];
			}
				
			
		}
	}
	
	function moveDownUp(xi,yi,xf,yf,player,enemy){
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
								if(xf+1 == 7 && valorPeca == 3){
									board[xf+1][yf+1] = -3;
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
                if(xf == 7 && valorPeca ==3){
                    board[xf][yf] = -3;
				}else{
                    board[xf][yf] = valorPeca;
                     
				return board;
				}
			}else{
				return [];
			}
				
			
		}
	}
	
	/*seleciona peças a serem jogadas*/
	$('body').on('click','.square',function(){
		
		var tileId = $(this).attr('id');
			
			var i = parseInt(tileId.substring(0,1));
			var k = parseInt(tileId.substring(1));
			
		if(selected == 1){
			$('#'+selectedPiece).fadeTo(10,1);
			
			if(board[i][k] != 0){
				//board[i][k] = 2;
			var m = parseInt(selectedPiece.substring(0,1));
			var n = parseInt(selectedPiece.substring(1));
			//board[m][n] = 1
			makeMove(m,n,i,k,3);
			drawPiece();
			}
			selectedPiece = '';
			selected = 0;
			
			
		}
		if(selected == 0){
			
			console.log(tileId);
			console.log(i);
			console.log(k);
			
			if(board[i][k] == 3){
				console.log('black');
				$(this).fadeTo(10,0.5);
				selected = 1;
				selectedPiece = tileId;
			}
		}
		/*}else if(selected == 1){
			$('#'+selectedPiece).fadeTo(10,1);
			selectedPiece = '';
			selected = 0;
		}*/
		
	});
	
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
		
	};
	printBoard();
	drawPiece();
});


