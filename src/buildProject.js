import * as addTaskFormElements from './addTaskFormElements'
import { addTaskToProjectData, removeTaskFromProject, updateTaskStatus } from './storeProject'

function buildEmptyProject(project) {
  let projectContainer = createElementWithClass('div', 'project');
  projectContainer.setAttribute('data-id', project.id);

  let projectHeading = buildHeading(project.name);
  let projectItemsList = buildItemsList();
  let projectAddTask = buildAddTaskButton();

  projectContainer.append(projectHeading);
  projectContainer.append(projectItemsList);
  projectContainer.append(projectAddTask);

  return projectContainer;
}

function addProjectToPage(project) {
  let projectsContainer = document.querySelector('.projects-list');
  projectsContainer.append(buildEmptyProject(project));
}

function buildHeading(name) {
  let projectHeading = createElementWithClass('div', 'project-heading');

  let projectTitle = createElementWithClass('h2', 'project-title');
  projectTitle.innerText = name;

  let projectDivider = createElementWithClass('div', 'divider');

  projectHeading.append(projectTitle);
  projectHeading.append(projectDivider);

  return projectHeading;
}

function buildAddTaskButton() {
  let projectAddTaskDiv = createElementWithClass('div', 'add-new-task');

  let projectAddTaskButton = createElementWithClass('div', 'new-task-button');
  projectAddTaskButton.innerText = "+ add task";
  projectAddTaskButton.addEventListener('click', createNewTask);

  projectAddTaskDiv.append(projectAddTaskButton);

  return projectAddTaskDiv;
}

function buildTaskFinishedButton() {
  let projectTaskFinishedDiv = createElementWithClass('li', 'details-complete');
  projectTaskFinishedDiv.classList.add('button');
  projectTaskFinishedDiv.innerText = "Mark as finished";
  markCompleteListener(projectTaskFinishedDiv);

  return projectTaskFinishedDiv;
}

function buildDeleteTaskButton() {
  let deleteTaskButtonDiv = createElementWithClass('li', 'details-delete');
  deleteTaskButtonDiv.classList.add('button');
  deleteTaskButtonDiv.innerText = "Delete task";
  deleteTaskListener(deleteTaskButtonDiv);

  return deleteTaskButtonDiv;
}

function buildItemsList() {
  return createElementWithClass('ul', 'project-items');
}

function buildItemsTask(data) {
  let task = createElementWithClass('li', 'project-task');
  task.setAttribute('data-id', data.id);
  task.innerText = data.name;

  let taskDescriptions = buildTasksDescription(data);
  task.append(taskDescriptions);
  subMenuListener(task);

  return task;
}

function buildTasksDescription(data) {
  let taskDescriptions = createElementWithClass('ul', 'project-task-details');
  taskDescriptions.classList.add('hidden');

  let taskFinishedButton = buildTaskFinishedButton();
  let deleteTaskButton = buildDeleteTaskButton();

  taskDescriptions.append(taskFinishedButton);
  taskDescriptions.append(deleteTaskButton);

  for (let info in data) {
    if (info != "name" && info != "id") {
      let infoLi = createElementWithClass('li', 'details');
      let infoCapitalized = info[0].toUpperCase().concat(info.slice(1));
      infoLi.innerText = `${infoCapitalized}: ${data[info]}`;
      taskDescriptions.append(infoLi);
    }
  }

  return taskDescriptions;
}

function subMenuListener(button) {
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    openSubMenu(e.target);
  }), true;
}

function openSubMenu(project) {
  let sub = project.querySelector('.project-task-details');
  if (sub != null) {
    sub.classList.toggle('hidden');
  };
}

function markCompleteListener(button) {
  button.addEventListener('click', markAsComplete);
}

function markAsComplete() {
  let task = this.closest('.project-task');
  task.classList.toggle('checkedoff');

  if (task.classList.contains('checkedoff')) {
    this.innerText = "Finished!";
    updateTaskStatus(task, true);
    // checkProjectCompletion(this);
  } else {
    this.innerText = "Mark as finished";
    updateTaskStatus(task, false);
  };
}

function deleteTaskListener(button) {
  button.addEventListener('click', deleteTask);
}

function deleteTask() {
  let task = this.closest('.project-task');
  let taskList = task.closest('.project-items');
  if (confirm("Delete this task?")) {
    removeTaskFromProject(task);
    taskList.removeChild(task);
  }
}

function createNewTask() {
  let project = this.closest('.project');
  let projectTaskList = project.querySelector('.project-items');

  let taskForm = buildItemTaskForm();
  projectTaskList.append(taskForm);

  taskForm.addEventListener('submit', event => {
    event.preventDefault();
    if (event.submitter.value === "Cancel") {
      projectTaskList.removeChild(taskForm);
    } else {
      let taskData = Object.fromEntries(new FormData(event.target).entries());  
      let taskObject = addTaskToProjectData(project, taskData);
      addTaskToProject(projectTaskList, taskObject);
      projectTaskList.removeChild(taskForm);
    }
  });
}

function addTaskToProject(taskList, newTask) {
  let task = buildItemsTask(newTask);
  taskList.append(task);
}

function buildItemTaskForm() {
  let taskForm = createElementWithClass('form', 'task-form');

  let taskNameInput = createInputElement(addTaskFormElements.taskNameAttributes);
  let taskDueDate = createInputElement(addTaskFormElements.taskDueDateAttributes);
  let taskDescription = createInputElement(addTaskFormElements.taskDescriptionAttributes);
  let taskPriority = createInputElement(addTaskFormElements.taskPriorityAttributes);
  let taskNameSubmit = createInputElement(addTaskFormElements.taskNameSubmitAttributes);
  let taskCancel = createInputElement(addTaskFormElements.taskCancelAttributes);
  
  let formElements = [
    taskNameInput,
    taskDueDate,
    taskDescription,
    taskPriority,
    taskNameSubmit,
    taskCancel
  ]

  for (let element of formElements) {
    taskForm.append(element);
  }

  return taskForm;
}

function createInputElement(attributes) {
  let inputElement = document.createElement('input');
  for (let pair in attributes) {
    inputElement.setAttribute(pair, attributes[pair]);
  }

  return inputElement;
}

function createElementWithClass(elementType, className) {
  let newElement = document.createElement(elementType);
  newElement.classList.add(className);

  return newElement;
}

export { buildEmptyProject, addProjectToPage, openSubMenu, markAsComplete }