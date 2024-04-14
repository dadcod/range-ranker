import { InteractiveRangeChart } from "./chart.js";

const chart = new InteractiveRangeChart();
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#app").appendChild(chart);
});
