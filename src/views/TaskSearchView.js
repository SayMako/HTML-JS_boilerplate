export default function TaskSearchView(querySelector) {
  this.domNode = document.querySelector(querySelector);
}

TaskSearchView.prototype.setSearchTriggeredHandler = function(handler) {
  this.domNode.addEventListener('input', () => handler(this));
};

TaskSearchView.prototype.getSearchQuery = function() {
  return this.domNode.value;
};
