//based on coding train tutorial video

let rule = 89;
let cells = []
let size = 10;
let y = 0;

function setup() {
  createCanvas(1025, 1025);
  rule = rule.toString(2).padStart(8,'0');
  
  for (let i = 0; i < width / size; i++){
    cells.push(0);
  }
  cells[int(cells.length/2)] = 1;
}
function draw() {
  noStroke();
  for (let i = 0; i < cells.length; i++){
    fill(255 * (1-cells[i]));
    rect(i*size,y*size,size);
  }
  let nextCells= [];
  let len = cells.length;
  for (let i = 0; i < cells.length; i++){
    let left = cells[(i - 1 + len) % len];
    let right = cells[(i +1) % len];
    let state = cells[i];
    let newState = calculateState(left, state, right); 
    nextCells[i]=newState;
  }
  cells = nextCells;
  y++;
}

function calculateState(left,state,right){ 
  let neighborhood = '' + left + state +right;
  let value = 7 - parseInt(neighborhood,2);
  return parseInt(rule[value]);
}