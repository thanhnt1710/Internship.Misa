//Các chuỗi cố định
//Author: ntthanh (20/08/2021)
const CONST_STRING = {
    //Chuỗi rỗng
    STRING_EMPTY: '',

    //Thong bao
    NOTIFICATION: {
        NOTIFICATION_MESS: 'Thông báo',
        CHECKING_CONNECTION: 'Vui lòng kiểm tra kết nối mạng của bạn',
        SUPPORT: 'Hoặc liên hệ Misa để được hỗ trợ',
        REMOVE_EMPLOYEE: 'Xóa nhân viên mã',
        GET_INFOR_EMPLOYEES: 'Lấy thông tin nhân viên',
        INFOR_EMPLOYEES_NO_CONTENT: 'Dữ liệu nhân viên không có trên hệ thống!',
        GET_EMPLOYEES_NO_CONTENT: 'Không có dữ liệu nhân viên trên hệ thống!',
        GET_DEPARTMENT_NO_CONTENT: 'Không có dữ liệu phòng ban trên hệ thống!',
        GET_POSITION_NO_CONTENT: 'Không có dữ liệu vị trí trên hệ thống!',
        RELOAD: 'Vui lòng tải lại để cập nhật dữ liệu',
        ADD_EMPLOYEE: 'Thêm nhân viên',
        EDIT_EMPLOYEE: 'Sửa nhân viên',
        FILTER_EMPLOYEE_NO_CONTENT: 'Không tìm thấy nhân viên nào phù hợp!',
        FIRST_PAGE: 'Đây đã là trang đầu tiên',
        LAST_PAGE: 'Đây đã là trang cuối cùng',
    },

    //Thông báo thành công
    SUCCESS: {
        SUCCESS_MESS: 'thành công',
        SUCCESS_TYPE: 'success',
        SUCCESS_GET_EMPLOYEE_CODE: 'Lấy mã nhân viên thành công',
        SUCCESS_GET_EMPLOYEES: 'Tải dữ liệu thành công!',
    },

    //Cảnh Báo
    WARNING: {
        WARNING_TYPE: 'warning',
    },

    //Thông báo thất bại 
    ERROR: {
        ERROR_MESS: 'thất bại',
        ERROR_TYPE: 'error',
        ERROR_GET_EMPLOYEE_CODE: 'Có lỗi xảy ra khi lấy mã nhân viên mới!',
        ERROR_LOAD_DATA: 'Tải dữ liệu nhân viên thất bại!',
        ERROR_GET_DEPARTMENT: 'Lấy thông tin phòng ban thất bại',
        ERROR_GET_POSITION: 'Lấy thông tin vị trí thất bại',
    },

    //Misa Code
    MISACODE: {
        MISACODE_SUCCESS: 'MISA-100',
    },

    //Giới tính
    GENDER: {
        MALE: 'Nam',
        FEMALE: 'Nữ',
        OTHER: 'Khác',
        UNDEFINED: 'Không xác định',
    }
}

export default CONST_STRING;