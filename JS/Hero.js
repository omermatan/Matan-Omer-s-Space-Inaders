const LASER_SPEED = 80; 
var laserOutPos = {i:0,j:0};
var isLaserInSky = false;
var isLaserDone = false
var gHero = {pos: {i:12, j: 5}, isShoot: false}; 
var gIntervalID;
 
// creates the hero and place it on board 
function addHeroToBoard(board) {
    var hero = { type: SKY, gameElement: HERO };
    board[board.length - 2][getRandomNumInc(0,board[0].length - 1)] = hero;
    gGamerPos = {i: (board.length - 2),j: getRandomNumInc(0,board[0].length - 1)}
    return board;
} 
// Handle game keys 
function handleKey(event) {
	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case ' ':
            shoot() 
			break;
    }
	//setTimeout(function(){verifyVictory(gBoard)},500);
}
// Move the hero right (1) or left (-1) 
function moveTo(i, j) {
	if (gPaused) {
		return;
	}
	
//	var targetCell = gBoard[i][j];


/*things I might add:
	if (targetCell.gameElement === BOMB) {
		console.log('BOMB');
		playSound();
	} */

	/* if (targetCell.gameElement === EXTRALIFE) {
		console.log('LIFE');

	
	}*/
	
		

		// MOVING from current position
	// Model:
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = '';
	// Dom:
	renderCell(gGamerPos, '');

	// MOVING to selected position
	// Model:
	gGamerPos.i = i;
	gGamerPos.j = j;
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = HERO;
	// DOM:
	renderCell(gGamerPos, HERO_IMG);

}
// Sets an interval for shutting (blinking) the laser up towards aliens 
function shoot() {
    if (isLaserInSky) {
        return;
    }
    else {
    console.log(gGamerPos);
    blinkLaser(gGamerPos);
    gIntervalID = setInterval(() => {
        blinkLaser(laserOutPos)
        
    }, LASER_SPEED);
    }
}  
// renders a LASER at specific cell for short time and removes it 
function blinkLaser(location) {
    isLaserInSky = true
    console.log('shooting');
    if (gBoard[location.i - 1][location.j].gameElement === ALIEN) {
        gBoard[location.i - 1][location.j].gameElement = '';
        renderCell({i:(location.i -1),j:location.j},BOOM_IMG);
        console.log('oded');
        clearInterval(gIntervalID);
    }
    else {
    gBoard[location.i - 1][location.j].gameElement = LASER;
    console.log(gBoard[location.i - 1][location.j].gameElement)
    var laserNewPos = {i:(location.i -1),j:location.j};
    renderCell(laserNewPos,LASER_IMG);
    var blink = () => blinkOut(laserNewPos);
    setTimeout(blink, 500);
    }
} 
function blinkOut(location){
    gBoard[location.i][location.j].gameElement = '';
    laserOutPos = {i:location.i,j:location.j};
    console.log(laserOutPos);
    renderCell(laserOutPos,'');
    return laserOutPos;
}