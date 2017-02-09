var Typewriter = {};
Typewriter.keyboard = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "];

var Carriage = function (htmlFrame, htmlArm) {
  this.frame = htmlFrame;
  this.arm = htmlArm;
  this.position = 0;
  this.paper = document.getElementById('paper');
  this.leftBorder = this.paper.offsetLeft;
  this.rightBorder = this.paper.offsetLeft + this.paper.width;
  this.topBorder = this.paper.offsetTop;
  this.bottomBorder = this.paper.offsetTop + this.paper.height;
  this.armPosition = 0;
};

Carriage.prototype.move = function (amount) {
  this.position += amount;
  this.frame.style.top = this.position + this.topBorder;
};

Carriage.prototype.moveTo = function (place) {
  this.position = place;
  this.frame.style.top = this.position + this.topBorder;
};

Carriage.prototype.moveArm = function (amount) {
  this.armPosition += amount;
  this.arm.style.left = this.armPosition + this.leftBorder;
};

Carriage.prototype.moveArmTo = function (place) {
  this.armPosition = place;
  this.arm.style.left = this.armPosition + this.leftBorder;
};

Carriage.prototype.type = function (character) {
  var ctx = this.paper.getContext('2d');
  ctx.font = "16px Courier";
  ctx.fillText(character, this.armPosition + 10, this.position + 12);
  this.moveArm(14);
  if (this.armPosition > this.paper.width - 28) {
    this.return();
  }
};

Carriage.prototype.return = function () {
  this.move(22);
  this.moveArmTo(0);
};

Carriage.prototype.setup = function () {
  this.interval = setInterval (function () {
    if (this.position + 3 < 50) {
      this.move(3);
      this.moveArm(1.75);
    } else {
      this.moveTo(50);
      clearInterval(this.interval);
    }
  }.bind(this), 30);
};

onload = function () {
  var carriage = document.getElementById('carriage');
  var arm = document.getElementById('arm');
  Typewriter.carriage = new Carriage (carriage, arm);
  Typewriter.carriage.frame.style.top = Typewriter.carriage.position;
  Typewriter.carriage.setup();
  onkeydown = function (event) {
    if (Typewriter.keyboard.includes(event.key)) {
      Typewriter.carriage.type(event.key);
    }
  };
};
