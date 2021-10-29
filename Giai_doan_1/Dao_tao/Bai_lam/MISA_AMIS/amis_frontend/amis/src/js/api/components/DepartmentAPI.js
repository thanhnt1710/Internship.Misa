import BaseAPI from '../base/BaseAPI.js';

class DepartmentAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "departments";
    }

}

export default new DepartmentAPI();