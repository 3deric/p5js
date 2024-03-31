let slider;
var tree = [];
var leaves = [];

function setup() {
  createCanvas(400, 400);
  var a = createVector(width/2, height);
  var b = createVector(width/2, height-100);
  var root = new branch(a,b);
  
  tree[0] = root;
}

function mousePressed(){
  for (var i = tree.length -1; i >= 0; i--)
    {
      if(!tree[i].grown){
        tree.push(tree[i].branchA());
        tree.push(tree[i].branchB());
        }
      tree[i].grown = true;
    }
  leaves = [];
  for (var i = 0; i < tree.length; i++){
    if(!tree[i].grown){
      var leaf = tree[i].end.copy();
      leaves.push(leaf); 
    }
  }
}

function draw() {
  background(50);
  for (var i = 0; i < tree.length; i++){
    tree[i].draw();
    //tree[i].jitter();
  }
  for (var i = 0; i < leaves.length; i++){
    fill(255,0,100);
    ellipse(leaves[i].x, leaves[i].y, 10,10);
  }
}