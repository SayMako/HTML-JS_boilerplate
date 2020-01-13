import './style.css';

import TaskCreateView from './views/TaskCreateView.js';
import TaskSearchView from './views/TaskSearchView.js';
import ClearListView from './views/ClearListView.js';
import TasksSortingView from './views/TasksSortingView.js';
import TasksRenderView from './views/TasksRenderView.js';
import TaskListPresenter from './presenters/TaskListPresenter.js';

const openTasksPresenter = new TaskListPresenter('open');
openTasksPresenter.setTaskCreateView(
  new TaskCreateView('#toDoCreateTaskContainer'),
);
openTasksPresenter.setTasksSortingView(
  new TasksSortingView('#toDoOpenSectionDropDown'),
);
openTasksPresenter.setTasksRenderView(
  new TasksRenderView('#toDoOpenCardsContainer'),
);
openTasksPresenter.setClearListView(
  new ClearListView('#toDoOpenSectionContainer .clearListButton'),
);

const doneTasksPresenter = new TaskListPresenter('done');
doneTasksPresenter.setTasksSortingView(
  new TasksSortingView('#toDoClosedSectionDropDown'),
);
doneTasksPresenter.setTasksRenderView(
  new TasksRenderView('#toDoClosedCardsContainer'),
);
doneTasksPresenter.setClearListView(
  new ClearListView('#toDoClosedSectionContainer .clearListButton'),
);

// there is one shared view j_j
const tasksSearchView = new TaskSearchView('#toDoHeaderSearchInput');
openTasksPresenter.setTasksSearchView(tasksSearchView);
doneTasksPresenter.setTasksSearchView(tasksSearchView);

const statusToPresenterMap = {
  open: openTasksPresenter,
  done: doneTasksPresenter,
};

openTasksPresenter.setStatusToPresenterMap(statusToPresenterMap);
doneTasksPresenter.setStatusToPresenterMap(statusToPresenterMap);

openTasksPresenter.renderTasks();
doneTasksPresenter.renderTasks();
