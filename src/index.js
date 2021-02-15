import './style.scss'
import { buildEmptyProject, openSubMenu, markAsComplete } from './buildProject'
import { Project } from './testData.js'
// Uncomment to enable masonry layout
// FlexMasonry.init('.projects-list');


let projectsList = document.querySelector('.projects-list');
const createProjectForm = document.getElementById('create-project-form');

createProjectForm.addEventListener('submit', event => {
  event.preventDefault();
  let projectName = Object.fromEntries(new FormData(event.target).entries());
  if (projectName.name) {
    projectsList.append(buildEmptyProject(new Project(projectName.name)));
  } else {
    projectsList.append(buildEmptyProject(new Project("Unnamed Project")));
  }
  event.target.reset();
});

const projectTasks = document.querySelectorAll('.project-task');
const projectTasksComplete = document.querySelectorAll('.details-complete');

// eventListener will need to be added every time a new task is created
projectTasks.forEach(function(task) {
  task.addEventListener('click', function(e) {
    e.stopPropagation();
    openSubMenu(e.target);
  }), true});

// add to each new task
projectTasksComplete.forEach(function(task) {
  task.addEventListener('click', markAsComplete);
});

// function checkProjectCompletion(task) {
//   let parentProject = task.closest('.project');
//   let projects = parentProject.querySelectorAll('.project-task');
  
//   // Note: this will probably actually use values from the project object
// }


// projectsList.append(buildEmptyProject("Default Project"));

// TO DO:
// Connect add task button
// Connect create project button
