import axios from 'axios';

export default class Solr {
  constructor(core) {
    this.core = core || localStorage.getItem('core');
    let url = localStorage.getItem('instance');
    // validate url for http(s)
    var pattern = /^((http|https):\/\/)/;
    if (!pattern.test(url)) {
      throw new Error("URL should start with http:// or https://");
    }

    url = new URL(url);
    url = url.origin;
    console.log(url);
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
