function getKeyframes(hand, handAngle) {
  var FULL_ROTATION = 360,
    QUARTER_ROTATION = FULL_ROTATION / 4;

  return '@keyframes rotate_' + hand + ' {' +
      'from { transform: rotate(' + (handAngle - QUARTER_ROTATION) + 'deg); }' +
      'to { transform: rotate(' + (handAngle + FULL_ROTATION - QUARTER_ROTATION) + 'deg); }' +
    '}' +

    '@-webkit-keyframes rotate_' + hand + ' {' +
      'from { -webkit-transform: rotate(' + (handAngle - QUARTER_ROTATION) + 'deg); }' +
      'to { -webkit-transform: rotate(' + (handAngle + FULL_ROTATION - QUARTER_ROTATION) + 'deg); }' +
    '}';
}

var CLOCK_DIVISOR1 = 360 / 12,
  CLOCK_DIVISOR2 = 360 / 60,
  CLOCK_DIVISOR3 = CLOCK_DIVISOR2 / 60,
  CLOCK_DIVISOR4 = CLOCK_DIVISOR2 / 12;

var now = new Date(),
  hour = now.getHours(),
  hourCorrected = hour < 12 ? hour : hour - 12;
  minutes = now.getMinutes(),
  seconds = now.getSeconds(),

  hourAngle = hourCorrected * CLOCK_DIVISOR1 + minutes * CLOCK_DIVISOR4 + seconds * CLOCK_DIVISOR3,
  minutesAngle = minutes * CLOCK_DIVISOR2 + seconds * CLOCK_DIVISOR3,
  secondsAngle = seconds * CLOCK_DIVISOR2,

  style = document.getElementsByTagName('style')[0];

style.innerHTML += getKeyframes('hours', hourAngle) +
  getKeyframes('minutes', minutesAngle) +
  getKeyframes('seconds', secondsAngle);