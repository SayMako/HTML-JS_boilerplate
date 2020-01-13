export default function TaskCreateView(querySelector) {
  this.domNode = document.querySelector(querySelector);
  this.inputField = document.querySelector(querySelector + ' > input');
  this.inputButton = document.querySelector(querySelector + ' > button');
}

TaskCreateView.prototype.getNewTaskText = function() {
  const newTaksText = this.inputField.value;
  this.inputField.value = '';
  return newTaksText;
};

TaskCreateView.prototype.setTaskCreatedHandler = function(handler) {
  this.inputButton.addEventListener('click', () => handler(this));
  this.inputField.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
      handler(this);
    }
  });
};
