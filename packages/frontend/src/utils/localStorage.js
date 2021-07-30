const storage = {
  set: (key, value) => window.localStorage.setItem(key, value),
  get: (key) => window.localStorage.getItem(key),
  getParsed: (key) => {
    try {
      const data = JSON.parse(window.localStorage.getItem(key));
      return data;
    } catch (err) {
      return null;
    }
  },
  remove: (key) => window.localStorage.removeItem(key),
  clear: () => window.localStorage.clear(),
};

export default storage;
