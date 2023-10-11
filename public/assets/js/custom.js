"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Get all elements with the class "move-me"
  var moveMeLinks = document.querySelectorAll(".move-me a");

  // Scroll function
  function scrollToElement(element, duration) {
    var targetElement = document.querySelector(element.getAttribute("href"));
    if (!targetElement) return;

    var targetOffset = targetElement.getBoundingClientRect().top + window.scrollY;
    var startTime = null;

    function scrollStep(timestamp) {
      if (!startTime) startTime = timestamp;

      var progress = timestamp - startTime;
      var percent = Math.min(progress / duration, 1);

      window.scrollTo(0, window.scrollY + targetOffset * percent);

      if (percent < 1) {
        window.requestAnimationFrame(scrollStep);
      }
    }

    window.requestAnimationFrame(scrollStep);
  }

  // Add click event listeners to scroll smoothly when links are clicked
  moveMeLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      scrollToElement(link, 1000); // Adjust the duration as needed
    });
  });

  // Initialize scrollReveal (assuming you have this library loaded)
  if (typeof scrollReveal !== "undefined") {
    new scrollReveal();
  }
});



