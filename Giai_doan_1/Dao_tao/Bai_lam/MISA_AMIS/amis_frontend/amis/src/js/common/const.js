
//Chuỗi rỗng 
const STRING_EMPTY = '';

//Thong bao
const NOTIFICATION = 'Thông báo';
const CHECKING_CONNECTION = 'Vui lòng kiểm tra kết nối mạng của bạn';
const SUPPORT = 'Hoặc liên hệ Misa để được hỗ trợ';
const REMOVE_EMPLOYEE = 'Xóa nhân viên mã';
const GET_INFOR_EMPLOYEES = 'Lấy thông tin nhân viên';
const INFOR_EMPLOYEES_NO_CONTENT = 'Dữ liệu nhân viên không có trên hệ thống!';
const GET_EMPLOYEES_NO_CONTENT = 'Không có dữ liệu nhân viên trên hệ thống!';
const GET_DEPARTMENT_NO_CONTENT = 'Không có dữ liệu phòng ban trên hệ thống!';
const GET_POSITION_NO_CONTENT = 'Không có dữ liệu vị trí trên hệ thống!';
const RELOAD = 'Vui lòng tải lại để cập nhật dữ liệu';
const ADD_EMPLOYEE = 'Thêm nhân viên';
const EDIT_EMPLOYEE = 'Sửa nhân viên';
const FILTER_EMPLOYEE_NO_CONTENT = 'Không tìm thấy nhân viên nào phù hợp!';
const FIRST_PAGE = 'Đây đã là trang đầu tiên';
const LAST_PAGE = 'Đây đã là trang cuối cùng';


//Thông báo thành công
const SUCCESS = 'thành công';
const SUCCESS_TYPE = 'success';
const SUCCESS_GET_EMPLOYEE_CODE = 'Lấy mã nhân viên thành công';
const SUCCESS_GET_EMPLOYEES = 'Tải dữ liệu thành công!';

//Cảnh Báo
const WARNING_TYPE = 'warning';

//Thông báo thất bại 
const ERROR = 'thất bại';
const ERROR_TYPE = 'error';
const ERROR_GET_EMPLOYEE_CODE = 'Có lỗi xảy ra khi lấy mã nhân viên mới!';
const ERROR_LOAD_DATA = 'Tải dữ liệu nhân viên thất bại!';
const ERROR_GET_DEPARTMENT = 'Lấy thông tin phòng ban thất bại';
const ERROR_GET_POSITION = 'Lấy thông tin vị trí thất bại';

//MISACode
const MISACODE_SUCCESS = 'MISA-100';

//Chế độ của form chi tiết nhân viên (thêm, sửa hay xóa)
const FORM_MODE_ADD = 1;
const FORM_MODE_EDIT = 2;
const FORM_MODE_REPLICA = 3;
const FORM_MODE_NONE = 0;

//Chế độ sau khi lưu form chi tiết (cất, cất và thêm)
const FORM_SAVED = 1;
const FORM_SAVED_ADD = 2;

export default {
  STRING_EMPTY,

  NOTIFICATION,
  CHECKING_CONNECTION,
  SUPPORT,
  REMOVE_EMPLOYEE,
  GET_INFOR_EMPLOYEES,
  INFOR_EMPLOYEES_NO_CONTENT,
  GET_EMPLOYEES_NO_CONTENT,
  GET_DEPARTMENT_NO_CONTENT,
  GET_POSITION_NO_CONTENT,
  RELOAD,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  FILTER_EMPLOYEE_NO_CONTENT,
  FIRST_PAGE,
  LAST_PAGE,

  SUCCESS,
  SUCCESS_TYPE,
  SUCCESS_GET_EMPLOYEE_CODE,
  SUCCESS_GET_EMPLOYEES,

  WARNING_TYPE,

  ERROR,
  ERROR_TYPE,
  ERROR_GET_EMPLOYEE_CODE,
  ERROR_LOAD_DATA,
  ERROR_GET_DEPARTMENT,
  ERROR_GET_POSITION,

  MISACODE_SUCCESS,

  FORM_MODE_ADD,
  FORM_MODE_EDIT,
  FORM_MODE_REPLICA,
  FORM_MODE_NONE,
  
  FORM_SAVED,
  FORM_SAVED_ADD,
}
