import axios from 'axios';
import cogoToast from "cogo-toast";

export default class Solr {
  constructor(core) {
    this.core = core || localStorage.getItem('core');
    let url = localStorage.getItem('instance');

    try {
      url = new URL(url);
      url = url.origin;
      const baseURL = `${url}/solr`;
      this.instance = axios.create({
        baseURL,
      });
    } catch (e) {
      cogoToast.error(e.message);
    }
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
