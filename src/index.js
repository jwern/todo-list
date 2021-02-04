import './style.scss'
// Uncomment to enable masonry layout
// FlexMasonry.init('.projects-list');

const projectTasks = document.querySelectorAll('.project-task');
const projectTasksComplete = document.querySelectorAll('.details-complete');

projectTasks.forEach(function(task) {
  task.addEventListener('click', function(e) {
    e.stopPropagation();
    openSubMenu(e.target);
  }), true});

projectTasksComplete.forEach(function(task) {
  task.addEventListener('click', markAsComplete);
});

function openSubMenu(project) {
  let sub = project.querySelector('.project-task-details');
  if (sub != null) {
    sub.classList.toggle('hidden');
  };
}

function markAsComplete() {
  let task = this.closest('.project-task');
  task.classList.toggle('checkedoff');

  if (task.classList.contains('checkedoff')) {
    this.innerText = "Finished!";
  } else {
    this.innerText = "Mark as finished";
  };
}