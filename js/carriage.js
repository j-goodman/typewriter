var Carriage = function (htmlFrame, htmlArm) {
  this.frame = htmlFrame;
  this.arm = htmlArm;
  this.position = 0;
  this.charWidth = 9;
  this.lineHeight = 18;
  this.tightness = 32;
  this.armPosition = 0;
  this.bell = document.getElementById('bell-audio');
  this.preparePaper();
};

Carriage.prototype.preparePaper = function () {
  this.paper = document.getElementById('loaded-paper');
  this.leftBorder = this.paper.offsetLeft + 8;
  this.rightBorder = this.paper.offsetLeft + this.paper.width;
  this.topBorder = this.paper.offsetTop;
  this.bottomBorder = this.paper.offsetTop + this.paper.height;
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
  console.log(this.armPosition, this.leftBorder);
  this.arm.style.transform = 'translateX(' + (Math.round(this.armPosition + this.leftBorder)) + 'px)';
};

Carriage.prototype.moveArmTo = function (place) {
  this.armPosition = place;
  this.arm.style.transform = 'translateX(' + (Math.round(this.armPosition + this.leftBorder)) + 'px)';
};

Carriage.prototype.type = function (character) {
  var ctx = this.paper.getContext('2d');
  ctx.fillStyle = "#000";
  ctx.font = "24px Courier";
  ctx.fillText(character, (this.armPosition + 10) * 2, (this.position + 12) * 2);
  this.moveArm(this.charWidth);
  if (this.armPosition > this.rightMargin.place - this.charWidth * 2) {
    this.ringBell();
  }
  this.disruptPosition();
};

Carriage.prototype.whiteout = function () {
  var ctx = this.paper.getContext('2d'); var character;
  var shapes = ['X', 'H', 'O', 'M', 'W', 'T', 'L', 'p', 'j', 'q', ';', '0'];
  var i = 0; while (i < 4) {
    character = shapes[Math.floor(Math.random() * shapes.length)];
    ctx.fillStyle = "#eee";
    ctx.globalAlpha = Math.random();
    ctx.font = "24px Courier";
    ctx.fillText(character, (this.armPosition + 10) * 2, (this.position + 12) * 2);
    i++
  }
  ctx.globalAlpha = 1;
  this.disruptPosition();
};

Carriage.prototype.ringBell = function () {
  if (this.arm.className !== 'arm alert') {
    this.bell.play();
    this.arm.className = 'arm alert';
  }
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
  } else if (key === 'Delete' || key === '_') {
    this.whiteout();
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
