var today = new Date();
var hour = today.getHours();
var min = today.getMinutes();
var sec = today.getSeconds();

var sa = ((2*Math.PI)/60 * sec) - (Math.PI / 2);
var ma = ((2*Math.PI)/60 * min) + (((2*Math.PI)/60)/60 * sec) - (Math.PI / 2);
var ha = ((2*Math.PI)/12 * (hour > 12 ? hour-12 : hour)) + (((2*Math.PI)/12)/60 *
		min) + ((((2*Math.PI)/12)/60)/60 * sec) - (Math.PI/2);

setInterval(function() {
	sa += (2 * Math.PI) / 60;
	ma += ((2 * Math.PI) / 60) / 60;
	ha += (((2 * Math.PI) / 60) / 60) / 12;
	postMessage(sa + " " + ma + " " + ha);
}, 1000);