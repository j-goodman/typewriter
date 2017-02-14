var Carriage = function (htmlFrame, htmlArm) {
  this.frame = htmlFrame;
  this.arm = htmlArm;
  this.position = 0;
  this.paper = document.getElementById('paper');
  this.charWidth = 10;
  this.lineHeight = 18;
  this.tightness = 32;
  this.leftBorder = this.paper.offsetLeft;
  this.rightBorder = this.paper.offsetLeft + this.paper.width;
  this.topBorder = this.paper.offsetTop;
  this.bottomBorder = this.paper.offsetTop + this.paper.height;
  this.armPosition = 0;

  var ctx = this.paper.getContext('2d');
  ctx.fillStyle = "#fff";
  ctx.fillRect(0,0,990,1280);
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
  ctx.fillStyle = "#000";
  ctx.font = "20px Courier";
  ctx.fillText(character, (this.armPosition + 10) * 2, (this.position + 12) * 2);
  this.moveArm(this.charWidth);
  if (this.armPosition > this.rightMargin.place - this.charWidth * 2) {
    this.ringBell();
  }
  this.disruptPosition();
};

Carriage.prototype.ringBell = function () {
  this.arm.className = 'arm alert';
};

Carriage.prototype.functionKey = function (key) {
  this.arm.className = 'arm';
  if (key === 'Backspace' || key === 'ArrowLeft') {
    this.moveArm(-this.charWidth);
  } else if (key === 'Enter') {
    this.return();
  } else if (key === 'ArrowRight') {
    this.type(" ");
  } else if (key === 'ArrowUp') {
    this.move(-this.lineHeight);
  } else if (key === 'ArrowDown') {
    this.move(this.lineHeight);
  }
};

Carriage.prototype.disruptPosition = function () {
  if (!Math.floor(Math.random() * this.tightness)) {
    this.armPosition += Math.round(Math.random() * 2) - 1;
    this.position += Math.round(Math.random() * 2) - 1;
  }
};

Carriage.prototype.return = function () {
  this.move(this.lineHeight);
  this.moveArmTo(this.leftMargin.place);
  this.arm.className = 'arm';
};

Carriage.prototype.setup = function () {
  this.interval = setInterval (function () {
    if (this.position + 3 < 50) {
      this.move(3);
      this.moveArm(1.5);
    } else {
      this.moveTo(50);
      clearInterval(this.interval);
    }
  }.bind(this), 30);
};
