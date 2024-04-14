/**
 * A custom element that represents an interactive range chart.
 * The chart consists of three ranges that can be resized by dragging.
 * The ranges are positioned at the bottom of the chart and have a fixed height.
 * The chart is a simple background with vertical and horizontal lines.
 */
export class InteractiveRangeChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: relative;
                    height: 300px;
                    background: 
                        linear-gradient(to right, black 50%, transparent 50%) 50% / 1px 100%,
                        linear-gradient(to top, black 50%, transparent 50%) 0% 50% / 100% 1px,
                        lightgray;
                    background-repeat: no-repeat;
                }

                .range {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 50px;
                    background-color: #79a8f2;
                    color: white;
                    text-align: center;
                    line-height: 20px;
                    border-radius: 5px;
                    cursor: move; /* Default cursor for moving */
                }

                .range::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    width: 10px; /* Width of the resizable area */
                    cursor: ew-resize; /* Cursor changes in the resizable area */
                }
            </style>
            <div id="rangeA" class="range" style="bottom: 10%; height: 30%;">Range A: 10-40%</div>
            <div id="rangeB" class="range" style="bottom: 50%; height: 20%;">Range B: 50-70%</div>
            <div id="rangeC" class="range" style="bottom: 75%; height: 20%;">Range C: 75-95%</div>
        `;

    this.ranges = this.shadowRoot.querySelectorAll(".range");
    this.ranges.forEach((range) => this.initDraggable(range));
  }

  initDraggable(range) {
    const component = this; // Capture 'this' to use in event listeners
    range.onmousedown = (event) => {
      const orgX = event.clientX;
      const orgWidth = range.clientWidth;
      const orgY = event.clientY;
      const orgBottomPercentage = parseFloat(range.style.bottom);
      let mode = event.offsetX > orgWidth - 10 ? "resize" : "move";

      const onMouseMove = (event) => {
        if (mode === "resize") {
          const newX = event.clientX;
          range.style.width = Math.max(10, orgWidth + (newX - orgX)) + "px";
        } else {
          const newY = event.clientY;
          const newX = event.clientX;
          const newBottom =
            orgBottomPercentage -
            ((newY - orgY) / component.clientHeight) * 100;
          const newLeft = (range.style.bottom = `${newBottom}%`);

          range.style.left = `${(newX / component.clientWidth) * 100}%`;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      document.onmouseup = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
      };
    };

    range.ondragstart = () => false;
  }
}

customElements.define("interactive-range-chart", InteractiveRangeChart);
