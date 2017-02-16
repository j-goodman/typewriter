var Typewriter = {};

Typewriter.keyboard = [
"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",

"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",

"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",

",", ".", "'", '"', "(", ")", "-", "?", "!", ":", " ", "\\", "/",
"$", "%", "#", "+", "=", ";", "~", "&", "*", "[", "]",
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

Typewriter.printPDF = function () {
  var i; var canvas; var img; var doc;
  var stack = document.getElementById('paper-stack');
  doc = new jsPDF();
  for (i=0 ; i<stack.children.length ; i++) {
    canvas = stack.children[i];
    img = canvas.toDataURL('image/jpeg');
    doc.addImage(img, 'JPEG', 0, 0, 200, 256);
    if (i !== stack.children.length - 1) {
      doc.addPage();
    }
  }
  doc.save();
};

Typewriter.stackPaper = function (currentPaper) {
  var stack = document.getElementById('paper-stack');
  currentPaper.parentElement.removeChild(currentPaper);
  currentPaper.className = "paper stacked";
  stack.appendChild(currentPaper);
};

Typewriter.discardPaper = function () {
  var currentPaper = document.getElementById('loaded-paper');
  var stack = document.getElementById('paper-stack');
  currentPaper.parentElement.removeChild(currentPaper);
};

Typewriter.loadNewPaper = function () {
  var currentPaper = document.getElementById('loaded-paper');
  if (this.action === 'stack') {
    Typewriter.stackPaper(currentPaper);
  } else if (this.action === 'discard') {
    Typewriter.discardPaper(currentPaper);
  }

  // <canvas class='paper' id='loaded-paper' height='1280' width='990'></canvas>
  var newPaper = document.createElement('CANVAS');
  newPaper.className = 'paper';
  currentPaper.id = '';
  newPaper.id = 'loaded-paper';
  newPaper.height = 1280;
  newPaper.width = 990;

  var tableMarker = document.getElementById('table-marker');

  var table = document.getElementById('table');
  table.insertBefore(newPaper, tableMarker);

  Typewriter.carriage.preparePaper();
  Typewriter.carriage.moveArmTo(Typewriter.carriage.leftMargin.place);
  Typewriter.carriage.moveTo(50);
};

onload = function () {
  setUpCarriage();
  setUpMargins();
  onkeydown = keyEvent;
  document.getElementById('print').onclick = Typewriter.printPDF;
  document.getElementById('new-paper').onclick = Typewriter.loadNewPaper.bind({action: 'stack'});
  document.getElementById('discard-paper').onclick = Typewriter.loadNewPaper.bind({action: 'discard'});
};
