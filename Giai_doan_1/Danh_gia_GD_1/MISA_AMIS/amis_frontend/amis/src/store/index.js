import Vue from 'vue'
import Vuex from 'vuex'
//import axios from "axios"
import EmployeeAPI from '../js/api/components/employeeapi'
import DepartmentAPI from '../js/api/components/departmentapi'

import CONST_STRING from '../js/resource/conststring'
import ENUMS from '../js/resource/enums'
// import VueAxios from 'vue-axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        //Trạng thái đong mở form
        //Author: ntthanh (18/08/2021)
        modal: false,
        
        //Chua obj cac nhan vien
        //Author: ntthanh (18/08/2021)
        employees: [], 

        //Lưu dữ liệu trong form
        employeeModal:{
            Gender: 0,//Mặc định có giới tính nam
        },

        //validate các trường trong form
        //true -> không có lỗi
        //false -> có lỗi
        //Author: ntthanh (18/08/2021)
        validateFormState: {
            employeeCode: true,
            employeeName: true,
            departmentName: true,
        },

        /**
        * obj toastRight co dang
        * @param {String} message1 Công việc cần thông báo: Thêm nhân viên, Xóa nhân viên, ...
        * @param {String} message2 Mã nhân viên của mỗi lần thông báo
        * @param {String} message3 Kết quả (Thành công, thất bại, ...)
        * @param {String} type Kiểu thông báo để hiên thị màu (Chỉ nhận các giá trị định nghĩa sẵn: success, error, ...)
        * Author: ntthanh (18/08/2021)
         */
        toastRight: [],//Mang các obj lưu thông tin toastRight

        /**
         * obj toastTop co dang
         * @param {String} title  Tieu de thong bao
         * @param {String} message1 Noi dung thong bao
         * @param {String} message2 Noi dung thong bao
         * @param {String} message3 Noi dung thong bao
         * Author: ntthanh (18/08/2021)
         */
        toastTop:[],//Mang các obj lưu thông tin toastTop

        //State lưu nội dung popup cảnh báo khi đóng form
        //status: trạng thái đóng, mở
        //message: câu thông báo
        //Author: ntthanh (18/08/2021)
        popupCancel: {
            status: false,
            message: '',
        },

        //State lưu nội dung popup validate 
        //status: trạng thái đóng, mở
        //message: câu thông báo
        //Author: ntthanh (18/08/2021)
        popupValidate: {
            status: false,
            message: '',
        },

        //State lưu nội dung popup cảnh báo khi xóa nhân viên
        //status: trạng thái đóng, mở
        //message: câu thông báo
        //Author: ntthanh (18/08/2021)
        popupDelete: {
            status: false,
            message: '',
        },
        
        //State cảnh báo trùng sữ liệu
        //status: trạng thái đóng, mở
        //message: câu thông báo
        //Author: ntthanh (18/08/2021)
        popupDuplicate: {
            status: false,
            message: '',
        },

        //Chế độ của form (thêm-1, sửa-2 hay nhân bản-3, none-0)
        //Author: ntthanh (18/08/2021)
        formMode: 0,

        //Mảng các obj chứa tất cả dữ liệu đơn vị 
        //Author: ntthanh (18/08/2021)
        department: [],
        //Obj đơn vị đang được chọn
        //Author: ntthanh (18/08/2021)
        departmentSelected: {},
        //Mảng các obj đơn vị đang hiển thị hiện tại
        //Author: ntthanh (18/08/2021)
        departmentCurrent: [],

        //Giá trị input hiện tại trong input đơn vị
        //Author: ntthanh (18/08/2021)
        inputDepartmentCurrent: '',

        //Cờ đánh dấu lưu dữ liệu trên form modal hay không
        //true: có lưu
        //false: không lưu
        //Author: ntthanh (18/08/2021)
        flagSaveEmployee: false,

        //obj chứa thông tin nhân viên sẽ xóa 
        //Author: ntthanh (18/08/2021)
        employeeRemove: {
            // employeeId: '',
            // employeeCode:'',
        },

        //State dùng cho lọc và phân trang 
        //Thoong tin lọc và phân trang
        //Author: ntthanh (18/08/2021)
        filterPagingInfor: {
            employeeFilter: "",//Thông tin search
            pageIndex: 0,//Số trang hiển thị, truyền lên 0 nhận về 1
            pageSize: 10,//Kích thước bản ghi 1 trang
        },

        //Dữ liệu lọc và phân trang nhận được sau khi gửi lên server
        //Author: ntthanh (18/08/2021)
        filterPagingResult:{},

        //Mảng lưu obj các trang hiển thị hiện tại 
        //Author: ntthanh (18/08/2021)
        currentPages: [
            {
                value: 1,
                isSelect: true,
            },
            {
                value: 2,
                isSelect: false,
            },
            // {
            //     value: 1,
            //     isSelect: true,
            // },
            // {
            //     value: 1,
            //     isSelect: false,
            // },
            // {
            //     value: ellipsis,
            //     isSelect: false,
            //     position: 'front', or 'back' or 'only'-> dấu 3 chấm cần trường khác nhau để khi bind tránh trùng key
            // }
        ],

        //Trạng thái ẩn hiện loading
        //Author: ntthanh (18/08/2021)
        loading: false,
    },
    getters: {
        
    },
    mutations: {

        /**
         * Thay đổi trạng thái form 
         * @param {Object} state state trong store
         * @param {Boolean} status trạng thái thay đổi: true or false
         * Author: ntthanh (18/08/2021)
         */
        changeModal(state, status) {
            state.modal = status;
        },

        /**
         * Luu ma nhan vien moi vao state employeeCode và lưu vào state employeeModal
         * @param {Object} state state trong store 
         * @param {String} employeeCode mã nhân viên 
         * Author: ntthanh (18/08/2021)
         */
        getEmployeeCode(state, employeeCode) {
            state.employeeModal.EmployeeCode = employeeCode;
        },

        /**
         * Luu tat ca obj nhan vien vao mang 
         * @param {Object} state state trong store 
         * @param {Object} employees mảng object thông tin nhân viên
         * Author: ntthanh (18/08/2021)
         */
        getEmployees(state, employees) {
            state.employees = employees;
        },   

        /**
         * Thay đổi trạng thái validate các trường trong form
         * @param {Object} state state trong store 
         * @param {Object} inforChangeValidateFormState : obj {
         *                                                  fieldName: tên trường thay đổi
         *                                                  status: trạng thái validate (true, false)
         *                                                }
         * Author: ntthanh (18/08/2021)
         */
        changeValidateFormState(state, inforChangeValidateFormState) {
            state.validateFormState[inforChangeValidateFormState.fieldName] = inforChangeValidateFormState.status;
        },

        /**
         * Xu ly toastRight
         * @param {Object} state state trong store 
         * @param {Object} content nội dung thêm vào
         *  Author: ntthanh (18/08/2021)
         */
        addToastRight(state, content) {//Them obj vao cuoi
            state.toastRight.push(content);
        }, 
        removeToastRight(state) {//Xoa obj dau tien
            state.toastRight = [];
        },

        /**
         * Xu ly toastTop
         * @param {Object} state state trong store
         * @param {Object} content nội dung thêm vào
         *  Author: ntthanh (18/08/2021)
         */
        addToastTop(state, content) {//Them obj vao cuoi
            state.toastTop.push(content);
        },
        removeToastTop(state) {//Xoa obj dau tien
            state.toastTop.shift();
        },

        /**
         * Thay đổi trạng thái và nội dung popup đóng form
         * @param {Object} state state trong store
         * @param {Object} popupCancel obj lưu thông tin thay đổi
         * author: ntthanh (20/08/2021)
         */
        changePopupCancel(state, popupCancel) {
            state.popupCancel = popupCancel;
        },

        /**
         * Thay đổi trạng thái và nội dung popup thông báo validate
         * @param {Object} state state trong store
         * @param {Object} popupValidate obj lưu thông tin thay đổi
         * author: ntthanh (20/08/2021)
         */
         changePopupValidate(state, popupValidate) {
            state.popupValidate = popupValidate;
        },

        /**
         * Thay đổi trạng thái và nội dung popup thông báo xóa nhân viên
         * @param {Object} state state trong store
         * @param {Object} popupDelete obj lưu thông tin thay đổi
         * author: ntthanh (20/08/2021)
         */
        changePopupDelete(state, popupDelete) {
            state.popupDelete = popupDelete;
        },

        /**
         * Thay đổi trạng thái và nội dung popup thông báo trùng dữ liệu
         * @param {Object} state state trong store
         * @param {Object} popupDuplicate obj lưu thông tin thay đổi
         * Author: ntthanh (20/08/2021)
         */
         changePopupDuplicate(state, popupDuplicate) {
            state.popupDuplicate = popupDuplicate;
        },

        /**
         * Set dữ liệu cho employeeModal bằng obj trong payload
         * @param {Object} state state trong store
         * @param {Object} employee 
         * Author: ntthanh (20/08/2021)
         */
        setEmployeeModal(state, employee) {
            state.employeeModal = employee;
        },

        /**
         * Set dữ liệu cho giới tính trong employeeModal 
         * @param {Object} state state trong store
         * @param {Enum} valueGender giá trị giới tính
         * Author: ntthanh (18/08/2021)
         */
        setGenderEmployeeModal(state, valueGender) {
            state.employeeModal.Gender = valueGender;
        },

        /**
         * Set formMode la thêm, sửa, xóa, nhân bản, hay non
         * @param {Object} state state trong store
         * Author: ntthanh (18/08/2021)
         */
        setFormModeAdd(state) {//Set formMode la thêm
            state.formMode = ENUMS.FORM_MODE_ADD;
        },
        setFormModeEdit(state) {//Set formMode la sửa
            state.formMode = ENUMS.FORM_MODE_EDIT;
        },
        setFormModeReplica(state) {//Set formMode la nhân bản
            state.formMode = ENUMS.FORM_MODE_REPLICA;
        },
        setFormModeNone(state) {//Set formMode la none
            state.formMode = ENUMS.FORM_MODE_NONE;
        },

        /**
         * resetForm
         * @param {Object} state state trong store
         * Author: ntthanh (18/08/2021)
         */
        resetForm(state) {
            //Xóa giá trị các trường
            Object.keys(state.employeeModal).forEach(function(index) {
                state.employeeModal[index] = '';
            });
            //Xóa input hiện tại ô nhập đơn vị (department)
            state.inputDepartmentCurrent = '';
        },

        /**
         * Gán dữ liệu đơn vị lấy được từ api vào state department và state departmentCurrent
         * @param {Object} state 
         * @param {Array} department mảng obj 
         * Author: ntthanh (18/08/2021)
         */
        getDepartment(state, department) {
            state.department = department;
            state.departmentCurrent = department;
        },

        /**
         * Thêm 1 obj vào cuối state departmentCurrent
         * @param {Object} state 
         * @param {Object} department obj 
         * Author: ntthanh (18/08/2021)
         */
        addDepartmentCurrent(state, department) {
            state.departmentCurrent.push(department);
        },

        /**
         * Làm rỗng state departmentCurrent để thêm mới
         * @param {Object} state 
         * Author: ntthanh (18/08/2021)
         */
        emptyDepartmentCurrent(state) {
            state.departmentCurrent = [];
        },

        /**
         * Thay đổi đơn vị đang được chọn
         * @param {Object} state 
         * @param {Object} department obj
         *  Author: ntthanh (18/08/2021)
         */
        changeDepartmentSelected(state, department) {
            state.departmentSelected = department;
        },

        /**
         * Thay đổi input đơn vị khi người dùng nhập
         * @param {Object} state 
         * @param {String} inputDepartmentCurrent 
         *  Author: ntthanh (18/08/2021)
         */
        changeInputDepartmentCurrent(state, inputDepartmentCurrent) {
            state.inputDepartmentCurrent = inputDepartmentCurrent;
        },

        /**
         * Đổi cờ đánh dấu cất nhân viên
         * @param {Object} state 
         * @param {Boolean} status true or false
         *  Author: ntthanh (18/08/2021)
         */
        changeFlagSaveEmployee(state, status) {
            state.flagSaveEmployee = status;
        },

        /**
         * Gán thông tin nhân viên sẽ xóa vào store
         * @param {Object} state 
         * @param {Object} employeeRemove obj thông tin nv cần xóa
         *  Author: ntthanh (18/08/2021)
         */
        setEmployeeRemove(state, employeeRemove) {
            state.employeeRemove = employeeRemove;
        },

        /**
         * Làm rỗng obj nhân viên sẽ xóa trong state employeeRemove
         * @param {Object} state 
         * Author: ntthanh (18/08/2021)
         */
        emptyEmployeeRemove(state) {
            state.employeeRemove = {};
        },

        /**
         * Khi chọn 1 item trong combobox đơn vị chuyển isSelect item đó thành true
         * Set selected bang obj da chon
         * Set input đơn vị bằng departmentName đã chọn
         * @param {Object} state 
         * @param {String} departmentId Id đơn vị đã chọn
         * Author: ntthanh (18/08/2021)
         */
        selectItemCombobox(state, departmentId) {
            for(let department of state.departmentCurrent) {
                if(department.DepartmentId == departmentId) {
                    department.isSelect = true;
                    this.commit('changeDepartmentSelected', department);
                    this.commit('changeInputDepartmentCurrent', department.DepartmentName);
                }
                else {
                    department.isSelect = false;
                }
            }            
        },

        //Mutation cho lọc và phân trang

        /**
         * Set dữ liệu lọc và phân trang nhận được sau khi gửi lên server
         * @param {Object} state 
         * @param (object} filterPagingResult kết quả nhân đc từ server sau khi gọi api
         * Author: ntthanh (18/08/2021)
         */
        setFilterPagingResult(state, filterPagingResult) {
            state.filterPagingResult = filterPagingResult;
        },

        /**
         * add obj dữ liệu cho mảng các obj trang hiện tại để hiển thị 
         * @param {Object} state 
         * @param {Object} objPage obj thông tin các trang hiển thị
         * Author: ntthanh (18/08/2021)
         */
        setCurrentPages(state, objPage) {
            state.currentPages.push(objPage);
        },

        /**
         * Xóa obj trong currentPages để thêm lại từ đầu
         * @param {Object} state 
         *  Author: ntthanh (18/08/2021)
         */
        removeCurrentPages(state) {
            state.currentPages = [];
        },

        /**
         * thay đổi pageIndex để đổi trang hiển thị
         * @param {Object} state 
         * @param {number} pageIndex số trang
         * Author: ntthanh (18/08/2021)
         */
        changePageIndex(state, pageIndex) {
            state.filterPagingInfor.pageIndex = pageIndex;
        },

        /**
         * thay đổi pageSize để đổi trang hiển thị
         * @param {Object} state 
         * @param {number} pageSize số bản ghi 1 trang
         * Author: ntthanh (18/08/2021)
         */
        changePageSize(state, pageSize) {
            state.filterPagingInfor.pageSize = pageSize;
        },

        /**
         * Thay đổi employeeFilter và pageIndex = 0 khi nhấn tìm kiếm
         * @param {Object} state 
         * @param {Object} employeeFilter thông tin cần tìm kiếm
         * Author: ntthanh (18/08/2021)
         */
        changeEmployeeFilter(state, employeeFilter) {
            state.filterPagingInfor.employeeFilter = employeeFilter;
            state.filterPagingInfor.pageIndex = 0;
        },

        /**
         * Đổi trạng thái loading
         * @param {Object} state 
         * @param {Boolean} status true or false
         * Author: ntthanh (18/08/2021)
         */
        changeLoading(state, status) {
            state.loading = status;
        },

    },
    actions: {
        /**
         * Goi api lay ma nhan vien 
         * Author: ntthanh (18/08/2021)
         */
        async getEmployeeCode({commit}) {
            await commit('changeLoading', true);
            await EmployeeAPI.getEmployeeCode()
            .then(function(res) {
                if(res.data.MISACode == CONST_STRING.MISACODE.MISACODE_SUCCESS) {//Nếu lấy thành công 
                    commit("getEmployeeCode", res.data.Data);
                }
                else {//Lấy thất bại 
                    console.log(res.status, res.data);  
                    commit("addToastRight", {
                        message1: res.data.Data,
                        message2: CONST_STRING.STRING_EMPTY,
                        message3: CONST_STRING.STRING_EMPTY,
                        type: CONST_STRING.ERROR.ERROR_TYPE,
                    });
                }
            }) 
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: CONST_STRING.ERROR.ERROR_GET_EMPLOYEE_CODE,
                    message2: CONST_STRING.STRING_EMPTY,
                    message3: CONST_STRING.STRING_EMPTY,
                    type: CONST_STRING.ERROR.ERROR_TYPE,
                });
            });
            await commit('changeLoading', false);
        },

        /**
         * Goi Api thuc hien lay tất cả du lieu
         * Author: ntthanh (18/08/2021)
         */
        getEmployees({commit}) {
            EmployeeAPI.getAll()
            .then((res) => {
                if(res.status == 200) {//Có dữ liệu 
                    commit("getEmployees", res.data);
                }
                else {// res.status == 204 -> không có dữ liệu
                    console.log(res.status, res.data);
                    commit("addToastRight", {
                        message1: CONST_STRING.NOTIFICATION.GET_EMPLOYEES_NO_CONTENT,
                        message2: CONST_STRING.STRING_EMPTY,
                        message3: CONST_STRING.STRING_EMPTY,
                        type: CONST_STRING.WARNING.WARNING_TYPE,
                    });
                }
            }) 
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit('addToastTop', {
                    title: CONST_STRING.NOTIFICATION.NOTIFICATION_MESS,
                    message1: CONST_STRING.ERROR.ERROR_LOAD_DATA,
                    message2: CONST_STRING.NOTIFICATION.CHECKING_CONNECTION,
                    message3: CONST_STRING.NOTIFICATION.SUPPORT,
                });
            });
        },

        /**
         * goi Api lay thong tin đơn vị (department)
         * Author: ntthanh (18/08/2021)
         */
        getDepartment({commit}) {
            DepartmentAPI.getAll()
            .then((res) => {
                if(res.status == 200) {//Có dữ liệu 
                    //Them cờ để chọn item
                    for(let i=0; i<res.data.length; i++) {
                        res.data[i].isSelect = false;
                    }
                    
                    //Lưu dữ liệu vào state department
                    commit('getDepartment', res.data);
                }
                else {// res.status == 204 -> không có dữ liệu
                    console.log(res.status, res.data);
                    commit("addToastRight", {
                        message1: CONST_STRING.NOTIFICATION.GET_DEPARTMENT_NO_CONTENT,
                        message2: CONST_STRING.STRING_EMPTY,
                        message3: CONST_STRING.STRING_EMPTY,
                        type: CONST_STRING.WARNING.WARNING_TYPE,
                    });
                }
            })
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: CONST_STRING.ERROR.ERROR_GET_DEPARTMENT,
                    message2: CONST_STRING.STRING_EMPTY,
                    message3: CONST_STRING.STRING_EMPTY,
                    type: CONST_STRING.ERROR.ERROR_TYPE,
                });
            });
        },

        /**
         * Goi api xoa nhân viên đã chọn (lấy ra từ state employeeRemove)
         * Author: ntthanh (18/08/2021)
         */
        async removeEmployee({commit}) {
            await commit('changeLoading', true);
            let employeeId = this.state.employeeRemove.employeeId;
            let employeeCode = this.state.employeeRemove.employeeCode;
            //Goi api xoa nhan vien
            await EmployeeAPI.delete(employeeId)
            .then((res) => {//200: có thể xóa được hoặc không-> check MISACode trả về
                if(res.data.MISACode == CONST_STRING.MISACODE.MISACODE_SUCCESS) {//Xóa thành công
                    commit("addToastRight", {
                        message1: CONST_STRING.NOTIFICATION.REMOVE_EMPLOYEE,
                        message2: employeeCode,
                        message3: CONST_STRING.SUCCESS.SUCCESS_MESS,
                        type: CONST_STRING.SUCCESS.SUCCESS_TYPE
                    });
                }
                else {// Xóa không thành công
                    console.log(res.status, res.data);
                    commit("addToastRight", {
                        message1: CONST_STRING.NOTIFICATION.REMOVE_EMPLOYEE,
                        message2: employeeCode,
                        message3: CONST_STRING.ERROR.ERROR_MESS,
                        type: CONST_STRING.ERROR.ERROR_TYPE
                    });
                }
            })
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: CONST_STRING.NOTIFICATION.REMOVE_EMPLOYEE,
                    message2: employeeCode,
                    message3: CONST_STRING.ERROR.ERROR_MESS,
                    type: CONST_STRING.ERROR.ERROR_TYPE
                });
            });
            
            //Làm rỗng obj lưu nhan vien can Xoa
            await commit('emptyEmployeeRemove');
            //Load lai du lieu
            await this.dispatch('filterPaging');

            await commit('changeLoading', false);
        },

        /**
         * Goi api lay thong tin nhan vien bang id 
         * @param {String} employeeId Id nhân viên cần lấy thông tin 
         * Author: ntthanh (18/08/2021)
         */
        async getEmployeeById({commit}, employeeId) {
            await commit('changeLoading', true);
            await EmployeeAPI.getById(employeeId)
            .then((res) => {
                if(res.status == 200) {//Có dữ liệu 
                    
                    let result = res.data;
    
                    //Đổi item trong combobox đơn vị đúng với giá trị trả về -> thay đổi departmentSelected và đổi giá trị input đơn vị -> thay đổi inputDepartmentCurrent
                    //Đổi isSelect cho department và departmentSelected
                    for(let department of this.state.department) {
                        if(department.DepartmentId == result.DepartmentId) {
                            commit('changeDepartmentSelected', department);
                            department.isSelect = true;
                            commit('changeInputDepartmentCurrent', department.DepartmentName);
                        }
                        else {
                            department.isSelect = false;
                        }
                    }
                   
                    //Tải dữ liệu nhận đc vào store để build lên form
                    commit("setEmployeeModal", result);
                    //Tải mã nhân vào store
                    commit("getEmployeeCode", result.EmployeeCode);

                }
                else {// res.status == 204 -> không có dữ liệu
                    console.log(res.status, res.data);
                    //Tải dữ liệu rỗng vào modal để thể hiện không có dữ liệu
                    let employee = {};
                    commit("setEmployeeModal", employee);
                    //Hiện thông báo
                    commit('addToastTop', {
                        title: CONST_STRING.NOTIFICATION.NOTIFICATION_MESS,
                        message1: CONST_STRING.NOTIFICATION.INFOR_EMPLOYEES_NO_CONTENT,
                        message2: CONST_STRING.NOTIFICATION.RELOAD,
                        message3: CONST_STRING.STRING_EMPTY
                    });
                }
            }) 
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: CONST_STRING.NOTIFICATION.GET_INFOR_EMPLOYEES,
                    message2: CONST_STRING.ERROR.ERROR_MESS,
                    message3: CONST_STRING.STRING_EMPTY,
                    type: CONST_STRING.ERROR.ERROR_TYPE,
                });
            });
            await commit('changeLoading', false);
        },

        /**
         * Goi api them nhan vien
         * @param {Object} formInfor thông tin nhân viên cần thêm
         * Author: ntthanh (18/08/2021)
         */
        async addEmployee({commit}, formInfor) {
            await commit('changeLoading', true);
            let employee = formInfor.employee;
            let errorValidate = false;
            await EmployeeAPI.add(employee)
            .then((res) => {//200 hoặc 201
                if(res.status ==201) {// Thêm thành công - mã 201
                    commit("addToastRight", {
                        message1: CONST_STRING.NOTIFICATION.ADD_EMPLOYEE,
                        message2: employee.EmployeeCode,
                        message3: CONST_STRING.SUCCESS.SUCCESS_MESS,
                        type: CONST_STRING.SUCCESS.SUCCESS_TYPE,
                    });
                }
                else {//mã 200 - validate thất bại hoặc validate thành công nhưng thêm thất bại do lỗi 
                    console.log(res.status, res.data);
                    if(res.data.Validate) {//Validate thành công nhưng thêm bị lỗi 
                        commit("addToastRight", {
                            message1: CONST_STRING.NOTIFICATION.ADD_EMPLOYEE,
                            message2: employee.EmployeeCode,
                            message3: CONST_STRING.ERROR.ERROR_MESS,
                            type: CONST_STRING.ERROR.ERROR_TYPE,
                        });
                    }
                    else {//Validate thất bại 
                        errorValidate = true;
                        commit("changePopupDuplicate", {
                            status: true,
                            message: res.data.Data,
                        });
                    }
                }
            })
            .catch((error) => {//400 hoặc 500
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: CONST_STRING.NOTIFICATION.ADD_EMPLOYEE,
                    message2: employee.EmployeeCode,
                    message3: CONST_STRING.ERROR.ERROR_MESS,
                    type: CONST_STRING.ERROR.ERROR_TYPE,
                });
            })
            .finally(async () => {
                if(!errorValidate) {//Nếu không có lỗi do validate
                    if(formInfor.mode == ENUMS.FORM_SAVED) {//Nếu chỉ cất
                        //Dong form modal
                        await commit("changeModal", false);

                        //Thêm mới luôn về trang 1 -> cập nhật pageIndex 
                        await commit("changePageIndex", 0)
                         
                        //Tai lai du lieu
                        await this.dispatch('filterPaging');
            
                        //Set lại formMode về none 
                        await commit('setFormModeNone');
                    }
                    if(formInfor.mode == ENUMS.FORM_SAVED_ADD) {//Nếu cất và thêm
                        //Tai lai du lieu
                        await this.dispatch('filterPaging');

                        //reset lại form
                        await commit('resetForm');

                        //Đóng mở form để kích hoạt sk focus ô đầu tiên và lưu obj thông tin ban đầu
                        //Dong form modal
                        await commit("changeModal", false);

                        //lấy mã nhân viên mới
                        await this.dispatch('getEmployeeCode');

                        //Set form là thêm mới để tiếp tục Thêm
                        await commit('setFormModeAdd');

                        //Mở form modal
                        await commit("changeModal", true);
                    }
                }
            });
            await commit('changeLoading', false);
        },

        /**
         * Gọi api sửa nhân viên
         * @param {Object} formInfor thông tin nv cần sửa
         * Author: ntthanh (18/08/2021)
         */
        async editEmployee({commit}, formInfor) {
            await commit('changeLoading', true);
            let employee = formInfor.employee;
            var errorValidate = false;
            await EmployeeAPI.update(employee.EmployeeId, employee)
            .then((res) => {//200 hoặc 201
                if(res.status ==201) {// Sửa thành công - mã 201
                    commit("addToastRight", {
                        message1: CONST_STRING.NOTIFICATION.EDIT_EMPLOYEE,
                        message2: employee.EmployeeCode,
                        message3: CONST_STRING.SUCCESS.SUCCESS_MESS,
                        type: CONST_STRING.SUCCESS.SUCCESS_TYPE,
                    });
                }
                else {//mã 200 - validate thất bại hoặc validate thành công nhưng sửa thất bại do lỗi 
                    console.log(res.status, res.data);
                    if(res.data.Validate) {//Validate thành công nhưng sửa bị lỗi 
                        commit("addToastRight", {
                            message1: CONST_STRING.NOTIFICATION.EDIT_EMPLOYEE,
                            message2: employee.EmployeeCode,
                            message3: CONST_STRING.ERROR.ERROR_MESS,
                            type: CONST_STRING.ERROR.ERROR_TYPE,
                        });
                    }
                    else {//Validate thất bại 
                        errorValidate = true;
                        commit("changePopupDuplicate", {
                            status: true,
                            message:res.data.Data,
                        });
                    }
                }
            })
            .catch((error) => {//400 hoặc 500
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: CONST_STRING.NOTIFICATION.EDIT_EMPLOYEE,
                    message2: employee.EmployeeCode,
                    message3: CONST_STRING.ERROR.ERROR_MESS,
                    type: CONST_STRING.ERROR.ERROR_TYPE,
                });
            })
            .finally(async () => {
                if(!errorValidate) {//Nếu không có lỗi do validate
                    if(formInfor.mode == ENUMS.FORM_SAVED) {//Nếu chỉ cất
                        //Dong form modal
                        await commit("changeModal", false);
                        //Tai lai du lieu
                        await this.dispatch('filterPaging');
            
                        //Set lại formMode về none 
                        await commit('setFormModeNone');
                    }
                    if(formInfor.mode == ENUMS.FORM_SAVED_ADD) {//Nếu cất và thêm
                        //Tai lai du lieu
                        await this.dispatch('filterPaging');

                        //reset lại form
                        await commit('resetForm');

                        //Đóng mở form để kích hoạt sk focus ô đầu tiên và lưu obj thông tin ban đầu
                        //Dong form modal
                        await commit("changeModal", false);

                        //lấy mã nhân viên mới
                        await this.dispatch('getEmployeeCode');

                        //Set form là thêm mới để tiếp tục Thêm
                        await commit('setFormModeAdd');

                        //Mo form modal
                        await commit("changeModal", true);
                        
                    }
                }
            });
            await commit('changeLoading', false);
        },

        /**
         * Goi api lọc và phân trang 
         * Author: ntthanh (18/08/2021)
         */
        async filterPaging({commit}) {
            await commit('changeLoading', true);
            await EmployeeAPI.filterPaging(
                this.state.filterPagingInfor.employeeFilter.trim(),//Bỏ khoảng trắng 2 đầu
                this.state.filterPagingInfor.pageSize,
                this.state.filterPagingInfor.pageIndex
            )
            .then((res) => {
                if(res.data.Validate) {//Validate thành công
                    //Dữ liệu nhận được nằm trong trong Data 
                    const dataResult = res.data.Data;

                    //Lưu kết quả nhận đươc vào FilterPagingResult
                    commit('setFilterPagingResult', dataResult);
                    //Lưu data vào employees để hiển thị lên table
                    commit('getEmployees', dataResult.Data);

                    //Nếu kết quả nhận được không có gì thì thông báo và không phân trang nữa
                    if(dataResult.TotalRecord == 0) {
                        commit("addToastRight", {
                            message1: CONST_STRING.NOTIFICATION.FILTER_EMPLOYEE_NO_CONTENT,
                            message2: CONST_STRING.STRING_EMPTY,
                            message3: CONST_STRING.STRING_EMPTY,
                            type: CONST_STRING.WARNING.WARNING_TYPE
                        });
                        commit('removeCurrentPages');
                    }
                    //Nếu có kết quả
                    else {
                        //Xử lý phân trang 
                        //Trước khi phân lại trang hiển thị cần xóa obj cũ trong mảng lưu trang đi   
                        commit('removeCurrentPages')
    
    
                        //Dấu 3 chấm
                        let ellipsis = '...';
                        //trang hiển thị dữ liệu hiện tại 
                        let currentPage = this.state.filterPagingInfor.pageIndex + 1; //do index tinh tu 0
                        //Tổng số trang
                        let totalPage = dataResult.TotalPage;
    
                        //Nếu sau khi lọc có ít hơn 6 trang dữ liệu, thì chỉ hiển thị hết số trang nhận được
                        if(dataResult.TotalPage <= 5) {
                            for(let page=1; page<=dataResult.TotalPage; page++) {
                                if(page == currentPage) {//nếu là trang đang hiển thị -> isSelect = true
                                    commit('setCurrentPages', {
                                        value: page,
                                        isSelect: true,
                                    });
                                }
                                else {//nếu không isSelect = false
                                    commit('setCurrentPages', {
                                        value: page,
                                        isSelect: false,
                                    });
                                }
                            }
                        }
                        //Nếu nhiều hơn 5 trang 
                        else{
                            //Kiểm tra xem trang cần hiển thi nằm ở đâu trong TotalPage
                            //Nếu là 1 trong 3 trang đầu hoặc 1 trong 3 trang cuối thì hiển thị kiểu: 1 2 3 ... 10 hoặc 1 ... 8 9 10
                            //Còn lại hiển thị sao cho trang hiện tại luôn nằm giữa kiểu: 1 ... 5 6 7 ... 10
        
                            //Triển khai
                            //Nếu là 1 trong 3 trang đầu thì hiển thị kiểu: 1 2 3 ... 10 
                            if(currentPage == 1 || currentPage == 2 || currentPage == 3) {
                                for(let page=1; page<=3; page++) {
                                    if(page == currentPage) {//nếu là trang đang hiển thị -> isSelect = true
                                        commit('setCurrentPages', {
                                            value: page,
                                            isSelect: true,
                                        });
                                    }
                                    else {//nếu không isSelect = false
                                        commit('setCurrentPages', {
                                            value: page,
                                            isSelect: false,
                                        });
                                    }
                                }
                                commit('setCurrentPages', {
                                    value: ellipsis,
                                    isSelect: false,
                                    position: 'only',
                                });
                                commit('setCurrentPages', {
                                    value: totalPage,
                                    isSelect: false,
                                });
                            }
                            //Nếu là 1 trong 3 trang cuối thì hiển thị kiểu: 1 ... 8 9 10
                            else if(currentPage == totalPage - 2 || currentPage == totalPage - 1 || currentPage == totalPage) {
                                commit('setCurrentPages', {
                                    value: 1,
                                    isSelect: false,
                                });
                                commit('setCurrentPages', {
                                    value: ellipsis,
                                    isSelect: false,
                                    position: 'only',
                                });
                                for(let page=totalPage-2; page<=totalPage; page++) {
                                    if(page == currentPage) {//nếu là trang đang hiển thị -> isSelect = true
                                        commit('setCurrentPages', {
                                            value: page,
                                            isSelect: true,
                                        });
                                    }
                                    else {//nếu không isSelect = false
                                        commit('setCurrentPages', {
                                            value: page,
                                            isSelect: false,
                                        });
                                    }
                                }
                            }
                            //Còn lại hiển thị sao cho trang hiện tại luôn nằm giữa kiểu: 1 ... 5 6 7 ... 10
                            else {
                                commit('setCurrentPages', {
                                    value: 1,
                                    isSelect: false,
                                });
                                commit('setCurrentPages', {
                                    value: ellipsis,
                                    isSelect: false,
                                    position: 'front',
                                });
                                for(let page=currentPage-1; page<=currentPage+1; page++) {
                                    if(page == currentPage) {//nếu là trang đang hiển thị -> isSelect = true
                                        commit('setCurrentPages', {
                                            value: page,
                                            isSelect: true,
                                        });
                                    }
                                    else {//nếu không isSelect = false
                                        commit('setCurrentPages', {
                                            value: page,
                                            isSelect: false,
                                        });
                                    }
                                }
                                commit('setCurrentPages', {
                                    value: ellipsis,
                                    isSelect: false,
                                    position: 'back',
                                });
                                commit('setCurrentPages', {
                                    value: totalPage,
                                    isSelect: false,
                                });
                            }
                        }
                    }   
                }
                else {//Validate thất bại 
                    console.log(res.status, res.data);
                    commit('addToastRight', {
                        message1: res.data.UserMsg,
                        message2: CONST_STRING.STRING_EMPTY,
                        message3: CONST_STRING.STRING_EMPTY,
                        type: CONST_STRING.ERROR.ERROR_TYPE
                    });
                }
            })
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: CONST_STRING.ERROR.ERROR_LOAD_DATA,
                    message2: CONST_STRING.STRING_EMPTY,
                    message3: CONST_STRING.STRING_EMPTY,
                    type: CONST_STRING.ERROR.ERROR_TYPE,
                });
                commit('addToastTop', {
                    title: CONST_STRING.NOTIFICATION.NOTIFICATION_MESS,
                    message1: CONST_STRING.ERROR.ERROR_LOAD_DATA,
                    message2: CONST_STRING.NOTIFICATION.CHECKING_CONNECTION,
                    message3: CONST_STRING.NOTIFICATION.SUPPORT
                });
            }) 
            await commit('changeLoading', false);
        }
    }
})

export default store