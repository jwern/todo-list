import './style.scss'
import { addProjectToPage, addNewTask, addTaskToProject } from './buildProject'
import { addProjectToData } from './storeProject'
import { Project, projectsList, projectId } from './projectClass'
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

function createNewProject(project) {
  let newProject = new Project(project.name || project, project.tasks, project.id);
  addProjectToPage(newProject);
  addProjectToData(newProject);

  return newProject;
}

function storageAvailable(type) { // LocalStorage check taken from MDN docs
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

const loadProjectsList = (() => { // IFFE - automatically run on page load
  if (storageAvailable('localStorage')) {
    let storedProjects = localStorage.getItem('projectsListLocal');
    if (storedProjects) {
      loadStoredProjects(storedProjects);
    } else {
      addDefaultProject();
    }
  } else {
    addDefaultProject();
  }
})()

function loadStoredProjects(localProjects) {
  projectId = Number(localStorage.getItem('projectIdLocal'));
  projectsList = JSON.parse(localProjects).map(function(obj) {
    return createNewProject(obj);
  });
  
  let projectsDivs = document.querySelectorAll('.project');
 
  projectsList.forEach(project => {
    let projectDiv = Array.from(projectsDivs).find(rightDiv => rightDiv.getAttribute('data-id') == project.id);
    let projectTaskList = projectDiv.querySelector('.project-items');
    project.tasks.forEach(task => addTaskToProject(projectTaskList, task));
  });
}

function addDefaultProject() {
  createNewProject("Make My First Project");
  let project = document.querySelector('.project');

  let firstTask = { 
    name: "Try making a project with a task", 
    due: "2072-01-28", 
    description: `
    To make a new project, write your project's name in the box in the upper-right corner of the page and then hit the green '+' button.  
    To add a task to the project, click the '+ add task' button inside the project's box.
    `, 
    priority: "Medium", 
  };
  let secondTask = {
    name: "Mark off tasks when they're finished",
    due: "2072-01-29",
    description: `
    Once you've completed a task (like the one above!), check it off by selecting the task to reveal its details, 
    then clicking the 'Mark as finished' button.`,
    priority: "Low",
  }

  addNewTask(project, firstTask);
  addNewTask(project, secondTask);
}
