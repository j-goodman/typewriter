var Margin = function (htmlElement, side) {
  this.element = htmlElement;
  if (['left', 'right'].includes(side)) {
    this.side = side;
  }
  if (side === 'left') {
    this.place = 12;
  } else if (side === 'right') {
    this.place = 460;
  }
  this.locked = true;
  this.setup();
  var paper = document.getElementById('paper');
  this.paperLeft = paper.offsetLeft;
  this.paperRight = paper.offsetRight;
};

Margin.prototype.setup = function () {
  this.element.onmousedown = function () {
    this.pickUp();
    onmouseup = function () {
      onmousemove = null;
    };
  }.bind(this);
};

var mouseMoveEvent = function (event) {
  this.place = event.clientX - this.paperLeft;
  this.element.style.left = this.place;
};

Margin.prototype.pickUp = function () {
  this.locked = false;
  onmousemove = mouseMoveEvent.bind(this);
};
