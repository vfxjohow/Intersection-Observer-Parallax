// All sections containing parallax elements
const sections = document.querySelectorAll(".js-parallax");

//Generate parallax threshold array
function buildThresholdList() {
  let thresholds = [];
  let numSteps = 100;
  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }
  thresholds.push(0);
  return thresholds;
}

//IntersectionObserver settings generating list of thresholds
const options = {
  root: null,
  rootMargin: "0px",
  threshold: buildThresholdList(),
};

// IntersectionObserver callback function
function callback(entries) {
  entries.forEach((entry) => {
    const elementOffsetBottom = entry.boundingClientRect.bottom;
    const prallaxList = Object.values(entry.target.children);

    if (entry.isIntersecting) {
      prallaxList.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax"));
        const yPosition = elementOffsetBottom / speed.toString();

        el.style.transform = `translate(0 , ${yPosition}px)`;
      });
    }
  });
}

// run IntersectionObserver
const observer = new IntersectionObserver(callback, options);
sections.forEach((el) => {
  observer.observe(el);
});
