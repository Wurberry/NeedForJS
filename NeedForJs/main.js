 const score = document.querySelector('.score'),
 		start = document.querySelector('.start'),
 		gameArea = document.querySelector('.gameArea'),
 		car = document.createElement('div');

 	car.classList.add('car');
 	start.addEventListener('click', startGame);
 	document.addEventListener('keydown', startRun);
 	document.addEventListener('keyup', stopRun);

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false
};

const setting = {
	start: false,
	score: 0,
	speed: 3,
	traffic: 3
};
function getQuantityElementElements(heightElement){
	return document.documentElement.clientHeight / heightElement + 1;
}
console.log(getQuantityElementElements(200));


 function startGame()
 {
 	 	start.classList.add('hide'); 
 	 	gameArea.innerHTML = '';
 	 	car.style.left = ((gameArea.offsetWidth / 2) - (car.offsetWidth/2));
 	 	car.style.top = 'auto';
 	 	car.style.bottom = '10px';
 	 	for(let i = 0 ; i < getQuantityElementElements(100); i++){
 	 		const line = document.createElement('div');
 	 		line.classList.add('line');
 	 		line.style.top = (i * 75) +'px';
 	 		line.y = i*100;
 	 		gameArea.appendChild(line);
 	 	}

 	 for(let i = 0; i < getQuantityElementElements(100 * setting.traffic); i++){
 	 	const enemy = document.createElement('div');
 	 	enemy.classList.add('enemy');
 	 	enemy.y = -100 * setting.traffic * (i+1);
 	 	enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
 	 	enemy.style.top = enemy.y + 'px';
 	 	enemy.style.background = 'transparent url(\'./image/enemy2.png\') center / cover no-repeat';
 	 	gameArea.appendChild(enemy);
 	 }

 	 	setting.score = 0;
 	 	setting.start = true;
 	 	gameArea.appendChild (car);
 	 	car.style.left = ((gameArea.offsetWidth / 2) - (car.offsetWidth/2));
 	 	car.style.top = 'auto';
 	 	car.style.bottom = '10px';
 	 	setting.x = car.offsetLeft;
 	 	setting.y = car.offsetTop;
 	 	requestAnimationFrame(playGame);
 }
 function playGame()
 {
 		moveRoad();
		moveEnemy();

	if(setting.start)
		{
			setting.score += setting.speed;
		 score.textContent = 'Score: ' + setting.score;



		if(keys.ArrowLeft)
		{
			if(setting.x > 0)
			{
			setting.x -= setting.speed;
			}
		}
		if(keys.ArrowRight){
			if(setting.x < 250)
			{
			setting.x += setting.speed;
			}
		}
		if(keys.ArrowUp){
			if(setting.y > 1)
			{
			setting.y -= setting.speed;
			}
		}
		if(keys.ArrowDown){
			if(setting.y < 399)
			{
			setting.y += setting.speed;
			}
		}
		car.style.left = setting.x + 'px';
		car.style.top = setting.y + 'px';

		requestAnimationFrame(playGame);
	}
 }

function startRun(event){
	event.preventDefault(true);
 	keys[event.key] = true;
}

function stopRun(event){
 	event.preventDefault(true);
 	keys[event.key] = false;
}

 
 function moveRoad(){
 	let lines = document.querySelectorAll('.line');
 	lines.forEach(function(line){
 		line.y += setting.speed;
 		line.style.top = line.y + 'px';

 		if(line.y >= 500){
 			line.y = -100;
 		}


 	});
 }

 function moveEnemy(){
 	let enemy = document.querySelectorAll('.enemy');
 	enemy.forEach(function(item){
 		let carRect = car.getBoundingClientRect();
 		let enemyReact = item.getBoundingClientRect();

 		if (carRect.top <= enemyReact.bottom &&
 		    carRect.right >= enemyReact.left &&
 			carRect.left <= enemyReact.right &&
			carRect.bottom >= enemyReact.top){
 			setting.start = false;
 			console.log('damage');
 			start.classList.remove('hide');
 			start.style.top = score.offsetHeight;
 		}
 		// if (carRect.right >= enemyReact.left){
 		// 	console.log('damage door');
 		// }


 		item.y += setting.speed / 2;
 		item.style.top = item.y + 'px';

	if (item.y >= document.documentElement.clientHeight){
	item.y = -100 * setting.traffic;
	item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
}


 	});
 }

