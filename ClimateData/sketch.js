function preload() {
  table = loadTable("data.csv", "csv", "header");
}

function setup() {
  barWidth = 6;
  canvasWidth = table.getRowCount() * barWidth;
  canvasHeight = canvasWidth / 1.777;
  createCanvas(canvasWidth, canvasHeight);
  noLoop();
}

function draw() {
  background(220);

  const colorBlue = color("#1B84F7");
  const colorRed = color("#ff462e");

  for (let i = 0; i < table.getRowCount(); i++) {
    barColor = color("white");
    d = map(table.get(i, 1), -0.6, 1.0, -1, 1);
    if (d > 0) {
      barColor = lerpColor(barColor, colorRed, d);
    } else {
      barColor = lerpColor(barColor, colorBlue, -d);
    }
    fill(barColor);
    noStroke();
    rect(i * barWidth, 0, barWidth, canvasHeight);
  }
}
