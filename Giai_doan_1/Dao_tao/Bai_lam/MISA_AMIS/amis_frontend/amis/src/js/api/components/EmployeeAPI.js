import BaseAPI from '../base/BaseAPI.js';
import BaseAPIConfig from '../base/BaseAPIConfig.js';

class EmployeeAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "employees";
    }

    /**
     * Hàm lấy mã nhân viên mới
     */
    getEmployeeCode() {
        return BaseAPIConfig.get(`${this.controller}/getnewemployeecode`);
    }

    /**
     * Hàm lọc và phân trang
     * @param {*} employeeFilter Mã nv hoặc sdt hoặc tên 
     * @param {*} pageSize số bản ghi 1 trang
     * @param {*} pageIndex số trang muốn hiển thị
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