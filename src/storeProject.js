import { projectsList, Project } from './testData.js'

function addProjectToData(project) {
  projectsList.push(project);
}

function addTaskToProjectData(project, task) {
  let projectInArray = projectsList.find(proj => proj.id == project.getAttribute('data-id'));
  projectInArray.addTask(task);
}

export { addProjectToData, addTaskToProjectData }