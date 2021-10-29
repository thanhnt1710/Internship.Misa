import Vue from 'vue'
import Vuex from 'vuex'
//import axios from "axios"
import EmployeeAPI from '../js/api/components/EmployeeAPI'
import DepartmentAPI from '../js/api/components/DepartmentAPI'
import Const from '../js/common/const.js'
// import VueAxios from 'vue-axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        //Trạng thái đong mở form
        modal: false,
        //employeeCode: '',//Ma nhan vien 
        employees: [], //Chua obj cac nhan vien

        //Lưu dữ liệu trong form
        employeeModal:{
            Gender: 0,//Mặc định có giới tính nam
        },

        //validate các trường trong form
        //true -> không có lỗi
        //false -> có lỗi
        validateFormState: {
            employeeCode: true,
            employeeName: true,
            departmentName: true,
        },

        /**
        * obj toastRight co dang
        * @param {string} message1 Công việc cần thông báo: Thêm nhân viên, Xóa nhân viên, ...
        * @param {string} message2 Mã nhân viên của mỗi lần thông báo
        * @param {string} message3 Kết quả (Thành công, thất bại, ...)
        * @param {string} type Kiểu thông báo để hiên thị màu (Chỉ nhận các giá trị định nghĩa sẵn: success, error, ...)
         */
        toastRight: [],//Mang các obj lưu thông tin toastRight

        /**
         * obj toastTop co dang
         * @param {string} title  Tieu de thong bao
         * @param {string} message1 Noi dung thong bao
         * @param {string} message2 Noi dung thong bao
         * @param {string} message3 Noi dung thong bao
         */
        toastTop:[],//Mang các obj lưu thông tin toastTop

        //State lưu nội dung popup cảnh báo khi đóng form
        //status: trạng thái đóng, mở
        //message: câu thông báo
        popupCancel: {
            status: false,
            message: '',
        },

        //State lưu nội dung popup validate 
        //status: trạng thái đóng, mở
        //message: câu thông báo
        popupValidate: {
            status: false,
            message: '',
        },

        //State lưu nội dung popup cảnh báo khi xóa nhân viên
        //status: trạng thái đóng, mở
        //message: câu thông báo
        popupDelete: {
            status: false,
            message: '',
        },
        
        //State cảnh báo trùng sữ liệu
        //status: trạng thái đóng, mở
        //message: câu thông báo
        popupDuplicate: {
            status: false,
            message: '',
        },

        //Chế độ của form (thêm-1, sửa-2 hay nhân bản-3, none-0)
        formMode: 0,

        //Mảng các obj chứa tất cả dữ liệu đơn vị 
        department: [],
        //Obj đơn vị đang được chọn
        departmentSelected: {},
        //Mảng các obj đơn vị đang hiển thị hiện tại
        departmentCurrent: [],

        //Giá trị input hiện tại trong input đơn vị
        inputDepartmentCurrent: '',

        //obj chứa thông tin nhân viên sẽ xóa 
        employeeRemove: {
            // employeeId: '',
            // employeeCode:'',
        },

        //State dùng cho lọc và phân trang 
        //Thoong tin lọc và phân trang
        filterPagingInfor: {
            employeeFilter: "",
            pageIndex: 0,
            pageSize: 10,
        },

        //Dữ liệu lọc và phân trang nhận được sau khi gửi lên server
        filterPagingResult:{},

        //Mảng lưu obj các trang hiển thị hiện tại 
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
        loading: false,
    },
    getters: {
        
    },
    mutations: {
        //Thay đổi trạng thái form 
        changeModal(state, status) {
            state.modal = status;
        },
        //Luu ma nhan vien moi vao state employeeCode và lưu vào state employeeModal
        getEmployeeCode(state, employeeCode) {
            state.employeeModal.EmployeeCode = employeeCode;
        },

        //Luu tat ca obj nhan vien vao mang 
        getEmployees(state, employees) {
            state.employees = employees;
        },   

        //Thay đổi trạng thái validate các trường trong form
        //param: inforChangeValidateFormState: {
        //      fieldName: tên trường thay đổi
        //      status: trạng thái validate (true, false)
        //}
        changeValidateFormState(state, inforChangeValidateFormState) {
            state.validateFormState[inforChangeValidateFormState.fieldName] = inforChangeValidateFormState.status;
        },

        //Xu ly toastRight
        addToastRight(state, content) {//Them obj vao cuoi
            state.toastRight.push(content);
        },
        removeToastRight(state) {//Xoa obj dau tien
            state.toastRight = [];
        },

        //Xu ly toastTop
        addToastTop(state, content) {//Them obj vao cuoi
            state.toastTop.push(content);
        },
        removeToastTop(state) {//Xoa obj dau tien
            state.toastTop.shift();
        },

        /**
         * Thay đổi trạng thái và nội dung popup đóng form
         * @param {*} state 
         * @param {*} popupCancel obj lưu thông tin thay đổi
         * author: ntthanh (20/08/2021)
         */
        changePopupCancel(state, popupCancel) {
            state.popupCancel = popupCancel;
        },

        /**
         * Thay đổi trạng thái và nội dung popup thông báo validate
         * @param {*} state 
         * @param {*} popupValidate obj lưu thông tin thay đổi
         * author: ntthanh (20/08/2021)
         */
         changePopupValidate(state, popupValidate) {
            state.popupValidate = popupValidate;
        },

        /**
         * Thay đổi trạng thái và nội dung popup thông báo xóa nhân viên
         * @param {*} state 
         * @param {*} popupDelete obj lưu thông tin thay đổi
         * author: ntthanh (20/08/2021)
         */
        changePopupDelete(state, popupDelete) {
            state.popupDelete = popupDelete;
        },

        /**
         * Thay đổi trạng thái và nội dung popup thông báo trùng dữ liệu
         * @param {*} state 
         * @param {*} popupDuplicate obj lưu thông tin thay đổi
         * author: ntthanh (20/08/2021)
         */
         changePopupDuplicate(state, popupDuplicate) {
            state.popupDuplicate = popupDuplicate;
        },

        //Set dữ liệu cho employeeModal bằng obj trong payload
        setEmployeeModal(state, employee) {
            state.employeeModal = employee;
        },

        //Set dữ liệu cho giới tính trong employeeModal 
        setGenderEmployeeModal(state, valueGender) {
            state.employeeModal.Gender = valueGender;
        },

        //Set formMode la them
        setFormModeAdd(state) {
            state.formMode = Const.FORM_MODE_ADD;
        },
        //Set formMode la sua
        setFormModeEdit(state) {
            state.formMode = Const.FORM_MODE_EDIT;
        },
        //Set formMode la nhân bản
        setFormModeReplica(state) {
            state.formMode = Const.FORM_MODE_REPLICA;
        },
        //Set formMode la none
        setFormModeNone(state) {
            state.formMode = Const.FORM_MODE_NONE;
        },

        //resetForm
        resetForm(state) {
            Object.keys(state.employeeModal).forEach(function(index) {
                state.employeeModal[index] = '';
            });
        },

        //Gán dữ liệu đơn vị lấy được từ api vào state department và state departmentCurrent
        getDepartment(state, department) {
            state.department = department;
            state.departmentCurrent = department;
        },

        //Thêm 1 obj vào cuối state departmentCurrent
        addDepartmentCurrent(state, department) {
            state.departmentCurrent.push(department);
        },

        //Làm rỗng state departmentCurrent để thêm mới
        emptyDepartmentCurrent(state) {
            state.departmentCurrent = [];
        },

        //Thay đổi đơn vị đang được chọn
        changeDepartmentSelected(state, department) {
            state.departmentSelected = department;
        },

        //Thay đổi input đơn vị khi người dùng nhập
        changeInputDepartmentCurrent(state, inputDepartmentCurrent) {
            state.inputDepartmentCurrent = inputDepartmentCurrent;
        },

        //Gán thông tin nhân viên sẽ xóa vào store
        setEmployeeRemove(state, employeeRemove) {
            state.employeeRemove = employeeRemove;
        },

        //Làm rổng obj nhân viên sẽ xóa trong state employeeRemove
        emptyEmployeeRemove(state) {
            state.employeeRemove = {};
        },

        //Khi chọn 1 item trong combobox đơn vị chuyển isSelect item đó thành true
        //Set selected bang obj da chon
        //Set input đơn vị bằng departmentName đã chọn
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
        //Set dữ liệu lọc và phân trang nhận được sau khi gửi lên server
        setFilterPagingResult(state, filterPagingResult) {
            state.filterPagingResult = filterPagingResult;
        },

        //add obj dữ liệu cho mảng các obj trang hiện tại để hiển thị 
        setCurrentPages(state, objPage) {
            state.currentPages.push(objPage);
        },

        //Xoas obj trong currentPages để thêm lại từ đầu
        removeCurrentPages(state) {
            state.currentPages = [];
        },

        //thay đổi pageIndex để đổi trang hiển thị
        changePageIndex(state, pageIndex) {
            state.filterPagingInfor.pageIndex = pageIndex;
        },

        //thay đổi pageSize để đổi trang hiển thị
        changePageSize(state, pageSize) {
            state.filterPagingInfor.pageSize = pageSize;
        },

        //Thay đổi employeeFilter và pageIndex = 0 khi nhấn tìm kiếm
        changeEmployeeFilter(state, employeeFilter) {
            state.filterPagingInfor.employeeFilter = employeeFilter;
            state.filterPagingInfor.pageIndex = 0;
        },


        //Đổi trạng thái loading
        changeLoading(state, status) {
            state.loading = status;
        },

    },
    actions: {
        //Goi api lay ma nhan vien
        getEmployeeCode({commit}) {
            EmployeeAPI.getEmployeeCode()
            .then(function(res) {
                if(res.data.MISACode == Const.MISACODE_SUCCESS) {//Nếu lấy thành công 
                    commit("getEmployeeCode", res.data.Data);
                    //commit('changeModal', true);//Hiện modal
                }
                else {//Lấy thất bại 
                    console.log(res.status, res.data);  
                    commit("addToastRight", {
                        message1: res.data.Data,
                        message2: Const.STRING_EMPTY,
                        message3: Const.STRING_EMPTY,
                        type: Const.ERROR_TYPE,
                    });
                }
            }) 
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: Const.ERROR_GET_EMPLOYEE_CODE,
                    message2: Const.STRING_EMPTY,
                    message3: Const.STRING_EMPTY,
                    type: Const.ERROR_TYPE,
                });
            });
        },

        //Goi Api thuc hien lay tất cả du lieu
        getEmployees({commit}) {
            EmployeeAPI.getAll()
            .then((res) => {
                if(res.status == 200) {//Có dữ liệu 
                    commit("getEmployees", res.data);
                    commit("addToastRight", {
                        message1: Const.SUCCESS_GET_EMPLOYEES,
                        message2: Const.STRING_EMPTY,
                        message3: Const.STRING_EMPTY,
                        type: Const.SUCCESS_TYPE,
                    });
                }
                else {// res.status == 204 -> không có dữ liệu
                    console.log(res.status, res.data);
                    commit("addToastRight", {
                        message1: Const.GET_EMPLOYEES_NO_CONTENT,
                        message2: Const.STRING_EMPTY,
                        message3: Const.STRING_EMPTY,
                        type: Const.WARNING_TYPE,
                    });
                }
            }) 
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit('addToastTop', {
                    title: Const.NOTIFICATION,
                    message1: Const.ERROR_LOAD_DATA,
                    message2: Const.CHECKING_CONNECTION,
                    message3: Const.SUPPORT,
                });
            });
        },

        //goi Api lay thong tin đơn vị (department)
        getDepartment({commit}) {
            DepartmentAPI.getAll()
            .then((res) => {
                if(res.status == 200) {//Có dữ liệu 
                    //Them cờ để chọn item
                    for(let i=0; i<res.data.length; i++) {
                        res.data[i].isSelect = false;

                        // if(i==0) {//Mặc định chọn item đầu
                        //     res.data[i].isSelect = true;
                        // }
                        // else {
                        //     res.data[i].isSelect = false;
                        // }

                    }
                    //Chọn mặc định vị trí nv đầu tiên
                    // this.state.departmentSelected = res.data[0];
                    
                    //Lưu dữ liệu vào state department
                    commit('getDepartment', res.data);
                }
                else {// res.status == 204 -> không có dữ liệu
                    console.log(res.status, res.data);
                    commit("addToastRight", {
                        message1: Const.GET_DEPARTMENT_NO_CONTENT,
                        message2: Const.STRING_EMPTY,
                        message3: Const.STRING_EMPTY,
                        type: Const.WARNING_TYPE,
                    });
                }
            })
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: Const.ERROR_GET_DEPARTMENT,
                    message2: Const.STRING_EMPTY,
                    message3: Const.STRING_EMPTY,
                    type: Const.ERROR_TYPE,
                });
            });
        },

        //Goi api xoa nhân viên đã chọn (lấy ra từ state employeeRemove)
        async removeEmployee({commit}) {
            let employeeId = this.state.employeeRemove.employeeId;
            let employeeCode = this.state.employeeRemove.employeeCode;
            //Goi api xoa nhan vien
            await EmployeeAPI.delete(employeeId)
            .then((res) => {//200: có thể xóa được hoặc không-> check MISACode trả về
                if(res.data.MISACode == Const.MISACODE_SUCCESS) {//Xóa thành công
                    commit("addToastRight", {
                        message1: Const.REMOVE_EMPLOYEE,
                        message2: employeeCode,
                        message3: Const.SUCCESS,
                        type: Const.SUCCESS_TYPE
                    });
                }
                else {// Xóa không thành công
                    console.log(res.status, res.data);
                    commit("addToastRight", {
                        message1: Const.REMOVE_EMPLOYEE,
                        message2: employeeCode,
                        message3: Const.ERROR,
                        type: Const.ERROR_TYPE
                    });
                }
            })
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: Const.REMOVE_EMPLOYEE,
                    message2: employeeCode,
                    message3: Const.ERROR,
                    type: Const.ERROR_TYPE
                });
            });
            
            //Làm rỗng obj lưu nhan vien can Xoa
            await commit('emptyEmployeeRemove');
            //Load lai du lieu
            await this.dispatch('filterPaging');
        },

        //Goi api lay thong tin nhan vien bang id 
        getEmployeeById({commit}, employeeId) {
            EmployeeAPI.getById(employeeId)
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

                    //Mở modal
                    //commit('changeModal', true);

                }
                else {// res.status == 204 -> không có dữ liệu
                    console.log(res.status, res.data);
                    //Tải dữ liệu rỗng vào modal để thể hiện không có dữ liệu
                    let employee = {};
                    commit("setEmployeeModal", employee);
                    //Hiện thông báo
                    commit('addToastTop', {
                        title: Const.NOTIFICATION,
                        message1: Const.INFOR_EMPLOYEES_NO_CONTENT,
                        message2: Const.RELOAD,
                        message3: Const.STRING_EMPTY
                    });
                }
            }) 
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: Const.GET_INFOR_EMPLOYEES,
                    message2: Const.ERROR,
                    message3: Const.STRING_EMPTY,
                    type: Const.ERROR_TYPE,
                });
            });
        },

        //Them nhan vien
        addEmployee({commit}, formInfor) {
            let employee = formInfor.employee;
            let errorValidate = false;
            EmployeeAPI.add(employee)
            .then((res) => {//200 hoặc 201
                if(res.status ==201) {// Thêm thành công - mã 201
                    commit("addToastRight", {
                        message1: Const.ADD_EMPLOYEE,
                        message2: employee.EmployeeCode,
                        message3: Const.SUCCESS,
                        type: Const.SUCCESS_TYPE,
                    });
                }
                else {//mã 200 - validate thất bại hoặc validate thành công nhưng thêm thất bại do lỗi 
                    console.log(res.status, res.data);
                    if(res.data.Validate) {//Validate thành công nhưng thêm bị lỗi 
                        commit("addToastRight", {
                            message1: Const.ADD_EMPLOYEE,
                            message2: employee.EmployeeCode,
                            message3: Const.ERROR,
                            type: Const.ERROR_TYPE,
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
                    message1: Const.ADD_EMPLOYEE,
                    message2: employee.EmployeeCode,
                    message3: Const.ERROR,
                    type: Const.ERROR_TYPE,
                });
            })
            .finally(async () => {
                if(!errorValidate) {//Nếu không có lỗi do validate
                    if(formInfor.mode == Const.FORM_SAVED) {//Nếu chỉ cất
                        //Dong form modal
                        await commit("changeModal", false);
                        //Tai lai du lieu
                        await this.dispatch('filterPaging');
            
                        //Set lại formMode về none 
                        await commit('setFormModeNone');
                    }
                    if(formInfor.mode == Const.FORM_SAVED_ADD) {//Nếu cất và thêm
                        //Tai lai du lieu
                        await this.dispatch('filterPaging');

                        //reset lại form
                        await commit('resetForm');

                        //Đóng mở form để kích hoạt sk focus ô đầu tiên
                        //Dong form modal
                        await commit("changeModal", false);

                        //lấy mã nhân viên mới
                        await this.dispatch('getEmployeeCode');

                        //Mo form modal
                        await commit("changeModal", true);
                    }
                }
            })
        },

        // Sửa nhân viên
        async editEmployee({commit}, formInfor) {
            let employee = formInfor.employee;
            var errorValidate = false;
            EmployeeAPI.update(employee.EmployeeId, employee)
            .then((res) => {//200 hoặc 201
                if(res.status ==201) {// Sửa thành công - mã 201
                    commit("addToastRight", {
                        message1: Const.EDIT_EMPLOYEE,
                        message2: employee.EmployeeCode,
                        message3: Const.SUCCESS,
                        type: Const.SUCCESS_TYPE,
                    });
                }
                else {//mã 200 - validate thất bại hoặc validate thành công nhưng sửa thất bại do lỗi 
                    console.log(res.status, res.data);
                    if(res.data.Validate) {//Validate thành công nhưng sửa bị lỗi 
                        commit("addToastRight", {
                            message1: Const.EDIT_EMPLOYEE,
                            message2: employee.EmployeeCode,
                            message3: Const.ERROR,
                            type: Const.ERROR_TYPE,
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
                    message1: Const.EDIT_EMPLOYEE,
                    message2: employee.EmployeeCode,
                    message3: Const.ERROR,
                    type: Const.ERROR_TYPE,
                });
            })
            .finally(async () => {
                if(!errorValidate) {//Nếu không có lỗi do validate
                    if(formInfor.mode == Const.FORM_SAVED) {//Nếu chỉ cất
                        //Dong form modal
                        await commit("changeModal", false);
                        //Tai lai du lieu
                        await this.dispatch('filterPaging');
            
                        //Set lại formMode về none 
                        await commit('setFormModeNone');
                    }
                    if(formInfor.mode == Const.FORM_SAVED_ADD) {//Nếu cất và thêm
                        //Tai lai du lieu
                        await this.dispatch('filterPaging');

                        //reset lại form
                        await commit('resetForm');

                        //Đóng mở form để kích hoạt sk focus ô đầu tiên
                        //Dong form modal
                        await commit("changeModal", false);

                        //lấy mã nhân viên mới
                        await this.dispatch('getEmployeeCode');

                        //Mo form modal
                        //setTimeout(() => {
                        await commit("changeModal", true);
                        //})
                    }
                }
            })
        },

        //Goi api lọc và phân trang 
        async filterPaging({commit}) {
            await commit('changeLoading', true);
            console.log(this.state.filterPagingInfor);
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
                    //Nếu kết quả nhận được không có gì thì thông báo
                    if(dataResult.TotalRecord == 0) {
                        commit("addToastRight", {
                            message1: Const.FILTER_EMPLOYEE_NO_CONTENT,
                            message2: Const.STRING_EMPTY,
                            message3: Const.STRING_EMPTY,
                            type: Const.WARNING_TYPE
                        });
                    }
                    
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
                else {//Validate thất bại 
                    console.log(res.status, res.data);
                    commit('addToastRight', {
                        message1: res.data.UserMsg,
                        message2: Const.STRING_EMPTY,
                        message3: Const.STRING_EMPTY,
                        type: Const.ERROR_TYPE
                    });
                }
            })
            .catch((error) => {
                console.log(error.response.status, error.response.data);
                commit("addToastRight", {
                    message1: Const.ERROR_LOAD_DATA,
                    message2: Const.STRING_EMPTY,
                    message3: Const.STRING_EMPTY,
                    type: Const.ERROR_TYPE,
                });
                commit('addToastTop', {
                    title: Const.NOTIFICATION,
                    message1: Const.ERROR_LOAD_DATA,
                    message2: Const.CHECKING_CONNECTION,
                    message3: Const.SUPPORT
                });
            }) 
            await commit('changeLoading', false);
        }
    }
})

export default store