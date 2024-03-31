function branch(start, end){
  this.begin = start;
  this.end = end;
  this.grown = false;
  
  this.jitter = function(){
    this.end.x +=random(-1,1);
    this.end.y +=random(-1,1);
  }
  
  this.draw = function(){
    stroke(255);
    line(this.begin.x,this.begin.y,this.end.x,this.end.y);
  }
  
  this.branchA = function(){
    this.grown = true;
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI/random(4,8));
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end,dir);
    var a = new branch(this.end,newEnd);
    return a;
  }
  
  this.branchB = function(){
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI/random(3,9));
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end,dir);
    var b = new branch(this.end,newEnd);
    return b;
  }
}