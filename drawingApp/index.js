$(function () {
  $("#slider").slider({
    min: 3,
    max: 30,
    slide: function (event, ui) {
      $("#circle").height(ui.value);
      $("#circle").width(ui.value);
    },
  });

  //  declare variables

  // painting erasing or not
  var paint = false;

  // painting or erasing
  var paint_erase = "paint";

  // get canvas and context
  var canvas = document.getElementById("paint");
  var ctx = canvas.getContext("2d");
  // get the canvas container
  var container = $("#canvasContainer");
  // mouse position
  var mouse = { x: 0, y: 0 };
  // onload load saved work from localStorage

  // set drawing parameters (lineWidth, lineJoin, lineCap)
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  // click inside container
  container.mousedown(function (e) {
    paint = true;
    ctx.beginPath();
    // get coordinates of mouse difference between container and left border of the page
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    ctx.moveTo(mouse.x, mouse.y);
  });
  // move mouse while holding mouse key
  container.mousemove(function (e) {
    // get coordinates of mouse difference between container and left border of the page
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    if (paint == true) {
      if (paint_erase == "paint") {
        // get color input change with strokeStyle
        ctx.strokeStyle = "red";
      } else {
        // color white
        ctx.strokeStyle = "white";
      }
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  });
  // mouse up we are not painting or erasing anymore
  container.mouseup(function () {
    paint = "false";
  });
  // if leave container we are not paintingerasing anymore
  container.mouseleave(function () {
    paint = "false";
  });
  // click on reset button
  // click on save button
  // click on erase button
  $("#erase").click(function () {
    if (paint_erase == "paint") {
      paint_erase = "erase";
    } else {
      paint_erase = "paint";
    }
    $(this).toggleClass("eraseMode");
  });
  // change color input
  // change lineWidth using slider
  // functions
});
