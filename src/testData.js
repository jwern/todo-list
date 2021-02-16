// SAMPLE DATA:
// const projectData = {
//   name: "Try To Hook Up Data",
//   tasks: [
//     {
//       name: "Testing Project",
//       due: "3/1/21",
//       description: "Here are some notes about this item, what if our notes were pretty long? Like we have a TON to say about this item. Way more than we should put on a single note, really.",
//       priority: "High",
//     },
//     {
//       name: "Use Test Data",
//       due: "3/2/21",
//       description: "Here are some notes about this item.",
//       priority: "Low",
//     },
//   ],
// }

class Task {
  constructor(task, taskId) {
    this.name = task.name;
    this.due = task.due;
    this.description = task.description;
    this.priority = task.priority;
    this.id = taskId;
    this.completed = false;
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

  removeTask(taskId) {
    let taskToRemove = this.tasks.indexOf(this.findTaskInProject(taskId));
    this.tasks.splice(taskToRemove, 1);
  }

  updateTaskStatus(taskId, status) {
    let taskToUpdate = this.findTaskInProject(taskId);
    taskToUpdate.completed = status;
  }

  findTaskInProject(taskId) {
    return this.tasks.find(task => task.id == taskId)
  }

  static assignId() {
    return projectId++;
  }
}

let projectsList = [];
let projectId = 1;

export { Project, projectsList }