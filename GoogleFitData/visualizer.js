let shadowOffset = 4;
let calorieGoal = 2500;
let activityGoal =8;

class Visualizer{
  constructor(){
    this.months = [];
    this.timeDraw = 0;
    this.stepsDraw = 0;
    this.timeDraw = 0;
    this.distanceDraw = 0;
    this.caloriesDraw = 0;
    this.yearDraw = 2000;
  }

  draw(yearData){
    this.yearDraw = lerpNum(this.yearDraw, yearData.year,0.1);
    let monthData = false;
    let monthDraw = 0;
    background(palette[1]);
    
    noFill();

    
    for (let i = 0; i < this.months.length; i++){
      if(this.months[i].getDistance() < 100){
        monthData = true;
        monthDraw = i;
        break;
      }
      else{
        monthData=false;      
      }
    }
    
    for (let i = 0; i < this.months.length; i++){
      let highlight = false;
      if(monthData === true && monthDraw === i){
          highlight = true;
        }
      
      this.months[i].draw(highlight);
      
      for (let j = 0; j< this.months[i].days.length; j++){    
        let stepsData = yearData.monthData[i].dayData[j].steps;
        this.months[i].days[j].draw(stepsData, highlight);
      }
      
    }
    //let timeDraw = 0;
    if(monthData == false){
      this.stepsDraw = lerpNum(this.stepsDraw, 
                               yearData.totalSteps,
                               0.2); 
      this.distanceDraw = lerpNum(this.distanceDraw, 
                                  yearData.totalDistance,
                                  0.2);  
      this.timeDraw = lerpNum(this.timeDraw, yearData.totalTime / (365 *24),0.1);
      
      this.caloriesDraw =  lerpNum(this.caloriesDraw, 
                                   yearData.totalCalories/365/calorieGoal*TAU,
                                   0.1);
    }
    else{
      this.stepsDraw = lerpNum(this.stepsDraw,
                               yearData.monthData[monthDraw].totalSteps,
                               0.2); 
      this.distanceDraw = lerpNum(this.distanceDraw,                                                   yearData.monthData[monthDraw].totalDistance,
                                  0.2);   
      this.timeDraw = lerpNum(this.timeDraw, 
                              yearData.monthData[monthDraw].totalTime  / (30 * 24),
                              0.1);
      this.caloriesDraw = lerpNum(this.caloriesDraw,
                                  yearData.monthData[monthDraw].totalCalories / 30/calorieGoal*TAU,
                                  0.1);
    }
    //this.caloriesDraw = constrain(this.caloriesDraw / 2000, 0, 1);
    strokeWeight(8);
    stroke(palette[0]);
    noFill(); 
    let timeTemp = map(constrain(this.timeDraw,0,activityGoal),0,activityGoal,0.01,TAU);
    arc(width/2 + shadowOffset, height/2 + shadowOffset, 480,480, -HALF_PI, -HALF_PI +timeTemp);
    arc(width/2 + shadowOffset, height/2 + shadowOffset, 450,450, -HALF_PI, -HALF_PI + constrain(this.caloriesDraw,0.001,TAU));
    stroke(palette[2]);
    
    arc(width/2, height/2, 480,480, -HALF_PI, -HALF_PI + timeTemp);
    arc(width/2, height/2, 450,450, -HALF_PI, -HALF_PI + constrain(this.caloriesDraw,0.01,TAU));
    noStroke();
    noFill();
      
    const mainSize = 150;
    const minorSize = 40;
    const imageSize = 48;
    imageMode(CENTER);
    //image(distImg, width/2,height/2 - mainSize - minorSize / 2 + imageSize/2 ,imageSize, imageSize);
    
    //image(stepsImg, width/2,height/2 + mainSize + minorSize / 2 - imageSize /2 ,imageSize, imageSize);
    
    
    
    //fill('white');
    
    noStroke();
    textFont("Open Sans");
    textStyle(BOLDITALIC);
    textAlign(CENTER, CENTER)
    textSize(mainSize)
    fill(palette[0]);
    text(round(this.yearDraw),width/2 + shadowOffset, height/2 +shadowOffset);
    if(monthData){
      fill(palette[3]);
    }
    else{
      fill(palette[4]);
    }

    text(round(this.yearDraw),width/2, height/2);
    
    textStyle(BOLD);
    textSize (minorSize);
    
    fill(palette[0]);
    text(round(this.stepsDraw) + " Steps",width/2 + shadowOffset , height/2 + mainSize / 2 + minorSize / 2 + shadowOffset);
    
    text(round(this.distanceDraw / 1000) + " km",width/2 + shadowOffset, height/2 - mainSize / 2 - minorSize / 2 - mainSize * 0.05 + shadowOffset);
    
    text(round(this.caloriesDraw / TAU * 100) + " % kcal",width/2 + shadowOffset , height/2 + mainSize / 2 + minorSize * 1.5 + minorSize / 2 + shadowOffset);
    
    
        text(nf(this.timeDraw,0,2) + " hours",width/2 + shadowOffset, height/2 - mainSize / 2 - minorSize / 2 - mainSize * 0.05 - minorSize * 1.5 + shadowOffset);
    
    if(monthData){
      fill(palette[4]);
    }
    else{
      fill(palette[4]);
    }
    text(round(this.caloriesDraw / TAU * 100) + " % kcal",width/2 , height/2 + mainSize / 2 + minorSize * 1.5 + minorSize / 2);
    
    text(round(this.stepsDraw) + " Steps",width/2 , height/2 + mainSize / 2 + minorSize / 2);
    
    text(round(this.distanceDraw / 1000) + " km",width/2, height/2 - mainSize / 2 - minorSize / 2 - mainSize * 0.05);
    
    text(nf(this.timeDraw,0,2) + " hours",width/2, height/2 - mainSize / 2 - minorSize / 2 - mainSize * 0.05 - minorSize * 1.5);
    
  }
}

