import './style.scss'
// Uncomment to enable masonry layout
// FlexMasonry.init('.projects-list');

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