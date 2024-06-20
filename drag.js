const rows = document.querySelectorAll(".row");

rows.forEach((row) => {
  row.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(row, e.clientY);
    const draggable = document.querySelector(".is-dragging");
    if (afterElement == null) {
      row.appendChild(draggable);
    } else {
      row.insertBefore(draggable, afterElement);
    }
  });
  
  row.addEventListener("drop", () => {
    const draggable = document.querySelector(".is-dragging");
    const taskId = Number(draggable.querySelector("h4").textContent);
    const task = tasks.find((t) => t.id === taskId);
    if (row.id === "not-started-row") {
      task.status = "not-started";
    } else if (row.id === "in-progress-row") {
      task.status = "in-progress";
    } else if (row.id === "completed-row") {
      task.status = "completed";
    }
    saveTasks();
    renderTasks();
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".task:not(.is-dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
