import axios from 'axios';

export default class Solr {
  constructor(core) {
    this.core = core || localStorage.getItem('core');
    let url = localStorage.getItem('instance');
    if (!url) {
      throw Error('Cannot create a solr instance without a valid url');
    }

    // remove trailing / as solr is very perticular about the url endpoints
    // url = url.replace(/\/$/, "");

    const baseURL = `${url}/solr`;
    this.instance = axios.create({
      baseURL,
    });
  }

  getSchema() {
    // return this.instance.get(`/api/cores/${core}/schema`);
    return this.instance.get(`/${this.core}/schema/fields`);
  }

  getFields() {
    return this.instance.get(`/${this.core}/schema/fieldtypes`);
  }

  addFields(defination) {
    const params = {
      "add-field": {
        ...defination,
        stored: true
      }
    }

    return this.instance.post(`/${this.core}/schema`, params);
  }

  getStatus() {
    // return this.instance.get('/api/cores');
    const params = {
      core: this.core,
      action: "STATUS"
    };

    return this.instance.get("/admin/cores", { params });
  }
}
