var Typewriter = {};

Typewriter.keyboard = [
"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",

"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",

"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",

",", ".", "'", '"', "(", ")", "-", "?", "!", ":", " ", "\\", "/",
];

var setUpCarriage = function () {
  var carriage = document.getElementById('carriage');
  var arm = document.getElementById('arm');
  Typewriter.carriage = new Carriage (carriage, arm);
  Typewriter.carriage.frame.style.top = Typewriter.carriage.position;
  Typewriter.carriage.setup();
};

var setUpMargins = function () {
  var leftMargin = document.getElementById('left-margin');
  var rightMargin = document.getElementById('right-margin');
  Typewriter.carriage.leftMargin = new Margin (leftMargin, 'left');
  Typewriter.carriage.rightMargin = new Margin (rightMargin, 'right');
};

var keyEvent = function (event) {
  if (Typewriter.keyboard.includes(event.key)) {
    Typewriter.carriage.type(event.key);
  } else {
    Typewriter.carriage.functionKey(event.key);
  }
  if (event.target.tagName === 'BODY') {
    return false;
  }
};

onload = function () {
  setUpCarriage();
  setUpMargins();
  onkeydown = keyEvent;
};
