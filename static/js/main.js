"use strict"

$(function () {

  // hide the quote box until the user presses generate
  $("#quotebox").hide();

  function setInterviewText(response) {
    $("#quotebox").show();

    var clean_res = response.replace(/\"/g, "");
    $("#interview-body:last").html(clean_res);
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
