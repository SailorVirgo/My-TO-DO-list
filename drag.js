// Get all rows for drag-and-drop functionality
const rows = document.querySelectorAll(".row");

rows.forEach((row) => {
  // Allow tasks to be dragged over the row
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

  // Handle task drop event and update task status
  row.addEventListener("drop", () => {
    const draggable = document.querySelector(".is-dragging");
    const taskId = Number(draggable.getAttribute("data-id")); // Retrieve task ID from data attribute
    console.log("Dragged Task ID:", taskId); // Log the taskId
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      // Update task status based on the row it was dropped in
      if (row.id === "not-started-row") {
        task.status = "not-started";
      } else if (row.id === "in-progress-row") {
        task.status = "in-progress";
      } else if (row.id === "completed-row") {
        task.status = "completed";
      }
      console.log(`Task ${task.title} moved to ${task.status}`);
      saveTasks();
      renderTasks();
    } else {
      console.error("Task not found:", taskId);
    }
  });
});

// Helper function to determine the element to insert the dragged task after
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
