export default class Node {
  constructor(data) {
    this._data = data;
    this.left = null;
    this.right = null;
  }

  get data() {
    return this._data;
  }
}
