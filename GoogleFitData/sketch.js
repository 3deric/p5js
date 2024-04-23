let yearData = [];
let year;
let slider;
let visualizer;
let monthNames = ["JAN", "FEB", "MAR", "APR", "MAY","JUN","JUL", "AUG", "SEP", "OCT", "NOV","DEC"];
let palette = [];
let stepsImg;
let distImg;

function preload() {
  table = loadTable("activityData.csv", "csv", "header");
  stepsImg = loadImage('images/steps.png');
  distImg = loadImage('images/distance.png');

}

function setup() {
  createCanvas(1000,1000);
  slider = createSlider(0, 6);
  slider.position(10, 10);
  slider.size(100);
  
  /*
  palette = [color('#264653'),
            color('#2a9d8f'),
            color('#e9c46a'),
            color('#f4a261'),
            color('#e76f51')
            ];
  */
  
  palette = [color('#0D0C1D'),
            color('#161B33'),
            color('#474973'),
            color('#A69CAC'),
            color('#F1DAC4')
            ];
  
  setupVisualizer();
  loadFitData();
  //debug();
  
}

function setupVisualizer(){
  visualizer = new Visualizer();
  for(let i = 0; i < 12; i++)
    {
      visualizer.months.push(new visMonth(i))
    }  
  
  visualizer.months[0].days = fillVisDays(0,31);
  visualizer.months[1].days = fillVisDays(1,28);
  visualizer.months[2].days = fillVisDays(2,31);
  visualizer.months[3].days = fillVisDays(3,30);
  visualizer.months[4].days = fillVisDays(4,31);
  visualizer.months[5].days = fillVisDays(5,30);
  visualizer.months[6].days = fillVisDays(6,31);
  visualizer.months[7].days = fillVisDays(7,31);
  visualizer.months[8].days = fillVisDays(8,30);
  visualizer.months[9].days = fillVisDays(9,31);
  visualizer.months[10].days = fillVisDays(10,30);
  visualizer.months[11].days = fillVisDays(11,31);
}

function fillVisDays(month,days){
  let daysArray = [];
  for (let i = 0; i < days; i++){
    daysArray.push(new visDay(new Date(2023, month, i + 1)));
  }
  return daysArray;
}

function loadFitData(){
  let currentYear;
  for (let i = 0; i < table.getRowCount(); i++) {
    let date = int(split(table.get(i, 0), "-"));
    let nextDate;
    if(i < table.getRowCount()-1){
      nextDate = split(table.get(i+1, 0), "-");
    }
    else{
      nextDate = [0,0,0];
    }
    if (currentYear != date[0]) {
      currentYear = date[0];
      currentYearData = new YearData(date[0]);
      yearData.push(currentYearData);
    }
  }
  let yearMin = yearData[0].year;
  let yearMax = yearData[yearData.length-1].year;
  //table.getRowCount()
  for (let i = 0; i < table.getRowCount(); i++) {
    let date = int(split(table.get(i, 0), "-"));
    let j = round(map(date[0],yearMin,yearMax,0,yearData.length-1));
    if(!(date[1] === 2 && date[2] === 29)){

        yearData[j].monthData[date[1]-1].dayData[date[2]-1].setData(table.get(i, 1), //time
                                          table.get(i, 24), //steps
                                          table.get(i, 11), //distance
                                          table.get(i, 10)); //calories
                                
      }  
  }
  
  for (let i = 0; i < yearData.length; i++){
    for (let j = 0; j < yearData[i].monthData.length; j++) {
      yearData[i].monthData[j].calculateTotalSteps();
      yearData[i].monthData[j].calculateTotalDistance();
      yearData[i].monthData[j].calculateTotalTime();
      yearData[i].monthData[j].calculateTotalCalories();
      
    }
    yearData[i].calculateTotalSteps();
    yearData[i].calculateTotalDistance();
    yearData[i].calculateTotalTime();
    yearData[i].calculateTotalCalories();
  }
  
}

function debug(){
  //debugging the data
  for (let i = 0; i < yearData.length; i++){
    for(let j = 0; j<yearData[i].monthData.length; j++){
      console.log(i,
                yearData[i].year,
                yearData[i].returnTotalSteps(),
                yearData[i].returnTotalDistance(),
                yearData[i].returnTotalTime(),
                yearData[i].returnTotalCalories()
                //yearData[i].monthData[j].month,
                //yearData[i].monthData[j].dayData.length,
                //yearData[i].monthData[j].returnTotalSteps(),
                //yearData[i].monthData[j].returnTotalDistance()
                 );
    }
    
  }
}
    
function draw() {
  visualizer.draw(yearData[slider.value()]);
}


function sanitizeNumber(int){
    return round(int * 1.0);
  }

function dayOfYear(date){
  return Math.round((date - new Date(2023, 0, 0)) / 1000 / 60 / 60 / 24);
}

function drawDebug(x, y, radius) {
    drawingContext.setLineDash([5, 3]);
    noFill()
    stroke('grey')
    circle(x, y, 2*radius)
    
    fill('grey')
    circle(x, y, 4)
    
    line(x, y, x, y - radius)
    
      drawingContext.setLineDash([]);

}

function rotateText(x, y, radius, offset, txt, size, spacing) {
    // Comment the following line to hide debug objects
    //drawDebug(x, y, radius)

    // Split the chars so they can be printed one by one
    chars = txt.split("")

    // Decide an angle
    charSpacingAngleDeg = spacing;

    // https://p5js.org/reference/#/p5/textAlign
    textAlign(CENTER, BASELINE)
    textSize(size)
    //fill('black')

    // https://p5js.org/reference/#/p5/push
    // Save the current translation matrix so it can be reset
    // before the end of the function
    push()

    // Let's first move to the center of the circle
    translate(x, y)

    // First rotate half back so that middle char will come in the center
    rotate(radians(-chars.length * charSpacingAngleDeg / 2) + offset)

    for (let i = 0; i < chars.length; i++) {
        text(chars[i], 0, -radius)

        // Then keep rotating forward per character
        rotate(radians(charSpacingAngleDeg))
    }

    // Reset all translations we did since the last push() call
    // so anything we draw after this isn't affected
    pop()

}
  