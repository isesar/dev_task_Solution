class Cache {
  static instance;

  constructor() {
    this.cacheMap = new Map();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Cache();
    }
    return this.instance;
  }
  get(key) {
    return this.cacheMap.get(key);
  }
  set(key, value) {
    this.cacheMap.set(key, value);
  }
  has(key) {
    return this.cacheMap.has(key);
  }
  del(key) {
    this.cacheMap.delete(key);
  }
  clear() {
    this.cacheMap.clear();
  }
}

const getNewCache = () => new Cache();

module.exports = {
  getNewCache,
};
