class YearData{
  constructor(year){
    this.year = year;
    this.monthData = [];
    this.totalDistance = 0;
    this.totalSteps = 0;
    this.totalTime = 0;
    this.totalCalories = 0;
    
    for(let i = 0; i<12; i++){
      this.monthData.push(new MonthData(i))
    }
    this.monthData[0].dayData = fillDayData(this.year,0,31);
    this.monthData[1].dayData = fillDayData(this.year,1,28);
    this.monthData[2].dayData = fillDayData(this.year,2,31);
    this.monthData[3].dayData = fillDayData(this.year,3,30);
    this.monthData[4].dayData = fillDayData(this.year,4,31);
    this.monthData[5].dayData = fillDayData(this.year,5,30);
    this.monthData[6].dayData = fillDayData(this.year,6,31);
    this.monthData[7].dayData = fillDayData(this.year,7,31);
    this.monthData[8].dayData = fillDayData(this.year,8,30);
    this.monthData[9].dayData = fillDayData(this.year,9,31);
    this.monthData[10].dayData = fillDayData(this.year,10,30);
    this.monthData[11].dayData = fillDayData(this.year,11,31);
    
  }
  

  calculateTotalDistance(){
    let totalDistance = 0;
    for(let i = 0; i < this.monthData.length; i++){
      totalDistance += this.monthData[i].totalDistance;
      
    }
    this.totalDistance = totalDistance;
  }
  
  calculateTotalSteps(){
    let totalSteps = 0;
    for(let i = 0; i < this.monthData.length; i++){
      totalSteps += this.monthData[i].totalSteps;
    }
    this.totalSteps = totalSteps;
  }
  
  calculateTotalTime(){
    let totalTime = 0;
    for(let i = 0; i < this.monthData.length; i++){
      totalTime += this.monthData[i].totalTime;
    }
    this.totalTime = totalTime;
  }
  
  calculateTotalCalories(){
    let totalCalories = 0;
    for(let i = 0; i < this.monthData.length; i++){
      totalCalories += this.monthData[i].totalCalories;
    }
    this.totalCalories = totalCalories;
  }
  
 
  returnTotalSteps(){
    return this.totalSteps;
  }
  
  returnTotalDistance()
  {
    return this.totalDistance;
  }

  returnTotalTime(){
    return this.totalTime;
  }
  
  returnTotalCalories(){
    return this.totalCalories;
  }
}

class MonthData{
  constructor(month)
  {
    this.month = month;
    this.dayData = [];
    this.totalDistance = 0;
    this.totalSteps = 0;
    this.totalTime = 0;
    this.totalCalories = 0;
  }

  
  calculateTotalSteps(){
    let steps = 0;
    for(let i = 0; i < this.dayData.length; i++){
      steps += this.dayData[i].steps;
    }
    this.totalSteps = steps;
  }
  
  calculateTotalDistance(){
    let distance = 0;
    for(let i = 0; i < this.dayData.length; i++){
      distance += this.dayData[i].distance;
    }
    this.totalDistance = distance;
  }
  
  calculateTotalTime(){
    let time = 0;
    for(let i = 0; i < this.dayData.length; i++){
      time += this.dayData[i].time;
    }
    this.totalTime = time;
  }
  
  calculateTotalCalories(){
    let calories = 0;
    for(let i = 0; i < this.dayData.length; i++){
      calories += this.dayData[i].calories;
    }
    this.totalCalories = calories;
  }
   
  returnTotalSteps(){
    return this.totalSteps;
  }
   
  returnTotalDistance(){  
    return this.totalDistance;
  }
  
  returnTotalTime(){  
    return this.totalTime;
  }
  
  returnTotalCalories(){  
    return this.totalCalories;
  }
  
  draw(){
    fill(255);
    noStroke();
    let offset = PI * 2 / 12 * this.month - PI/12;    
    rotateText(width/2, height/2, 180, offset, monthNames[this.month - 1], 20)
  }
  
}

class DayData{
  constructor(date){
    this.date = date;
    this.time = 0;
    this.steps = 0;
    this.distance = 0;
    this.calories = 0;
  } 
  
  setData(time,steps,distance,calories){
    this.time = sanitizeNumber(time);
    this.steps = sanitizeNumber(steps);
    this.distance = sanitizeNumber(distance);
    this.calories = sanitizeNumber(calories);
  }
  

}

function fillDayData(year,month,days){
  let daysArray = [];
  for (let i = 0; i < days; i++){
    daysArray.push(new DayData(new Date(year, month, i + 1)));
  }
  return daysArray;
}




