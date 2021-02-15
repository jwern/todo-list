const projectData = {
  name: "Try To Hook Up Data",
  tasks: [
    {
      name: "Testing Project",
      due: "3/1/21",
      description: "Here are some notes about this item, what if our notes were pretty long? Like we have a TON to say about this item. Way more than we should put on a single note, really.",
      priority: "High",
    },
    {
      name: "Use Test Data",
      due: "3/2/21",
      description: "Here are some notes about this item.",
      priority: "Low",
    },
  ],
}

class Task {
  constructor(task, taskId) {
    this.name = task.name;
    this.due = task.due;
    this.description = task.description;
    this.priority = task.priority;
    this.id = taskId;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.id = Project.assignId();
  }

  addTask(taskObject) {
    let taskId = this.tasks.length + 1;
    let task = new Task(taskObject, taskId);
    this.tasks.push(task);
  }

  static assignId() {
    return projectId++;
  }
}

let projectsList = [];
let projectId = 1;

// projectsList.push(new Project(projectData.name));
// projectsList.push(new Project("Make a Project"));
// projectsList[0].addTask(projectData.tasks[0]);
// projectsList[0].addTask(projectData.tasks[1]);
// console.log(projectsList);
// console.log(projectsList[0].tasks[0]);
// let myFirstProject = new Project("First Project");
// console.log(myFirstProject);
// let myProject = new Project("Make a Project");
// myProject.addTask("Try making a task", "Just make a task");
// myProject.addTask("Here's a second task", "We made a second task");
// console.log(myProject);

export { Project, projectsList }