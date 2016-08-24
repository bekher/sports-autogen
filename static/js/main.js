"use strict"

$(function () {

  // hide the quote box until the user presses generate
  $("#quotebox").hide();

  function setInterviewText(response) {
    $("#quotebox").show();
    $("#interview-body:last").html(response);
    /*
    if ($("#gen-icon").attr("class") === "right arrow icon") {
      $("#gen-icon").removeClass("arrow").addClass("refresh");
    }
   */
  }

  function getInterview(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/gen');

    xhr.onload = function () {
      if (xhr.status == 200) {
        setInterviewText("<br>" + xhr.response);
      }
    }

    xhr.onerror = function() {
      console.log('XHR Error');
      // todo put error in page
    }

    xhr.send();
  }

  $("#gen-button").click(function () {
    getInterview(setInterviewText);  
  });
});
