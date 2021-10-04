const BOARD_SIZE = 14; 
const ALIENS_ROW_LENGTH = 8 
const ALIENS_ROW_COUNT = 3 

var HERO_IMG = '<img src="img/hero.png" />';
var ALIEN_IMG = '<img src="img/alien.png" />';
var LASER_IMG = '<img src="img/Laser.png" />';
var BOOM_IMG = '<img src="img/boom.png" />';
 
const HERO = '♆'; 
const ALIEN = '👽'; 
const LASER = '⤊'; 
//types of cells:
const SKY = 'sky';
const EARTH = 'earth';
const PLAYER = 'player';
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN} 
var gBoard; 
var gGame = { 
    isOn: false, 
    aliensCount: 0 
} 
var gPaused = false;
var gGamerPos = {i:2,j:3};
 
// Called when game loads 
function init() {
    renderBoard(createBoard());
} 
// Create and returns the board with aliens on top, ground at bottom 
// use the functions: createCell, createHero, createAliens  
function createBoard() {
    	// Create the Matrix
	var board = createMat(BOARD_SIZE, BOARD_SIZE);

	// Put SKY everywhere and EARTH on the bottom
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put SKY in a regular cell
			var cell = { type: SKY, gameElement: '' };
			board[i][j] = cell;
			// Place Walls at edges
			if (i === (board.length - 1)) {
				cell.type = EARTH;
			}
			
		}
	}
    gBoard = board;
    console.log(board);
    addHeroToBoard(board);
    addAliensToBoard(board);
    console.log(board);
    return board;
    
} 
 
// Render the board as a <table> to the page 
function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];
			
			var cellClass = getClassName({ i, j })

			cellClass += (currCell.type === SKY) ? ' sky' : ' earth';
			strHTML += `\t<td class="cell ${cellClass}">\n`;

			// TODO - change to switch case statement
			switch (currCell.gameElement) {
				case HERO:
					strHTML += HERO_IMG;
					break;
				case ALIEN:
					strHTML += ALIEN_IMG;
					break;	
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}
 
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN} 
function createCell(gameObject = null) { 
    return { 
        type: SKY, 
        gameObject: gameObject} 
    } 
    // position such as: {i: 2, j: 7} 
    function updateCell(pos, gameObject = null) { 
        gBoard[pos.i][pos.j].gameObject = gameObject; 
        var elCell = getElCell(pos); 
        elCell.innerHTML = gameObject || ''; 
    }