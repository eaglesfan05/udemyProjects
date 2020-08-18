var playing = false;
var score = 0;
var trialsLeft;
var step;
var fruits = ["apple", "lemon", "peach", "pear", "watermelon"];
var action;
$(function () {
  // click start reset button
  $("#start_reset").click(function () {
    // check if playing
    // yes
    if (playing == true) {
      //   reload page
      location.reload();
    } else {
      //   not playing
      playing = true;
      // set score to 0
      score = 0;
      $("#scorevalue").html(score);
      $("#gameover").hide();
      // show trials left
      $("#trialsleft").show();
      trialsLeft = 3;

      addHearts();

      //   $("#gameover").hide();
      //   change button text to reset game
      $("#start_reset").html("Reset Game");
      startAction();
    }
  });
  // to slice fruit
  $("#fruit1").mouseover(function () {
    score++;
    // update score
    $("#scorevalue").html(score);
    // can use either method to play sound on mouseover
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play();
    // stop fruit going down and hiding
    clearInterval(action);
    // hide fruit through animation
    $("#fruit1").hide("explode", 500);
    // send new fruit
    setTimeout(startAction, 800);
  });

  function addHearts() {
    $("#trialsleft").empty();
    for (i = 0; i < trialsLeft; i++) {
      $("#trialsleft").append('<img src="images/hearts.png" class="lives">');
    }
  }

  function startAction() {
    $("#fruit1").show();
    //   choose random fruit
    chooseFruit();
    //   position fruit randomly horizontally and above box vertically
    $("#fruit1").css({ left: Math.round(500 * Math.random()), top: -50 });
    //   generate a random step
    // add 1 to make sure dont get 0 as result
    step = 1 + Math.round(5 * Math.random());
    //   move fruit down by one step every 10ms
    action = setInterval(function () {
      //   move fruit down by one step
      //   position method returns an object one of the properties of it being the top position of the element.
      $("#fruit1").css("top", $("#fruit1").position().top + step);
      // check if fruit is too low
      if ($("#fruit1").position().top > $("#fruitcontainer").height()) {
        // check if any trials left
        if (trialsLeft > 1) {
          $("#fruit1").show();
          //   choose random fruit
          chooseFruit();
          //   position fruit randomly horizontally and above box vertically
          $("#fruit1").css({ left: Math.round(500 * Math.random()), top: -50 });
          //   generate a random step
          // add 1 to make sure dont get 0 as result
          step = 1 + Math.round(5 * Math.random());
          // reduce trials by 1
          trialsLeft--;
          // populate trials left box
          addHearts();
        } else {
          playing = false;
          //   change button text to start game
          $("#start_reset").html("Start Game");
          //   game over
          $("#gameover").show();
          $("#gameover").html(
            "<p>Game Over!</p><p>Your score is " + score + ".</p>"
          );
          $("#trialsleft").hide();
          stopAction();
        }
      }
    }, 10);
  }
  while (shuffles < 7)
    function chooseFruit() {
      $("#fruit1").attr(
        "src",
        "images/" + fruits[Math.round(4 * Math.random())] + ".png"
      );
    }

  // stop dropping fruit
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
