// 首先，需要一张地图，把地图添加进入body里面
var map = document.createElement('div');
var bo = document.getElementsByTagName('body')[0];
bo.appendChild(map);
map.setAttribute('class', 'map');

// 其次，需要20 * 20大小的格子，填充进入整个地图
var blockslist = new Array(20);
for(var i = 0; i < blockslist.length; i++) {
  var blocks = new Array(20);
  for(var j = 0; j < blocks.length; j++) {
    var block = document.createElement('div');
    blocks[j] = block;
    map.appendChild(block);
  }
  blockslist[i] = blocks;
}

// 然后，需要有一条蛇，用数组来表示蛇，用对象来表示蛇的方向
var snake = [[0, 0]];
var press = {L: 37, U: 38, R: 39, D: 40};
var all_direc = {L: [0, -1], U: [-1, 0], R: [0, 1], D: [1, 0]}
var direc_now = all_direc.R;

blockslist[0][0].style.setProperty('background-color', 'green');

// 蛇要能动起来，动起来的方向问题
function move() {
  var x = direc_now[0] + snake[0][0];
  var y = direc_now[1] + snake[0][1];

  // 撞击判断
  if(x < 0 || y < 0 || x > 19 || y > 19 || isOnself(x, y)) {
    alert("游戏结束！");
    location.reload(false);
  }

  // 如果没有增长
  if(!isIncrease(x, y)) {
    var tail = snake.pop();
    blockslist[tail[0]][tail[1]].style.setProperty('background-color', 'grey');
  } else {
    newFood();
    blockslist[food[0]][food[1]].style.setProperty('background-color', 'red');
  }

  snake.unshift([x, y]);
  blockslist[x][y].style.setProperty('background-color', 'green');
}

document.onkeydown = function(e) {
  switch(e.keyCode) {
    case press.L: direc_now == all_direc.R ? direc_now : nextStep(all_direc.L); break;
    case press.U: direc_now == all_direc.D ? direc_now : nextStep(all_direc.U); break;
    case press.R: direc_now == all_direc.L ? direc_now : nextStep(all_direc.R); break;
    case press.D: direc_now == all_direc.U ? direc_now : nextStep(all_direc.D); break;
  }
}

function nextStep(press_direc) {
  direc_now = press_direc;
  move();
}

// 判断是否撞击自身
function isOnself(x, y) {
  for(var i = 0; i < snake.length; i++) {
    if(snake[i][0] == x && snake[i][1] == y)
      return true;
  }
  return false;
}

// 再然后，需要有食物给蛇吃
var food;
function newFood() {
  var x = Math.floor(Math.random() * 20);
  var y = Math.floor(Math.random() * 20);
  var flag = true;
  for(var i = 0; i < snake.length; i++) {
    if(snake[i][0] == x && snake[i][1] == y) {
      flag = false;
      break;
    }
  }
  if(flag)
    food = [x, y];
  else
    newFood();
}
var food = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
blockslist[food[0]][food[1]].style.setProperty('background-color', 'red');

// 蛇要吃了食物能变长
function isIncrease(x, y) {
  return x == food[0] && y == food[1] ? true: false;  
}

setInterval("move();", 100);