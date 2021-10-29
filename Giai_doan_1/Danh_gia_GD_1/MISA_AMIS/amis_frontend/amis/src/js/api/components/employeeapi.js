import BaseAPI from '../base/baseapi.js';
import BaseAPIConfig from '../base/baseapiconfig.js';

class EmployeeAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "employees";
    }

    /**
     * Hàm lấy mã nhân viên mới
     * Author: ntthanh (19/08/2021)
     */
    getEmployeeCode() {
        return BaseAPIConfig.get(`${this.controller}/getnewemployeecode`);
    }

    /**
     * Hàm lọc và phân trang
     * @param {string} employeeFilter Mã nv hoặc sdt hoặc tên 
     * @param {number} pageSize số bản ghi 1 trang
     * @param {number} pageIndex số trang muốn hiển thị
     * Author: ntthanh (19/08/2021)
     * @returns 
     */
    filterPaging(
        employeeFilter,
        pageSize,
        pageIndex
    ) {
        return BaseAPIConfig.get(`${this.controller}/filterpaging?specs=${employeeFilter}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
    }
}

export default new EmployeeAPI();