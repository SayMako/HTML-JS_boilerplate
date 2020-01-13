import TaskListModel from '../models/TaskListModel.js';
import LocalStorageManager from '../LocalStorageManager.js';

export default function TaskListPresenter(tasksStatus) {
  this.tasksStatus = tasksStatus;
  this.taskList = new TaskListModel(tasksStatus);

  this.localStorageManager = new LocalStorageManager();
  this.localStorageManager.loadState(this.taskList, this.tasksStatus);

  this.onTaskListUpdated = function(model) {
    this.localStorageManager.saveState(model, this.tasksStatus);
    this.renderTasks();
  };

  this.taskList.setTaskListUpdatedHandler(this.onTaskListUpdated.bind(this));
}

TaskListPresenter.prototype.setTasksRenderView = function(tasksRenderView) {
  this.tasksRenderView = tasksRenderView;

  this.onTaskTransferRequested = function(taskId, targetTaskStatus) {
    const targetPresenter = this.statusToPresenterMap[targetTaskStatus];
    this.taskList.transferTask(taskId, targetPresenter.getTaskList());
  };

  this.onTaskRemovalRequested = function(taskId) {
    this.taskList.removeTaskWithId(taskId);
  };

  this.onTaskUpdateRequested = function(taskDetails) {
    this.taskList.updateTask(taskDetails);
  };

  this.tasksRenderView.setTaskTransferHandler(this.onTaskTransferRequested.bind(this));
  this.tasksRenderView.setTaskRemovalHandler(this.onTaskRemovalRequested.bind(this));
  this.tasksRenderView.setTaskUpdateHandler(this.onTaskUpdateRequested.bind(this));
};

TaskListPresenter.prototype.setTasksSortingView = function(tasksSortingView) {
  this.tasksSortingView = tasksSortingView;

  this.onTasksSortingChanged = function(view) {
    this.localStorageManager.saveState(view, this.tasksStatus);
    this.renderTasks();
  };

  this.localStorageManager.loadState(tasksSortingView, this.tasksStatus);
  this.tasksSortingView.setSortingChangedHandler(this.onTasksSortingChanged.bind(this));
};

TaskListPresenter.prototype.setTasksSearchView = function(tasksSearchView) {
  this.tasksSearchView = tasksSearchView;

  this.onTasksSearchTriggered = function(view) {
    this.renderTasks();
  };

  this.tasksSearchView.setSearchTriggeredHandler(this.onTasksSearchTriggered.bind(this));
};

TaskListPresenter.prototype.setTaskCreateView = function(taskCreateView) {
  this.taskCreateView = taskCreateView;

  this.onTaskCreated = function(view) {
    this.taskList.createTask(view.getNewTaskText());
  };

  this.taskCreateView.setTaskCreatedHandler(this.onTaskCreated.bind(this));
};

TaskListPresenter.prototype.setClearListView = function(clearListView) {
  this.clearListView = clearListView;

  this.onClearTaskList = function(view) {
    this.taskList.removeAllTasks();
  };

  this.clearListView.setClearListHandler(this.onClearTaskList.bind(this));
};

TaskListPresenter.prototype.renderTasks = function() {
  const searchQuery = this.tasksSearchView.getSearchQuery();
  const sorting = this.tasksSortingView.getSorting();
  const tasks = this.taskList.getTasks(searchQuery, sorting);
  this.tasksRenderView.renderTasks(tasks);
};

TaskListPresenter.prototype.getTaskList = function() {
  return this.taskList;
};

TaskListPresenter.prototype.setStatusToPresenterMap = function(statusToPresenterMap) {
  this.statusToPresenterMap = statusToPresenterMap;
};
