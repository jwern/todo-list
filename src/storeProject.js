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
  let taskId = task.getAttribute('data-id');
  
  projectInArray.removeTask(taskId);
}

function findProjectInProjectsList(project) {
  return projectsList.find(proj => proj.id == project.getAttribute('data-id'));
}

export { addProjectToData, addTaskToProjectData, removeTaskFromProject }