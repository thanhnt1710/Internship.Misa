import BaseAPIConfig from './baseapiconfig.js';

export default class BaseAPI {

    constructor() {
        this.controller = null;
    }

    /**
     * Phương thức lấy tất cả dữ liệu
     * Author: ntthanh (21/09/2021)
     */
    getAll() {
        return BaseAPIConfig.get(`${this.controller}`);
    }

    /**
     * 
     * Hàm lấy thông tin bằng khóa chính 
     * Author: ntthanh (21/09/2021)
     * @param {*} id Khoa chinh 
     */
    getById(id) {
        return BaseAPIConfig.get(`${this.controller}/${id}`);
    }

    /**
     * Hàm thêm 1 bản ghi
     * @param {object} body dữ liệu cần thêm 
     * Author: ntthanh (21/09/2021)
     */
    add(body) {
        return BaseAPIConfig.post(`${this.controller}`, body);
    }

    /**
     * Hàm cập nhật dữ liệu
     * @param {string} id khóa chính
     * @param {object} body dữ liệu đã chỉnh sửa
     * Author: ntthanh (21/09/2021)
     */
    update(id, body) {
        return BaseAPIConfig.put(`${this.controller}/${id}`, body);
    }

    /**
     * Hàm xóa bản ghi theo khóa chính
     * @param {string} id khóa chính
     * Author: ntthanh (21/09/2021)
     */
    delete(id) {
        return BaseAPIConfig.delete(`${this.controller}/${id}`);
    }

}