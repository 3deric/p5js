function drawLinearGradient(sX,sY,eX,eY,colorS,colorE){
  let gradient = drawingContext.createLinearGradient(sX,sY,eX,eY);
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
}

function drawRadialGradient(sX,sY, sR,eX,eY,eR,colorS,colorE){
  let gradient = drawingContext.createRadialGradient(sX,sY,sR,eX,eY,eR);
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
}

