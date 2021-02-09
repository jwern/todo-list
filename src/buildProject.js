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

function buildItemsTask(taskName) {
  let task = createElementWithClass('li', 'project-task');
  task.innerText = taskName;

  let taskDescriptions = buildTasksDescription();
  task.append(taskDescriptions);
  subMenuListener(task);
  return task;
}

function buildTasksDescription() {
  let taskDescriptions = createElementWithClass('ul', 'project-task-details');
  taskDescriptions.classList.add('hidden');

  let taskFinishedButton = buildTaskFinishedButton();
  let editTaskButton = buildEditTaskButton();

  taskDescriptions.append(taskFinishedButton);
  taskDescriptions.append(editTaskButton);
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
  console.log(this);
}

function createNewTask() {
  let projectTaskList = this.closest('.project').querySelector('.project-items');

  let task = buildItemsTask("Test Task");
  projectTaskList.append(task);
}

function createElementWithClass(elementType, className) {
  let newElement = document.createElement(elementType);
  newElement.classList.add(className);

  return newElement;
}

export { buildEmptyProject, openSubMenu, markAsComplete }