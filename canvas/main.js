var
c = document.getElementById("clockarea"),
cxt,
angleworker,
ha,
ma,
sa,
aboutButton = document.getElementById("about"),
backgroundColorEl = document.getElementById("colors3"),
clockColorEl = document.getElementById("colors1"),
pointerColorEl = document.getElementById("colors2");

(function init() {
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
  };
  
  aboutButton.addEventListener("click", function about() {
    alert("Canvas Clock b5. WTFPL (2011-2014)\n\n" +
      "scripting by Daniel Desira, a Mozilla contributor and 1st year " +
      "BSc ICT student at the University of Malta\nlayout by Stuart Buge" +
      "ja, a former MCAST ICT student");
  });
  
  backgroundColorEl.addEventListener("change", changeBackground);
  clockColorEl.addEventListener("change", drawClock);
  pointerColorEl.addEventListener("change", changePointer);
})();

function parseMsg(m) {
  var msg = m.split(" ");
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
  
  drawCircle(clockColorEl.value, 200);
  drawCircle(pointerColorEl.value, 3);
  
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
  cxt.strokeStyle = pointerColorEl.value;
}

function changeBackground() {
  c.style.background = backgroundColorEl.value;
  document.body.style.background = backgroundColorEl.value;
  if (backgroundColorEl.value == "black")
    document.body.style.color = "white";
  else
    document.body.style.color = "black";
}