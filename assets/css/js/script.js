// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Create a task card
function createTaskCard(task) {
  return `<div class="task-card" data-id="${task.id}">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
            <button class="btn btn-danger btn-sm delete-task">Delete</button>
          </div>`;
}

// Render the task list and make cards draggable
function renderTaskList() {
  $('#todo-cards').html('');
  $('#in-progress-cards').html('');
  $('#done-cards').html('');

  taskList.forEach(task => {
    const taskCard = createTaskCard(task);
    $(`#${task.status}-cards`).append(taskCard);
  });

  $('.task-card').draggable({
    revert: 'invalid',
    start: function(event, ui) {
      $(this).css('z-index', 1000);
    },
    stop: function(event, ui) {
      $(this).css('z-index', '');
    }
  });

  $('.lane').droppable({
    accept: '.task-card',
    drop: function(event, ui) {
      const taskId = ui.helper.data('id');
      const newStatus = $(this).attr('id');
      updateTaskStatus(taskId, newStatus);
    }
  });

  $('.delete-task').click(function() {
    const taskId = $(this).closest('.task-card').data('id');
    deleteTask(taskId);
  });
}

// Handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const title = $('#task-title').val();
  const description = $('#task-description').val();
  const newTask = {
    id: generateTaskId(),
    title,
    description,
    status: 'todo'
  };
  taskList.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  localStorage.setItem('nextId', nextId);
  renderTaskList();
  $('#formModal').modal('hide');
}

// Handle deleting a task
function deleteTask(taskId) {
  taskList = taskList.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// Handle dropping a task into a new status lane
function updateTaskStatus(taskId, newStatus) {
  const task = taskList.find(task => task.id === taskId);
  task.status = newStatus.replace('-cards', '');
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $('#add-task-form').submit(handleAddTask);
});
