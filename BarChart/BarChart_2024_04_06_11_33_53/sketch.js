let diagram = []

function setup() {
  createCanvas(800, 400);
  colorMode(HSB);
  for(let i = 0; i < 25; i++){
    x = 50 + i * 25;
    y = 300 + i * 2;
    diagram.push(new BarDiagram(x,y, 20, 20, 2, random() * 200 + 10,"#D12424")); 
  }
}

function draw() {
  background("#DBCCBD");
  for(let i = 0; i< diagram.length; i++){
    distance = dist(diagram[i].x, diagram[i].y, mouseX, mouseY);
    if(distance < 10)
      {
        diagram[i].active = true;
      }
    else{
      diagram[i].active = false;
    }
    diagram[i].animate();
    diagram[i].draw();
  }


 
}

function linearGradient(sX,sY,eX,eY,colorS,colorE){
  
}

