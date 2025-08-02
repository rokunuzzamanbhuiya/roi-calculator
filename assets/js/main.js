/* Apps Name: ROI Calculator
   Author: Rokunuzzaman Bhuiya
   Version: 1.0.0
   File Description: Main JS file of the template
*/

document.addEventListener("DOMContentLoaded", function () {
  ("use strict");

  /*
  1. Preloader
  2. ROI Calculator
  3. Custom Animation
  */

  /*=============================================
	=    		1. Preloader			      =
=============================================*/
  window.addEventListener("load", function () {
    document.querySelector("body").classList.add("loaded");
  });

  /*=============================================
	=    		2. ROI Calculator		      =
=============================================*/

  /*=============================================
	=    		3. Custom Animation		      =
=============================================*/
  // Define the classes you want to animate on scroll
  const animationClasses = [
    "fadeInUp",
    "fadeInDown",
    "fadeInLeft",
    "fadeInRight",
    "animateZoom",
  ];

  // Create an IntersectionObserver
  const animateOnScrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
          observer.unobserve(entry.target); // Remove this line if you want it to replay on scroll
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% visible
    }
  );

  // Apply observer to each animation element
  animationClasses.forEach((cls) => {
    document.querySelectorAll(`.${cls}`).forEach((el) => {
      el.classList.add("animate-init"); // Optional class to hide or prep before scroll
      animateOnScrollObserver.observe(el);
    });
  });
});
