import axios from 'axios';

export default class Solr {
  constructor(core) {
    // TODO: make this url configurable via the env
    this.core = core;
    const baseURL = 'http://localhost:8899';
    this.instance = axios.create({
      baseURL,
    });
  }

  getSchema(core=this.core) {
    return this.instance.get(`/api/cores/${core}/schema`);
  }

  getFields(core=this.core) {
    return this.instance.get(`/api/cores/${core}/schema/fields`);
  }

  getStatus(core=this.core) {
    return this.instance.get('/api/cores');
  }
}
