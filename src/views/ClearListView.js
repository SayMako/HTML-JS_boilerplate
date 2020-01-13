export default function ClearListView(querySelector) {
  this.domNode = document.querySelector(querySelector);
}

ClearListView.prototype.setClearListHandler = function(handler) {
  this.domNode.addEventListener('click', () => handler(this));
};
