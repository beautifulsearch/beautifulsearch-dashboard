import axios from 'axios';

export default class Solr {
  constructor(instance="", core) {
    this.core = core;
    let url = instance;

    // validate url for http(s)
    var pattern = /^((http|https):\/\/)/;
    if (!pattern.test(url)) {
      throw new Error("URL should start with http:// or https://");
    }

    // create url object and extract the base url
    const urlComponent = new URL(url);
    url = urlComponent.origin;

    // setup simple auth if required
    if (urlComponent.username && urlComponent.password) {
      this.auth = {
        username: urlComponent.username,
        password: urlComponent.password
      };
    }

    const baseURL = `${url}/solr`;
    this.instance = axios.create({
      baseURL,
      auth: this.auth
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
