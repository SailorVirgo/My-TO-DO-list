document.getElementById("add-task-btn").addEventListener("click", () => {
    document.getElementById("task-modal").style.display = "block";
  });
  
  document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("task-modal").style.display = "none";
  });
  
  window.addEventListener("click", (event) => {
    if (event.target == document.getElementById("task-modal")) {
      document.getElementById("task-modal").style.display = "none";
    }
  });
  
  const form = document.getElementById("todo-form");
  const taskTitle = document.getElementById("task-title");
  const taskDesc = document.getElementById("task-desc");
  const taskDeadline = document.getElementById("task-deadline");
  const notStartedRow = document.getElementById("not-started-row");
  const inProgressRow = document.getElementById("in-progress-row");
  const completedRow = document.getElementById("completed-row");
  
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks saved to localStorage:", tasks);
  };
  
  const colors = ["#FFCDD2", "#E1BEE7", "#C5CAE9", "#BBDEFB", "#C8E6C9", "#FFF9C4", "#FFECB3"];
  
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const createTaskElement = (task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.setAttribute("draggable", "true");
    taskElement.setAttribute("data-id", task.id); // Store task ID in data attribute
    taskElement.innerHTML = `
      <p>${task.title}</p>
      <p>${task.desc}</p>
      <p>${task.deadline}</p>
      <button class="delete-btn">Delete</button>
    `;
  
    taskElement.style.backgroundColor = task.color;
  
    const deadline = dayjs(task.deadline);
    if (deadline.isBefore(dayjs())) {
      taskElement.style.backgroundColor = "red";
    } else if (deadline.isBefore(dayjs().add(2, "day"))) {
      taskElement.style.backgroundColor = "yellow";
    }
  
    taskElement.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });
  
    taskElement.addEventListener("dragstart", () => {
      taskElement.classList.add("is-dragging");
    });
  
    taskElement.addEventListener("dragend", () => {
      taskElement.classList.remove("is-dragging");
    });
  
    return taskElement;
  };
  
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
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
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
  
  renderTasks();
  