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

  const inputs = {
    minutesPerDoc: document.getElementById("minutesPerDoc"),
    docsPerMonth: document.getElementById("docsPerMonth"),
    peopleCount: document.getElementById("peopleCount"),
    hourlyWage: document.getElementById("hourlyWage"),
  };

  const labels = {
    minutesLabel: document.getElementById("minutesLabel"),
    docsLabel: document.getElementById("docsLabel"),
    peopleLabel: document.getElementById("peopleLabel"),
    wageLabel: document.getElementById("wageLabel"),
    currentHours: document.getElementById("currentHours"),
    aiTime: document.getElementById("aiTime"),
    timeSaved: document.getElementById("timeSaved"),
    grossSavings: document.getElementById("grossSavings"),
    netSavings: document.getElementById("netSavings"),
    yearlySavings: document.getElementById("yearlySavings"),
    roiPercent: document.getElementById("roiPercent"),
  };

  const toggle = document.getElementById("featureToggle");
  const labelLeft = document.getElementById("labelLeft");
  const labelRight = document.getElementById("labelRight");

  function updateLabels() {
    labels.minutesLabel.textContent = `${inputs.minutesPerDoc.value} minutes`;
    labels.docsLabel.textContent = `${inputs.docsPerMonth.value} invoices`;
    labels.peopleLabel.textContent = `${inputs.peopleCount.value} people`;
    labels.wageLabel.textContent = `$${inputs.hourlyWage.value}/hour`;
  }

  function calculate() {
    updateLabels();

    const m = +inputs.minutesPerDoc.value;
    const d = +inputs.docsPerMonth.value;
    const p = +inputs.peopleCount.value;
    const w = +inputs.hourlyWage.value;
    const aiCost = 49;

    const currentTime = (m * d * p) / 60;
    const aiTimeMinutesPerDoc = toggle.checked ? 0.25 : 0.5;
    const aiTime = (aiTimeMinutesPerDoc * d) / 60;

    const timeSaved = currentTime - aiTime;
    const gross = timeSaved * w;
    const net = gross - aiCost;
    const yearly = net * 12;
    const roi = ((net / aiCost) * 100).toFixed(0);

    labels.currentHours.textContent = `${currentTime.toFixed(1)}h`;
    labels.aiTime.textContent = `< ${Math.round(
      aiTime * 60
    )} minutes (~${Math.round(aiTimeMinutesPerDoc * 60)}s/doc)`;
    labels.timeSaved.textContent = `${timeSaved.toFixed(1)} hours`;
    labels.grossSavings.textContent = `$${gross.toFixed(0)}`;
    labels.netSavings.textContent = `$${net.toFixed(0)}`;
    labels.yearlySavings.textContent = `$${yearly.toFixed(0)}`;
    labels.roiPercent.textContent = `${roi}%`;
  }

  toggle.addEventListener("change", function () {
    labelLeft.classList.toggle("active", !this.checked);
    labelRight.classList.toggle("active", this.checked);
    calculate();
  });

  document.querySelectorAll('input[type="range"]').forEach((input) => {
    input.addEventListener("input", calculate);
  });

  // Init
  labelLeft.classList.toggle("active", !toggle.checked);
  labelRight.classList.toggle("active", toggle.checked);
  calculate();

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
