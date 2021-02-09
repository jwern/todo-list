import './style.scss'
// Uncomment to enable masonry layout
// FlexMasonry.init('.projects-list');
import { buildEmptyProject } from './buildProject'
import { openSubMenu } from './buildProject'

let projectsList = document.querySelector('.projects-list');
const createProjectForm = document.getElementById('create-project-form');

createProjectForm.addEventListener('submit', event => {
  event.preventDefault();
  let projectName = Object.fromEntries(new FormData(event.target).entries());
  if (projectName.name) {
    projectsList.append(buildEmptyProject(projectName.name));
  } else {
    projectsList.append(buildEmptyProject("Unnamed Project"));
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

// add to each new task
// function openSubMenu(project) {
//   let sub = project.querySelector('.project-task-details');
//   if (sub != null) {
//     sub.classList.toggle('hidden');
//   };
// }

// add to each new task
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

// function checkProjectCompletion(task) {
//   let parentProject = task.closest('.project');
//   let projects = parentProject.querySelectorAll('.project-task');
  
//   // Note: this will probably actually use values from the project object
// }


projectsList.append(buildEmptyProject("Default Project"));

// TO DO:
// Connect add task button
// Connect create project button
