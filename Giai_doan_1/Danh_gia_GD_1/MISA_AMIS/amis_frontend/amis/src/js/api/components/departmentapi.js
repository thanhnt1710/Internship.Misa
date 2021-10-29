import BaseAPI from '../base/baseapi.js';

class DepartmentAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "departments";
    }

}

export default new DepartmentAPI();