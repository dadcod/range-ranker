document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll(".draggable");
  const rangeChart = document.getElementById("range-chart");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
    draggable.addEventListener("dragend", dragEnd);
  });

  rangeChart.addEventListener("dragover", dragOver);
  rangeChart.addEventListener("drop", drop);

  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);
  }

  function dragEnd(e) {
    e.target.style.display = "block";
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);
    const dropZone = e.target;

    if (dropZone === rangeChart || dropZone.classList.contains("range-label")) {
      rangeChart.appendChild(draggable);
      draggable.style.position = "absolute";
      draggable.style.left = `${
        e.clientX - rangeChart.offsetLeft - draggable.offsetWidth / 2
      }px`;
      draggable.style.top = `${
        e.clientY - rangeChart.offsetTop - draggable.offsetHeight / 2
      }px`;

      draggable.addEventListener("mousedown", initResize);
    }
  }

  function initResize(e) {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);

    function resize(e) {
      const draggable = e.target;
      const newWidth = e.clientX - draggable.getBoundingClientRect().left;
      if (newWidth > 50) {
        draggable.style.width = `${newWidth}px`;
      }
    }

    function stopResize() {
      window.removeEventListener("mousemove", resize);
    }
  }
});
