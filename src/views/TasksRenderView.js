export default function TasksRenderView(querySelector) {
  this.domNode = document.querySelector(querySelector);
}

TasksRenderView.prototype.renderTasks = function(tasks) {
  removeChildren(this.domNode);

  if (tasks) {
    for (let task of tasks) {
      const card = document.createElement('div');
      card.classList.add('card');

      populateCardWithTaskDetails(card, task);
      initCardEvents.call(this, card, task);

      this.domNode.appendChild(card);
    }
  }

  function removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function replaceChild(parent, oldChild, newChild) {
    const children = Array.from(parent.children);
    removeChildren(parent);

    for (const child of children) {
      if (child === oldChild) {
        parent.appendChild(newChild);
      } else {
        parent.appendChild(child);
      }
    }
  }

  function populateCardWithTaskDetails(card, task) {
    card.innerHTML = `<div class="cardMainPanel"> \
				<label class="checkboxContainer"> \
  					<input type="checkbox" class="cardCheckBox" ${
              task.isDone() ? 'checked' : ''
            }> \
  					<span class="checkmark"></span> \
				</label> \
				<p class="cardText">${task.getText()}</p> \
				<div class="cardTimeSection"> \
					<p class="cardTimeCreated">${task.getCreationDateAsString()}</p> \
					<p class="cartTimeCompleted">${task.getDueDateAsString()}</p> \
				</div> \
			</div> \
			<div class="cardRemovePanel"></div>`;
  }

  function initCardEvents(card, task) {
    card
      .querySelector('.cardCheckBox')
      .addEventListener('change', e => this.requestTaskTransfer(e, task.getId()));
    card
      .querySelector('.cardRemovePanel')
      .addEventListener('click', () => this.requestTaskRemoval(task.getId()));

    const cardText = card.querySelector('.cardText');
    cardText.addEventListener('dblclick', e => {
      const parent = cardText.parentElement;

      const cardTextEditor = document.createElement('input');
      cardTextEditor.value = cardText.innerHTML;
      cardTextEditor.classList.add('cardTextEditor');
      cardTextEditor.addEventListener('keyup', e => {
        if (e.key === 'Escape') {
          this.requestTaskUpdate({
            id: task.getId(),
          });
        }
      });
      cardTextEditor.addEventListener('keypress', e => {
        if (e.keyCode === 13) {
          this.requestTaskUpdate({
            id: task.getId(),
            text: cardTextEditor.value,
          });
        }
      });
      replaceChild(parent, cardText, cardTextEditor);
      cardTextEditor.focus();
    });
  }
};

TasksRenderView.prototype.setTaskTransferHandler = function(handler) {
  this.taskTransferHandler = handler;
};

TasksRenderView.prototype.setTaskRemovalHandler = function(handler) {
  this.taskRemovalHandler = handler;
};

TasksRenderView.prototype.setTaskUpdateHandler = function(handler) {
  this.taskUpdateHandler = handler;
};

TasksRenderView.prototype.requestTaskTransfer = function(event, taskId) {
  const targetTaskStatus = event.srcElement.checked ? 'done' : 'open';
  this.taskTransferHandler(taskId, targetTaskStatus);
};

TasksRenderView.prototype.requestTaskUpdate = function(taskDetails) {
  this.taskUpdateHandler(taskDetails);
};

TasksRenderView.prototype.requestTaskRemoval = function(taskId) {
  this.taskRemovalHandler(taskId);
};
