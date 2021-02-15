const taskNameAttributes = {
  type: 'text',
  name: 'name',
  placeholder: 'Task Name',
}

const taskDueDateAttributes = {
  type: 'date',
  name: 'due',
  placeholder: 'Due Date',
};

const taskDescriptionAttributes = {
  type: 'text',
  name: 'description',
  placeholder: 'Task Description',
}

const taskPriorityAttributes = {
  type: 'text',
  name: 'priority',
  placeholder: 'Task Priority',
}

const taskNameSubmitAttributes = {
  type: 'submit',
  value: 'Add Task',
}

export { 
  taskNameAttributes, 
  taskDueDateAttributes, 
  taskDescriptionAttributes, 
  taskPriorityAttributes, 
  taskNameSubmitAttributes 
}