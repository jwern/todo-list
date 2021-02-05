function buildEmptyProject(projectName) {
  let projectContainer = createElementWithClass('div', 'project');

  let projectHeading = buildProjectHeading(projectName);
  let projectItemsList = buildProjectItemsList();
  let projectAddTask = buildProjectTaskButton();

  projectContainer.append(projectHeading);
  projectContainer.append(projectItemsList);
  projectContainer.append(projectAddTask);

  return projectContainer;
}

function buildProjectHeading(name) {
  let projectHeading = createElementWithClass('div', 'project-heading');

  let projectTitle = createElementWithClass('h2', 'project-title');
  projectTitle.innerText = name;

  let projectDivider = createElementWithClass('div', 'divider');

  projectHeading.append(projectTitle);
  projectHeading.append(projectDivider);

  return projectHeading;
}

function buildProjectTaskButton() {
  let projectAddTaskDiv = createElementWithClass('div', 'add-new-task');

  let projectAddTaskButton = createElementWithClass('div', 'new-task-button');
  projectAddTaskButton.innerText = "+ add task";
  projectAddTaskButton.addEventListener('click', createNewTask);

  projectAddTaskDiv.append(projectAddTaskButton);

  return projectAddTaskDiv;
}

function buildProjectItemsList() {
  return createElementWithClass('ul', 'project-items');
}

function buildProjectItemsTask(taskName) {
  let task = createElementWithClass('li', 'project-task');
  task.innerText = taskName;
  return task;
}

function createNewTask() {
  let projectTaskList = this.closest('.project').querySelector('.project-items');

  let task = buildProjectItemsTask("Test Task");
  projectTaskList.append(task);
}

function createElementWithClass(elementType, className) {
  let newElement = document.createElement(elementType);
  newElement.classList.add(className);

  return newElement;
}

export { buildEmptyProject }