function buildEmptyProject() {
  let projectContainer = document.createElement('div');
  projectContainer.classList.add('project');

  let projectHeading = buildProjectHeading("Default Project");
  let projectItemsList = buildProjectItemsList();
  let projectAddTask = buildProjectTaskButton();

  projectContainer.append(projectHeading);
  projectContainer.append(projectItemsList);
  projectContainer.append(projectAddTask);

  return projectContainer;
}

function buildProjectHeading(name) {
  let projectHeading = document.createElement('div');
  projectHeading.classList.add('project-heading');

  let projectTitle = document.createElement('h2');
  projectTitle.classList.add('project-title');
  projectTitle.innerText = name;

  let projectDivider = document.createElement('div');
  projectDivider.classList.add('divider');

  projectHeading.append(projectTitle);
  projectHeading.append(projectDivider);

  return projectHeading;
}

function buildProjectTaskButton() {
  let projectAddTask = document.createElement('div');
  projectAddTask.classList.add('add-new-task');

  let projectAddTaskButton = document.createElement('div');
  projectAddTaskButton.classList.add('new-task-button');
  projectAddTaskButton.innerText = "+ add task";

  projectAddTask.append(projectAddTaskButton);

  return projectAddTask;
}

function buildProjectItemsList() {
  let projectItemsList = document.createElement('ul');
  projectItemsList.classList.add('project-items');

  return projectItemsList;
}

export { buildEmptyProject }