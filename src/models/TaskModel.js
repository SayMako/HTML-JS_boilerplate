export default function TaskModel(text) {
  this.creationDate = new Date();
  this.dueDate = null;
  this.text = text;

  this.id = this.creationDate.getTime(); // might use some UUID generator or global counter
}

TaskModel.prototype.getId = function() {
  return this.id;
};

TaskModel.prototype.getDueDateAsString = function() {
  return dateTo12HoursFormat(this.dueDate);
};

TaskModel.prototype.getCreationDateAsString = function() {
  return dateTo12HoursFormat(this.creationDate);
};

TaskModel.prototype.isDone = function() {
  return this.dueDate !== null;
};

TaskModel.prototype.getText = function() {
  return this.text;
};

TaskModel.prototype.of = function(storedTask) {
  this.creationDate = new Date(storedTask.creationDate);
  this.dueDate = storedTask.dueDate ? new Date(storedTask.dueDate) : null;
  this.text = storedTask.text;
  this.id = storedTask.id;
};

function dateTo12HoursFormat(date) {
  if (!date) {
    return '';
  }

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const format = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  if (hours === 0) {
    hours = 12;
  } else if (hours < 10) {
    hours = '0' + hours;
  }
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes + ' ' + format;
}
