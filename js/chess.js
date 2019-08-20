$(function(){
	
	board = [[0,3,0,3,0,3,0,3],
                          [3,0,3,0,3,0,3,0],
                          [0,3,0,3,0,3,0,3],
                          [1,0,1,0,1,0,1,0],
                          [0,1,0,1,0,1,0,1],
                          [2,0,2,0,2,0,2,0],
                          [0,2,0,2,0,2,0,2],
                          [2,0,2,0,2,0,2,0]];
						  
	var selected = 0;
	var selectedPiece = '';
						  
	function initBoard(){
		
						  
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
	/*
	$('body').click(function(){
		if (selected == 2){
			$('#'+selectedPiece).fadeTo(10,1);
			selectedPiece = '';
			selected = 0;
		}
	});*/
	
	$('body').on('click','.square',function(){
		if(selected == 1){
			$('#'+selectedPiece).fadeTo(10,1);
			selectedPiece = '';
			selected = 0;
		}
		if(selected == 0){
			var tileId = $(this).attr('id');
			
			var i = parseInt(tileId.substring(0,1));
			var k = parseInt(tileId.substring(1));
			console.log(tileId);
			console.log(i);
			console.log(k);
			
			if(board[i][k] == 2){
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
	initBoard();
});


