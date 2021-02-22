import { projectsList, projectId } from './projectClass.js'

function addProjectToData(project) {
  projectsList.push(project);
  localStorage.setItem("projectsListLocal", JSON.stringify(projectsList));
  localStorage.setItem('projectIdLocal', projectId);
}

function addTaskToProjectData(project, task) {
  let projectInList = findProjectInProjectsList(project);
  projectInList.addTask(task);
  localStorage.setItem("projectsListLocal", JSON.stringify(projectsList));

  return projectInList.tasks.slice(-1)[0];
}

function removeTaskFromProject(task) {
  let project = findProjectFromTask(task);
  let projectInList = findProjectInProjectsList(project);
  let taskId = findTaskIDInDom(task);
  
  projectInList.removeTask(taskId);
  localStorage.setItem("projectsListLocal", JSON.stringify(projectsList));
}

function updateTaskStatus(task, status) {
  let projectInList = findProjectInProjectsList(findProjectFromTask(task));
  let taskId = findTaskIDInDom(task);

  projectInList.updateTaskStatus(taskId, status);
  localStorage.setItem("projectsListLocal", JSON.stringify(projectsList));
}

function checkProjectCompletion(task) {
  let project = findProjectFromTask(task);
  let projectInList = findProjectInProjectsList(project);

  let incompleteTask = projectInList.tasks.find(task => task.completed === false);
  if (!incompleteTask) {
    return project;
  }
}

function deleteProjectFromData(project) {
  let projectInList = findProjectInProjectsList(project);
  let projectIndex = projectsList.indexOf(projectInList);
  projectsList.splice(projectIndex, 1);
  localStorage.setItem("projectsListLocal", JSON.stringify(projectsList));
}

function findProjectInProjectsList(project) {
  return projectsList.find(proj => proj.id == project.getAttribute('data-id'));
}

function findProjectFromTask(task) {
  return task.closest('.project');
}

function findTaskIDInDom(task) {
  return task.getAttribute('data-id');
}

export { 
  addProjectToData, 
  addTaskToProjectData, 
  removeTaskFromProject, 
  updateTaskStatus, 
  checkProjectCompletion, 
  deleteProjectFromData,
 }