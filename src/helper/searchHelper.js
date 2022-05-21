import Fuse from "fuse.js";

class FuseSearch {
  constructor(data) {
    this.fuseInit = new Fuse(data, {
      keys: ["custodianName"],
    });
  }

  doSearch(text) {
    return this.fuseInit.search(text);
  }
}

export default FuseSearch;
