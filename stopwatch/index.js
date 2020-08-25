$(function () {
  // variables
  // mode
  let mode = false;
  // time counter
  let timeCounter = 0;
  // lap counter
  let lapCounter = 0;
  // variable for setInterval
  let action;
  // variable for laps
  let lapNumber = 0;
  // minutes, seconds and centiseconds for time and lap
  let timeMinutes,
    timeSeconds,
    timeCentiseconds,
    lapMinutes,
    lapSeconds,
    lapCentiseconds;
  // ON APP LOAD
  // show start and lap buttons
  hideShowButtons("#startButton", "#lapButton");
  // CLICK START
  $("#startButton").click(function () {
    //   App on
    mode = true;
    // show stop button and lapbutton
    hideShowButtons("#stopButton", "#lapButton");

    startAction();
  });
  // mode on
  // show start and lap button
  // start counter

  // CLICK STOP
  // show resume and reset buttons
  // stop counter
  $("#stopButton").click(function () {
    hideShowButtons("#resumeButton", "#resetButton");
    // stop counter
    clearInterval(action);
  });
  //  CLICK RESUME
  // show stop and lap buttons
  // start action
  $("#resumeButton").click(function () {
    hideShowButtons("#stopButton", "#lapButton");
    startAction();
  });
  // CLICK RESET

  $("#resetButton").click(function () {
    // reload the page
    location.reload();
  });
  // CLICK ON LAP BUTTON
  //if mode is ON

  // start action
  $("#lapButton").click(function () {
    if (mode) {
      addLap();
      // stop action
      clearInterval(action);
      // reset lap and print lap details
      lapCounter = 0;

      startAction();
    }
  });
  // Functions
  //   shows 2 buttons
  function hideShowButtons(x, y) {
    $(".control").hide();
    $(x).show();
    $(y).show();
  }
  //   start the counter
  function startAction() {
    action = setInterval(function () {
      timeCounter++;
      //   reset time at 100 minutes
      if (timeCounter == 100 * 60 * 100) {
        timeCounter == 0;
      }
      lapCounter++;
      if (lapCounter == 100 * 60 * 100) {
        lapCounter == 0;
      }
      updateTime();
    }, 10);
  }
  // converts counters to min, second and centiseconds
  function updateTime() {
    //1 min = 60*100centiseconds = 6000 centiseconds
    timeMinutes = Math.floor(timeCounter / 6000);
    // 1sec = 100 centiseconds
    timeSeconds = Math.floor((timeCounter % 6000) / 100);
    timeCentiseconds = (timeCounter % 6000) % 100;
    //1 min = 60*100centiseconds = 6000 centiseconds
    //  lap counter
    lapMinutes = Math.floor(lapCounter / 6000);
    // 1sec = 100 centiseconds
    lapSeconds = Math.floor((lapCounter % 6000) / 100);
    lapCentiseconds = (lapCounter % 6000) % 100;
    // update time
    $("#timeMinute").text(format(timeMinutes));
    $("#timeSecond").text(format(timeSeconds));
    $("#timeCenti").text(format(timeCentiseconds));
    // update lap counter
    $("#lapMinute").text(format(lapMinutes));
    $("#lapSecond").text(format(lapSeconds));
    $("#lapCentiSecond").text(format(lapCentiseconds));
  }

  //   format time to be 2 digit numbers
  function format(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  }
  //   addLap Function: print lap details inside lap box
  function addLap() {
    lapNumber++;
    var myLapDetails =
      "<div class='lap'> <div class='laptimeTitle'> Lap" +
      lapNumber +
      "</div>" +
      "<div class='laptime'>" +
      "<span>" +
      format(lapMinutes) +
      "</span>" +
      ":<span>" +
      format(lapSeconds) +
      "</span>" +
      ":<span>" +
      format(lapCentiseconds) +
      "</span>";
    "</div>" + "</div>";

    // "<div>" + "<div>" + "Lap" + lapNumber;
    // ("</div>");
    // "<div>" + "<span>" + format(lapMinutes) + "</span>";
    // ":<span>" + format(lapSeconds) + "</span>";
    // ":<span>" + format(lapCentiseconds) + "</span>";
    // ("</div>");
    // ("</div>");
    $(myLapDetails).prependTo("#laps");
  }
});