class visMonth{
  constructor(i){
    this.days = [];
    this.monthDate= i;
    this.monthDraw = "";
    this.totalStepsDraw = 0;
    this.totalDistanceDraw =0;
    this.totalCaloriesDraw = 0;
    this.position = createVector(0, 0);
    this.monthRadius = 260;
    
    let posVector = createVector(width/2, height/2);
    let rotatedVector = createVector(this.monthRadius, 0)
    rotatedVector.rotate(this.monthDate/12 * TAU + PI/12 - PI / 2);
    posVector.add(rotatedVector);
    this.position = posVector;
  }
  
  draw(highlight){  
    if(highlight){
      fill(palette[4]);
    }
    else
    {
      fill(palette[3]);
    }

    textFont("Open Sans");
    textStyle(BOLD);
    textAlign(CENTER, CENTER)
    rotateText(width/2, height/2,this.monthRadius,this.monthDate/12 * TAU + PI/12,monthNames[this.monthDate], 32,5)
    
    
  }
  
  getDistance()
  {
    return dist(this.position.x, this.position.y,mouseX, mouseY);
  }
}

class visDay{
  constructor(date)
  {
    this.date = date;
    this.stepsDraw = 0;
    this.distanceDraw = 0;
    this.caloriesDraw = 0;
    this.dayOfYear = dayOfYear(date);
  }
  
  draw(steps, highlight){
    let multi = 0.0;    
    if(highlight){
      fill(palette[4]);
      multi = 500;
    }
    else
    {
      fill(palette[3]);
    }

    this.stepsDraw = lerpNum(this.stepsDraw, steps + multi, 0.2);

    let radius = 300; 
    
         
    push();
    translate(width/2, height/2);
    let angle = (PI * 2 / 365) * dayOfYear(this.date) - PI/2;
    rotate(angle);
    
    
    rect(radius, -2, this.stepsDraw * 0.005 + 4,4);
    
    pop();  
  }
}

function lerpNum(from,to,delta){
  return lerp(from,to,delta);
}

