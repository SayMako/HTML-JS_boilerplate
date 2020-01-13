export default function TasksSortingView(querySelector) {
  this.objType = 'VIEW_SORT_TASKS';
  this.domNode = document.querySelector(querySelector);
}

TasksSortingView.prototype.provideFieldsToStore = function() {
  return {
    value: this.getSorting(),
  };
};

TasksSortingView.prototype.applyStoredState = function(storedState) {
  this.domNode.value = storedState.value;
};

TasksSortingView.prototype.getSorting = function() {
  return this.domNode.options[this.domNode.selectedIndex].value;
};

TasksSortingView.prototype.setSortingChangedHandler = function(handler) {
  this.domNode.addEventListener('change', () => handler(this));
};
