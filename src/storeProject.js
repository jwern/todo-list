import { projectsList, Project } from './testData.js'

function addProjectToData(project) {
  projectsList.push(project);
}

function addTaskToProjectData(project, task) {
  let projectInArray = findProjectInProjectsList(project);
  projectInArray.addTask(task);

  return projectInArray.tasks.slice(-1)[0];
}

function removeTaskFromProject(task) {
  let project = task.closest('.project');
  let projectInArray = findProjectInProjectsList(project);
  let taskId = findTaskIDInDom(task);
  
  projectInArray.removeTask(taskId);
}

function updateTaskStatus(task, status) {
  let projectInArray = findProjectInProjectsList(task.closest('.project'));
  let taskId = findTaskIDInDom(task);

  projectInArray.updateTaskStatus(taskId, status);
}

function findProjectInProjectsList(project) {
  return projectsList.find(proj => proj.id == project.getAttribute('data-id'));
}

function findTaskIDInDom(task) {
  return task.getAttribute('data-id');
}

export { addProjectToData, addTaskToProjectData, removeTaskFromProject, updateTaskStatus }