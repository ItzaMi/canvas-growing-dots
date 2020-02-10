var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// fillStyle = one overcomes the other for the elements following
/* 
c.fillStyle = "rgba(255, 0, 0, 0.5)";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(0, 255, 0, 0.5)";
c.fillRect(400, 100, 100, 100);
c.fillStyle = "rgba(0, 0, 255, 0.5)";

c.fillRect(300, 300, 100, 100); 
*/

// Line
/* 
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "#fa34a3";
c.stroke(); 
*/

// Arc / Circle ----- beginPath(); starts a new path so it doesn't connect to previous
/*
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = "blue";
c.stroke();
*/

/* 
for(var i = 0; i < 10; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);
    c.strokeStyle = "rgb("+r+","+g+","+b+")";
    c.stroke();
} 
*/

var mouse = {
  x: undefined,
  y: undefined
};

var maxRadius = 40;
var minRadius = 2;

var colorArray = ["#BF5656", "#803939", "#FF7373", "#401D1D", "#E66767"];

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

window.addEventListener("resize", function(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // Interactivty
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArray = [];

function init() {
  circleArray = [];

  for (var i = 0; i < 1000; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = Math.floor(Math.random() - 0.5);
    var dy = Math.floor(Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = Math.floor((Math.random() - 0.5) * 20);
// var dy = Math.floor((Math.random() - 0.5) * 20);
// var radius = 10;
function animate() {
  requestAnimationFrame(animate);
  /* Comment out this line to not clear rectangle */
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  // c.beginPath();
  // c.arc(x, y, radius, 0, Math.PI * 2, false);
  /*var r = Math.floor(Math.random()*255);
  var g = Math.floor(Math.random()*255);
  var b = Math.floor(Math.random()*255);
  c.strokeStyle = "rgb("+r+","+g+","+b+")"; */
  // c.strokeStyle = "blue";
  // c.stroke();

  //   if (x + radius > innerWidth || x - radius < 0) {
  //       dx = -dx;
  //   }

  //   if (y + radius > innerHeight || y - radius < 0) {
  //     dy = -dy;
  // }
  //   x += dx;
  //   y += dy;
}

init();
animate();

