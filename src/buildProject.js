function buildEmptyProject(projectName) {
  let projectContainer = createElementWithClass('div', 'project');

  let projectHeading = buildProjectHeading(projectName);
  let projectItemsList = buildProjectItemsList();
  let projectAddTask = buildProjectAddTaskButton();

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

function buildProjectAddTaskButton() {
  let projectAddTaskDiv = createElementWithClass('div', 'add-new-task');

  let projectAddTaskButton = createElementWithClass('div', 'new-task-button');
  projectAddTaskButton.innerText = "+ add task";
  projectAddTaskButton.addEventListener('click', createNewTask);

  projectAddTaskDiv.append(projectAddTaskButton);

  return projectAddTaskDiv;
}

function buildProjectTaskFinishedButton() {
  let projectTaskFinishedDiv = createElementWithClass('li', 'details-complete');
  projectTaskFinishedDiv.classList.add('button');
  projectTaskFinishedDiv.innerText = "Mark as finished";
  return projectTaskFinishedDiv;
}

function buildProjectItemsList() {
  return createElementWithClass('ul', 'project-items');
}

function buildProjectItemsTask(taskName) {
  let task = createElementWithClass('li', 'project-task');
  task.innerText = taskName;

  let taskDescriptions = buildProjectTasksDescription();
  task.append(taskDescriptions);
  subMenuListener(task);
  return task;
}

function buildProjectTasksDescription() {
  let taskDescriptions = createElementWithClass('ul', 'project-task-details');
  taskDescriptions.classList.add('hidden');

  let taskFinishedButton = buildProjectTaskFinishedButton();
  taskDescriptions.append(taskFinishedButton);
  return taskDescriptions;
}

function subMenuListener(button) {
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    openSubMenu(e.target);
  }), true;
}

function openSubMenu(project) {
  console.log(project);
  let sub = project.querySelector('.project-task-details');
  console.log(sub);
  if (sub != null) {
    sub.classList.toggle('hidden');
  };
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

export { buildEmptyProject, openSubMenu }