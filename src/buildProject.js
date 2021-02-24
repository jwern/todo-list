import * as addTaskFormElements from './addTaskFormElements'
import { addTaskToProjectData, removeTaskFromProject, updateTaskStatus, checkProjectCompletion, deleteProjectFromData } from './storeProject'
import { addTaskButton, deleteProjectButton, taskFinishedButton, deleteTaskButton } from './projectButtons'

function buildEmptyProject(project) {
  let projectContainer = createElementWithClass('div', 'project');
  projectContainer.setAttribute('data-id', project.id);

  let projectHeading = buildHeading(project.name);
  let projectItemsList = buildItemsList();
  let projectAddTask = buildProjectButton(addTaskButton, createNewTask);
  let projetDeleteProject = buildProjectButton(deleteProjectButton, deleteProject);

  projectContainer.append(projectHeading);
  projectContainer.append(projectItemsList);
  projectContainer.append(projectAddTask);
  projectContainer.append(projetDeleteProject);

  return projectContainer;
}

function addProjectToPage(project) {
  let projectsContainer = document.querySelector('.projects-list');
  projectsContainer.append(buildEmptyProject(project));
  return projectsContainer;
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

function buildProjectButton(buttonObject, buttonEvent) {
  let buttonContainer = createElementWithClass('div', buttonObject["divClass"]);

  let button = createElementWithClass('div', buttonObject["buttonClass"]);
  button.innerText = buttonObject["buttonText"];
  button.addEventListener('click', () => {
    buttonEvent(button.closest('.project'));
  });

  buttonContainer.append(button);

  return buttonContainer;
}

function deleteProject(project) {
  if (confirm("Really delete?")) {
    let projectsContainer = document.querySelector('.projects-list');
    projectsContainer.removeChild(project);
    deleteProjectFromData(project);
  }
}

function buildTaskButton(buttonObject, varButtonEvent) {
  let button = createElementWithClass('li', buttonObject["divClass"]);
  button.classList.add('button');
  button.innerText = buttonObject["buttonText"];
  varButtonEvent(button);

  return button;
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

  if (data.completed === true) {
    task.classList.add('checkedoff');
  }
  
  return task;
}

function buildTasksDescription(data) {
  let taskDescriptions = createElementWithClass('ul', 'project-task-details');
  taskDescriptions.classList.add('hidden');

  let finishedButton = buildTaskButton(taskFinishedButton, markCompleteListener);
  let deleteButton = buildTaskButton(deleteTaskButton, deleteTaskListener);

  taskDescriptions.append(finishedButton);
  taskDescriptions.append(deleteButton);

  const excludedData = ["name", "id", "completed"];

  for (let info in data) {
    if (!excludedData.includes(info) ) {
      let infoLi = createElementWithClass('li', 'details');
      let infoCapitalized = info[0].toUpperCase().concat(info.slice(1));
      if (info === "due") {
        let dash = data[info].slice(4, 5);
        let year = dash + data[info].slice(0, 4);
        let date = data[info].slice(6);
        infoLi.innerText = `${infoCapitalized}: ${date}${year}`;
      } else {
        infoLi.innerText = `${infoCapitalized}: ${data[info]}`;
      }
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

    let allTasksFinished = checkProjectCompletion(task);
    if (allTasksFinished && confirm("All tasks complete!  Remove project?")) {
      deleteProject(allTasksFinished);
    };
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

function createNewTask(project) {
  let projectTaskList = project.querySelector('.project-items');

  let taskForm = buildItemTaskForm();
  projectTaskList.append(taskForm);

  let taskCancelButton = taskForm.querySelector('.task-form-cancel');

  taskCancelButton.addEventListener('click', () => {
    projectTaskList.removeChild(taskForm);
  });

  taskForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event);
    let taskData = Object.fromEntries(new FormData(event.target).entries());  
    addNewTask(project, taskData);
    projectTaskList.removeChild(taskForm);
  });
}

function addNewTask(project, taskData) {
  let projectTaskList = project.querySelector('.project-items');
  let taskObject = addTaskToProjectData(project, taskData);
  addTaskToProject(projectTaskList, taskObject);
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
  let taskPriority = createSelectElement(addTaskFormElements.taskPriorityAttributes);
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

function createSelectElement(attributes) {
  let selectElement = document.createElement('select');
  for (let pair in attributes) {
    if (pair === "selected") {
      let selectedOption = document.createElement('option');
      selectedOption.setAttribute("selected", "selected");
      selectedOption.setAttribute("value", " ");
      selectedOption.innerText = attributes[pair];
      selectElement.append(selectedOption);
    } else if (pair !== "options") {
      selectElement.setAttribute(pair, attributes[pair]);
    } else {
      attributes[pair].forEach(option => {
        let optionElement = document.createElement('option');
        optionElement.setAttribute("name", option);
        optionElement.innerText = option;
        selectElement.append(optionElement);
      });
    };
  }

  return selectElement;
}

function createElementWithClass(elementType, className) {
  let newElement = document.createElement(elementType);
  newElement.classList.add(className);

  return newElement;
}

export { addProjectToPage, addNewTask, addTaskToProject }