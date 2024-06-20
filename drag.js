const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".row");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
    });
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll()

};

