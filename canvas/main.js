var
c,
cxt,
angleworker,
ha,
ma,
sa;

(function init(cElt) {
  c = cElt;
  cxt = c.getContext("2d");

  changeBackground();
  changePointer();
  
  if (typeof(Worker) !== "undefined") {
    angleworker = new Worker("pointerangle.worker.js");
  } else {
    document.write("Web workers not supported!");
  }
  
  drawClock();
  
  angleworker.onmessage = function(e) {
    parseMsg(e.data);
    drawClock();
  }
})(document.getElementById("clockarea"));

function parseMsg(m) {
  var msg = m.split(' ');
  sa = parseFloat(msg[0]);
  ma = parseFloat(msg[1]);
  ha = parseFloat(msg[2]);
}

function drawCircle(color, radius) {
  cxt.fillStyle = color;
  cxt.beginPath();
  cxt.arc(200, 200, radius, 0, Math.PI*2);
  cxt.closePath();
  cxt.fill();
}

function drawLine(xFrom, xTo, yFrom, yTo) {
  cxt.moveTo(xFrom, yFrom);
  cxt.lineTo(xTo, yTo);
}

function drawClock() {
  
  drawCircle(document.getElementById("colors1").value, 200);
  drawCircle(document.getElementById("colors2").value, 3);
  
  drawLine(-30*Math.cos(sa)+200,
200*Math.cos(sa)+200, -30*Math.sin(sa)+200, 200*Math.sin(sa)+200);
  drawLine(200, 180*Math.cos(ma)+200, 200, 180*Math.sin(ma)+200);
  drawLine(200, 130*Math.cos(ha)+200, 200, 130*Math.sin(ha)+200);
  for (var a = 0, i = 0; a < 2 * Math.PI; a += (2 * Math.PI) / 60, i++)
    if (i % 5 == 0)
      drawLine(200*Math.cos(a)+200, 190*Math.cos(a)+200,
      200*Math.sin(a)+200, 190*Math.sin(a)+200);
    else
      drawLine(198*Math.cos(a)+200, 196*Math.cos(a)+200,
      198*Math.sin(a)+200, 196*Math.sin(a)+200);
  cxt.stroke();
}

function changePointer() {
  cxt.strokeStyle = document.getElementById("colors2").value;
}

function changeBackground() {
  c.style.background = document.getElementById("colors3").value;
  document.body.style.background = document.getElementById("colors3").value;
  if (document.getElementById("colors3").value == "black")
    document.body.style.color = "white";
  else
    document.body.style.color = "black";
}