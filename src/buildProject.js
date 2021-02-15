import { projectData } from './testData'

function buildEmptyProject(projectName) {
  let projectContainer = createElementWithClass('div', 'project');

  let projectHeading = buildHeading(projectName);
  let projectItemsList = buildItemsList();
  let projectAddTask = buildAddTaskButton();

  projectContainer.append(projectHeading);
  projectContainer.append(projectItemsList);
  projectContainer.append(projectAddTask);

  return projectContainer;
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

function buildEditTaskButton() {
  let editTaskButtonDiv = createElementWithClass('li', 'details-edit');
  editTaskButtonDiv.classList.add('button');
  editTaskButtonDiv.innerText = "Edit task";
  editTaskListener(editTaskButtonDiv);
  return editTaskButtonDiv;
}

function buildItemsList() {
  return createElementWithClass('ul', 'project-items');
}

function buildItemsTask(data) {
  let task = createElementWithClass('li', 'project-task');
  task.innerText = data["task-name"];

  let taskDescriptions = buildTasksDescription(data);
  task.append(taskDescriptions);
  subMenuListener(task);
  return task;
}

function buildTasksDescription(data) {
  let taskDescriptions = createElementWithClass('ul', 'project-task-details');
  taskDescriptions.classList.add('hidden');

  let taskFinishedButton = buildTaskFinishedButton();
  let editTaskButton = buildEditTaskButton();

  taskDescriptions.append(taskFinishedButton);
  taskDescriptions.append(editTaskButton);

  for (let info in data) {
    let infoLi = createElementWithClass('li', 'details');
    infoLi.innerText = data[info];
    taskDescriptions.append(infoLi);
  }

  return taskDescriptions;
}

// function appendDescriptions(descriptionsUl, data) {
//   for (let info in data) {
//     for (let details in info) {
//       let newLi = createElementWithClass('li', 'details');
//       newLi.innerText = data[info][details];
//       descriptionsUl.append(newLi);
//     }
//   }
// }

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
    // checkProjectCompletion(this);
  } else {
    this.innerText = "Mark as finished";
  };
}

function editTaskListener(button) {
  button.addEventListener('click', editTask);
}

function editTask() {
  let task = this.closest('.project-task');
  console.log(task);
}

function createNewTask() {
  let projectTaskList = this.closest('.project').querySelector('.project-items');

  let taskForm = buildItemTaskForm();
  projectTaskList.append(taskForm);

  taskForm.addEventListener('submit', event => {
    event.preventDefault();
    let taskData = Object.fromEntries(new FormData(event.target).entries());
    let task = buildItemsTask(taskData);
    event.target.reset();
    projectTaskList.append(task);
    projectTaskList.removeChild(taskForm);
  });

  // let task = buildItemsTask();
  // projectTaskList.append(task);
}

function buildItemTaskForm() {
  let taskForm = createElementWithClass('form', 'task-form');

  let taskNameAttributes = [
    { input: 'type', value: 'text' },
    { input: 'name', value: 'task-name' },
    { input: 'placeholder', value: 'Task Name' },
  ];
  let taskNameInput = createInputElement(taskNameAttributes);
  
  let taskDueDateAttributes = [
    { input: 'type', value: 'text' },
    { input: 'name', value: 'task-due' },
    { input: 'placeholder', value: 'Due Date' },
  ];
  let taskDueDate = createInputElement(taskDueDateAttributes);

  let taskNameSubmitAttributes = [
    { input: 'type', value: 'submit' },
    { input: 'value', value: 'Add task' },
  ];
  let taskNameSubmit = createInputElement(taskNameSubmitAttributes);
  
  taskForm.append(taskNameInput);
  taskForm.append(taskDueDate);
  taskForm.append(taskNameSubmit);

  return taskForm;
}

function createInputElement(attributes) {
  let inputElement = document.createElement('input');
  for (let pair of attributes) {
    inputElement.setAttribute(pair.input, pair.value);
  }

  return inputElement;
}

function createElementWithClass(elementType, className) {
  let newElement = document.createElement(elementType);
  newElement.classList.add(className);

  return newElement;
}

export { buildEmptyProject, openSubMenu, markAsComplete }