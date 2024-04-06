class BarDiagram {
  constructor(x, y, wX, wZ, skew, value, colour) {
    this.x = x;
    this.y = y;
    this.barWidth = wX;
    this.value = value;
    this.depth = wZ;
    this.skew = skew;
    this.colour = colour;
    this.active = false;
    this.valueOffset = 1.0;
  }

  animate() {
    let easing = 0.1;
    let target = 1.0;
  
    let speed = 0.0;
    
    if (this.active == true) {
      target = 1.2;
    } 
    else {
      target = 1.0;
    }
    speed = lerp(speed,(target - this.valueOffset) * 2, 0.1);
    this.valueOffset+=speed;
    this.colour = color(hue(this.colour) + speed * 100,
                        saturation(this.colour),
                        brightness(this.colour));
  }

  draw() {
    noStroke();
    for (let i = 0; i < this.depth; i++) {
      if (i < this.depth - 1) {
        let col2 = (360,10,10);
        drawLinearGradient(
          this.x - i * 0.25 * this.skew,
          this.y + i * 0.25,
          this.barWidth,
          -1 * this.value * this.valueOffset + 1,
          color(hue(this.colour),70,50),
          color(hue(this.colour),80,75)
          //"#0A768A"
          //"#27A0C0"
        );
      } else {
        drawLinearGradient(
          this.x - i * 0.25 * this.skew,
          this.y + i * 0.25,
          this.barWidth,
          -1 * this.value * this.valueOffset + 1,
          this.colour,
          color(hue(this.colour),80,100)
          //color(this.colour.hue,this.colour.saturation,this.colour.brightness)
          //"#11BBDA",
          //"#3ECAF0"
        );
      }
      //drawing rectangles with gradient fills for sides and top
      rect(
        this.x - i * 0.25 * this.skew,
        this.y + i * 0.25,
        this.barWidth,
        -1 * this.value * this.valueOffset + 1
      );

      drawLinearGradient(
        this.x - i * 0.25 * this.skew,
        this.y + i * 0.25 - this.value * this.valueOffset,
        this.barWidth,
        1.25,
        color(hue(this.colour),30,90),
        color(hue(this.colour),50,100)
      );
      rect(
        this.x - i * 0.25 * this.skew,
        this.y + i * 0.25 - this.value * this.valueOffset,
        this.barWidth,
        1.25
      );
    }
  }
}
