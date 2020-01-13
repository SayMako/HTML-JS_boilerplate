import TaskModel from './TaskModel.js';

export default function TaskListModel(tasksStatus) {
  this.objType = 'MODEL_TASKLIST';
  this.taskList = [];
  this.tasksStatus = tasksStatus;

  const onReceiveTaskActions = {
    open: task => {
      task.dueDate = null;
    },
    done: task => {
      task.dueDate = new Date();
    },
  };

  this.onReceiveTaskAction = onReceiveTaskActions[tasksStatus];
}

TaskListModel.prototype.createTask = function(taskText) {
  if (taskText) {
    const newTask = new TaskModel(taskText);
    this.taskList.push(newTask);
    this.notifyModelUpdated();
  }
};

TaskListModel.prototype.recieveTask = function(task) {
  this.onReceiveTaskAction(task);
  this.taskList.push(task);
  this.notifyModelUpdated();
};

TaskListModel.prototype.removeTask = function(task) {
  const taskIndex = this.taskList.indexOf(task);
  this.taskList.splice(taskIndex, 1);
  this.notifyModelUpdated();
};

TaskListModel.prototype.updateTask = function(taskDetails) {
  const taskToUpdate = this.taskList.find(({ id }) => id === taskDetails.id);
  if (taskToUpdate) {
    Object.assign(taskToUpdate, taskDetails);
    this.notifyModelUpdated();
  }
};

TaskListModel.prototype.removeTaskWithId = function(taskId) {
  const taskToRemove = this.taskList.find(({ id }) => id === taskId);
  if (taskToRemove) {
    this.removeTask(taskToRemove);
  }
};

TaskListModel.prototype.removeAllTasks = function() {
  this.taskList = [];
  this.notifyModelUpdated();
};

TaskListModel.prototype.transferTask = function(taskId, newTaskList) {
  const taskToTransfer = this.taskList.find(({ id }) => id === taskId);
  if (taskToTransfer) {
    this.removeTask(taskToTransfer);
    newTaskList.recieveTask(taskToTransfer);
  }
};

TaskListModel.prototype.setTaskListUpdatedHandler = function(handler) {
  this.notifyModelUpdated = () => handler(this);
};

TaskListModel.prototype.getTasks = function(searchQuery, sorting) {
  let filteredTasks = this.taskList;

  if (searchQuery) {
    filteredTasks = this.taskList.filter(
      ({ text }) =>
        text.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1,
    );
  }

  const sortingMap = {
    dateCreationAsc: (a, b) =>
      a.creationDate.getTime() - b.creationDate.getTime(),
    dateCreationDesc: (a, b) =>
      b.creationDate.getTime() - a.creationDate.getTime(),
    dateDoneAsc: (a, b) => a.dueDate.getTime() - b.dueDate.getTime(),
    dateDoneDesc: (a, b) => b.dueDate.getTime() - a.dueDate.getTime(),
    textAsc: (a, b) => a.text.localeCompare(b.text),
    textDesc: (a, b) => b.text.localeCompare(a.text),
  };

  return filteredTasks.sort(sortingMap[sorting]);
};

TaskListModel.prototype.provideFieldsToStore = function() {
  return {
    taskList: this.taskList,
  };
};

TaskListModel.prototype.applyStoredState = function(storedState) {
  for (const storedTask of storedState.taskList) {
    const taskModel = new TaskModel();
    taskModel.of(storedTask);
    this.taskList.push(taskModel);
  }
};
