// Event listener to open the task modal when the "Add Task" button is clicked
document.getElementById("add-task-btn").addEventListener("click", () => {
    document.getElementById("task-modal").style.display = "block";
  });
  
  // Event listener to close the task modal when the close button is clicked
  document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("task-modal").style.display = "none";
  });
  
  // Event listener to close the task modal when clicking outside of the modal
  window.addEventListener("click", (event) => {
    if (event.target == document.getElementById("task-modal")) {
      document.getElementById("task-modal").style.display = "none";
    }
  });
  
  // Get form and task input elements
  const form = document.getElementById("todo-form");
  const taskTitle = document.getElementById("task-title");
  const taskDesc = document.getElementById("task-desc");
  const taskDeadline = document.getElementById("task-deadline");
  
  // Get columns for task statuses
  const notStartedRow = document.getElementById("not-started-row");
  const inProgressRow = document.getElementById("in-progress-row");
  const completedRow = document.getElementById("completed-row");
  
  // Retrieve tasks from localStorage or initialize an empty array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  // Save tasks to localStorage
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks saved to localStorage:", tasks);
  };
  
  // Define an array of colors for task backgrounds
  const colors = ["#FFCDD2", "#E1BEE7", "#C5CAE9", "#BBDEFB", "#C8E6C9", "#FFF9C4", "#FFECB3"];
  
  // Get a random color from the colors array
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Create a task element with drag-and-drop and delete functionality
  const createTaskElement = (task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.setAttribute("draggable", "true");
    taskElement.setAttribute("data-id", task.id); // Store task ID in data attribute
    taskElement.innerHTML = `
      <p><strong>${task.title}</strong></p>
      <p>${task.desc}</p>
      <p><strong>${task.deadline}<strong></p>
      <button class="delete-btn">Delete</button>
    `;
  
    taskElement.style.backgroundColor = task.color;
  
    // Highlight overdue tasks
    const deadline = dayjs(task.deadline);
    if (deadline.isBefore(dayjs())) {
      taskElement.style.backgroundColor = "red";
    } else if (deadline.isBefore(dayjs().add(2, "day"))) {
      taskElement.style.backgroundColor = "yellow";
    }
  
    // Add event listener to delete the task
    taskElement.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });
  
    // Add event listeners for drag-and-drop functionality
    taskElement.addEventListener("dragstart", () => {
      taskElement.classList.add("is-dragging");
    });
  
    taskElement.addEventListener("dragend", () => {
      taskElement.classList.remove("is-dragging");
    });
  
    return taskElement;
  };
  
  // Render tasks in their respective columns
  const renderTasks = () => {
    notStartedRow.innerHTML = "<h3 class='heading'>Not Yet Started</h3>";
    inProgressRow.innerHTML = "<h3 class='heading'>In Progress</h3>";
    completedRow.innerHTML = "<h3 class='heading'>Completed</h3>";
  
    tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      if (task.status === "not-started") {
        notStartedRow.appendChild(taskElement);
      } else if (task.status === "in-progress") {
        inProgressRow.appendChild(taskElement);
      } else if (task.status === "completed") {
        completedRow.appendChild(taskElement);
      }
    });
    console.log("Tasks rendered:", tasks);
  };
  
  // Event listener for form submission to add a new task
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(), // Generate a unique ID for the task
      title: taskTitle.value,
      desc: taskDesc.value,
      deadline: taskDeadline.value,
      status: "not-started",
      color: getRandomColor()
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    form.reset();
    document.getElementById("task-modal").style.display = "none";
  });
  
  // Initial rendering of tasks on page load
  renderTasks();
  