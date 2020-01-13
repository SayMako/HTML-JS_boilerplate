export default function LocalStorageManager() {}

LocalStorageManager.prototype.saveState = function(obj, prefix) {
  if (obj.objType) {
    const key = this.buildKey(obj, prefix);
    const stateToStore = JSON.stringify(obj.provideFieldsToStore());
    localStorage.setItem(key, stateToStore);
  } else {
    console.log(
      'You have to provide objType for the object to store its state \
			(methods applyStoredState() and provideFieldsToStore() are also required)',
    );
  }
};

LocalStorageManager.prototype.loadState = function(obj, prefix) {
  const key = this.buildKey(obj, prefix);
  const storedState = localStorage.getItem(key);
  if (storedState) {
    obj.applyStoredState(JSON.parse(storedState));
  }
};

LocalStorageManager.prototype.buildKey = function(obj, prefix) {
  let key = obj.objType + '.STATE';
  if (prefix) {
    key = prefix + '.' + key;
  }
  return key.toUpperCase();
};
