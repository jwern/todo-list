const taskNameAttributes = {
  type: 'text',
  name: 'name',
  class: 'task-form-input task-name',
  placeholder: 'Task Name',
}

const taskDueDateAttributes = {
  type: 'text',
  onfocus: "(this.type='date')", 
  onblur: "(this.type='text')",
  name: 'due',
  class: 'task-form-input task-due',
  placeholder: 'Due Date',
};

const taskDescriptionAttributes = {
  type: 'text',
  name: 'description',
  class: 'task-form-input task-description',
  placeholder: 'Task Description',
}

const taskPriorityAttributes = {
  type: 'text',
  name: 'priority',
  class: 'task-form-input task-priority',
  placeholder: 'Task Priority',
}

const taskNameSubmitAttributes = {
  type: 'submit',
  class: 'task-form-submit button',
  value: 'Create Task',
}

const taskCancelAttributes = {
  type: 'submit',
  class: 'task-form-cancel button',
  value: 'Cancel',
}

export { 
  taskNameAttributes, 
  taskDueDateAttributes, 
  taskDescriptionAttributes, 
  taskPriorityAttributes, 
  taskNameSubmitAttributes,
  taskCancelAttributes
}