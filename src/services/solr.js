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

  getSchema(core=this.core) {
    // return this.instance.get(`/api/cores/${core}/schema`);
    return this.instance.get(`/${core}/schema/fields`);
  }

  getFields(core=this.core) {
    return this.instance.get(`/${core}/schema/fieldtypes`);
  }

  getStatus(core=this.core) {
    // return this.instance.get('/api/cores');
    const params = {
      core,
      action: "STATUS"
    };

    return this.instance.get("/admin/cores", { params });
  }
}
