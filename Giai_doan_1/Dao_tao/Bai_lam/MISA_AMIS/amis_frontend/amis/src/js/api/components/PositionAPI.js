import BaseAPI from '../base/BaseAPI.js';

class PositionAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "positions";
    }

}

export default new PositionAPI();