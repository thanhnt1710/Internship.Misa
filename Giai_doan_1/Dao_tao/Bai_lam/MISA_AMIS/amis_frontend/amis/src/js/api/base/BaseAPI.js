import BaseAPIConfig from './BaseAPIConfig.js';

export default class BaseAPI {

    constructor() {
        this.controller = null;
    }

    /**
     * Phương thức lấy tất cả dữ liệu
     */
    getAll() {
        return BaseAPIConfig.get(`${this.controller}`);
    }

    /**
     * 
     * Hàm lấy thông tin bằng khóa chính 
     * @param {*} id Khoa chinh 
     */
    getById(id) {
        return BaseAPIConfig.get(`${this.controller}/${id}`);
    }

    /**
     * Hàm thêm 1 bản ghi
     * @param {*} body dữ liệu cần thêm 
     */
    add(body) {
        return BaseAPIConfig.post(`${this.controller}`, body);
    }

    /**
     * Hàm cập nhật dữ liệu
     * @param {*} id khóa chính
     * @param {*} body dữ liệu đã chỉnh sửa
     */
    update(id, body) {
        return BaseAPIConfig.put(`${this.controller}/${id}`, body);
    }

    /**
     * Hàm xóa bản ghi theo khóa chính
     * @param {*} id khóa chính
     */
    delete(id) {
        return BaseAPIConfig.delete(`${this.controller}/${id}`);
    }

}