let maxDist= 200;
let popMax = 193549220;
let slider;
let cities = []

function preload() {
  table = loadTable("data.csv", "ssv");
}

function setup() {
  createCanvas(800, 400);
  
  loadCities();
  
  slider = createSlider(0.0, 100.0);
  slider.size(width);  
  slider.input(valuechanged);
  noLoop();
}

function valuechanged(){
  redraw();
}

function logslider(position) {
  // position will be between 0 and 100
  var minp = 0;
  var maxp = 100;
  // The result should be between 100 an 10000000
  var minv = Math.log(1);
  var maxv = Math.log(popMax);
  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);
  return Math.exp(minv + scale*(position-minp));
}

function loadCities(){
  for(let i= 0; i < table.getRowCount(); i++){
    var posX = map(table.get(i, 2), -180, 180, 0, width);
    var posY = map(table.get(i, 1), -90, 90, height, 0);
    var population = table.get(i,4);
    //var population = map(table.get(i,4), 0, popMax, 2, 25);
    var name = table.get(i,0);
    
    cities.push(new City(posX,posY,population,name));
  }
}

function draw() {
  background(0);
  for(let i = 0; i < cities.length; i++){
    if(cities[i].population > logslider(slider.value()))
      {
        cities[i].draw();
      }

  }
    //let mouseDist = dist(mouseX, mouseY, posX, posY);
    //mouseDist = map(mouseDist,0, maxDist, 1,0);
    //mouseDist =constrain(mouseDist,0.2, 1);
    //circle(posX,posY,radius * mouseDist);
    //console.log(slider.value());
  
}

class City{
  constructor(posX, posY, population,name){
    this.x = posX;
    this.y = posY;
    this.population = population;
    this.name = name;
  }
  draw(){
    fill(255);
    noStroke();
    circle(this.x,this.y, map(this.population, 0, popMax, 2, 25));
  }
  
}