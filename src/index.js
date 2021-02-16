import './style.scss'
import { addProjectToPage } from './buildProject'
import { addProjectToData } from './storeProject'
import { Project } from './testData'
// Uncomment to enable masonry layout
// FlexMasonry.init('.projects-list');



const createProjectForm = document.getElementById('create-project-form');

createProjectForm.addEventListener('submit', event => {
  event.preventDefault();
  let projectName = Object.fromEntries(new FormData(event.target).entries());
  if (projectName.name) {
    createNewProject(projectName.name);
  } else {
    createNewProject("Unnamed Project");
  }
  event.target.reset();
});

function createNewProject(name) {
  let newProject = new Project(name);
  addProjectToPage(newProject);
  addProjectToData(newProject);
}

// const projectTasks = document.querySelectorAll('.project-task');
// const projectTasksComplete = document.querySelectorAll('.details-complete');

// // eventListener will need to be added every time a new task is created
// projectTasks.forEach(function(task) {
//   task.addEventListener('click', function(e) {
//     e.stopPropagation();
//     openSubMenu(e.target);
//   }), true});

// // add to each new task
// projectTasksComplete.forEach(function(task) {
//   task.addEventListener('click', markAsComplete);
// });

// function checkProjectCompletion(task) {
//   let parentProject = task.closest('.project');
//   let projects = parentProject.querySelectorAll('.project-task');
  
//   // Note: this will probably actually use values from the project object
// }


// projectsList.append(buildEmptyProject("Default Project"));

// TO DO:
// Connect add task button
// Connect create project button
