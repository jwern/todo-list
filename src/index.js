import './style.scss'
// Uncomment to enable masonry layout
// FlexMasonry.init('.projects-list');
import { buildEmptyProject } from './buildProject'

const projectTasks = document.querySelectorAll('.project-task');
const projectTasksComplete = document.querySelectorAll('.details-complete');
let projectsList = document.querySelector('.projects-list');

const createProjectForm = document.getElementById('create-project-form');
createProjectForm.addEventListener('submit', event => {
  event.preventDefault();
  let projectName = Object.fromEntries(new FormData(event.target).entries());
  if (projectName.name) {
    projectsList.append(buildEmptyProject(projectName.name));
  } else {
    alert("Please input a name");
  }
  event.target.reset();
});

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
function openSubMenu(project) {
  let sub = project.querySelector('.project-task-details');
  if (sub != null) {
    sub.classList.toggle('hidden');
  };
}

// add to each new task
function markAsComplete() {
  let task = this.closest('.project-task');
  task.classList.toggle('checkedoff');

  if (task.classList.contains('checkedoff')) {
    this.innerText = "Finished!";
  } else {
    this.innerText = "Mark as finished";
  };
}



projectsList.append(buildEmptyProject("Default Project"));

// TO DO:
// Connect add task button
// Connect create project button
