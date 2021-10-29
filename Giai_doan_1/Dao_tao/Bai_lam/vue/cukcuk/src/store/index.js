import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
// import VueAxios from 'vue-axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        displayModal: false,
        employeeCode: '',//Ma nhan vien 
        employees: [], //Chua obj cac nhan vien
        employeeRemove: [],//Chua Id cac nhan vien se xoa
        employeeModal:{
            EmployeeCode: '',
            FullName: '',
            DateOfBirth: '',
            Gender: '',
            IdentityNumber: '',
            IdentityDate: '',
            IdentityPlace: '',
            Email: '',
            PhoneNumber: '',
            PositionName: '',
            DepartmentName: '',
            PersonalTaxCode: '',
            Salary: '',
            JoinDate: '',
            WorkStatus: '',
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

        /**
         * obj popUp co dang
         * @param {string} title Tieu de canh bao 
         * @param {string} message1 Thong diep canh bao
         * @param {string} message2 Thong diep canh bao
         * @param {string} content_btn1 Noi dung hien thi button 1
         * @param {string} content_btn2 Noi dung hien thi button 2
         * @param {string} color Mau chủ đạo the hien tuy tinh huong canh bao
         * @param {string} flag cờ đánh dấu popup cảnh báo công việc gì, chỉ nhận các giá trị ở state flag trong store
         */
        popUp: [], //Mang cac obj luu thong tin popUp

        //Cờ đánh dấu dùng cho popup
        flagPopUp: {
            flagRemoveEmployee: false,
        },

        //Chế độ của form (thêm hay sửa)
        formMode: '',

        //Obj phong ban 
        department: [],
        //Obj phong ban dang duoc chon
        departmentSelected: {},

        //Obj Vi tri
        position: [],
        //Obj vi tri dang duoc chon
        positionSelected: {},

        //Gioi tinh
        gender: [
            {
                GenderId: 0,
                GenderName: "Nam",
                isSelect: true,
            },
            {
                GenderId: 1,
                GenderName: "Nữ",
                isSelect: false,
            },
            {
                GenderId: 2,
                GenderName: "Khác",
                isSelect: false,
            },
            {
                GenderId: 3,
                GenderName: "Không xác định",
                isSelect: false,
            },
        ],
        //Obj Gioi tinh dang duoc chọn (chọn mặc định gender đâu tiên)
        genderSelected: {
            GenderId: 0,
            GenderName: "Nam",
            isSelect: true,
        },

        //Tinh trang cong viec
        workStatus: [
            {
                WorkStatusId: 0,
                WorkStatusName: "Đang làm việc",
                isSelect: true,
            },
            {
                WorkStatusId: 1,
                WorkStatusName: "Đã nghỉ",
                isSelect: false,
            },
            {
                WorkStatusId: 2,
                WorkStatusName: "Khác",
                isSelect: false,
            }
        ],
        //Obj tinhf trang cong viec dang duoc chọn (chọn mặc định tình trạng đâu tiên)
        workStatusSelected: {
            WorkStatusId: 0,
            WorkStatusName: "Đang làm việc",
            isSelect: true,
        },
    },
    getters: {
        
    },
    mutations: {
        //Hien thi modal
        showModal(state) {
            state.displayModal = true;
        },
        hiddenModal(state) {
            state.displayModal = false;
        },
        //Luu ma nhan vien moi vao state
        getEmployeeCode(state, employeeCode) {
            state.employeeCode = employeeCode;
        },
        //Luu tat ca obj nhan vien vao mang 
        getEmployees(state, employees) {
            state.employees = employees;
        },
        //Them thông tin nhân vien cân xóa vao state employeeRemove
        addEmployeeRemove(state, employees) {
            for(let i=0; i<employees.length; i++) {
                state.employeeRemove.push(employees[i]);
            }
        },
        //Lam rong danh sach nhan vien can xoa
        emptyEmployeeRemove(state) {
            state.employeeRemove = [];
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

        //Xu ly popUp
        addPopUp(state, content) {//Them obj vao cuoi
            state.popUp.push(content);
        },
        removePopUp(state) {//Xoa obj dau tien
            state.popUp.shift();
        },
        //Đổi cờ trong flag popup 
        changeFlagPopUp(state, flag) {
            state.flagPopUp[flag] = !state.flagPopUp[flag];
        },

        //Set dữ liệu cho employeeModal bằng obj trong payload
        setEmployeeModal(state, employee) {
            state.employeeModal = employee;
        },

        //Set formMode la them
        setFormModeAdd(state) {
            state.formMode = 'add';
        },
        //Set formMode la sua
        setFormModeEdit(state) {
            state.formMode = 'edit';
        },
        //Set formMode la none
        setFormModeNone(state) {
            state.formMode = '';
        },

        //resetForm
        resetForm(state) {
            Object.keys(state.employeeModal).forEach(function(index) {
                state.employeeModal[index] = '';
            });
        },

        //gán thong tin phong ban vào store
        getDepartment(state, department) {
            state.department = department;
        },

        //gán thông tin vị trí vào store
        getPosition(state, position) {
            state.position = position;
        },

        //Khi chọn 1 item trong combobox chuyển isSelect item đó thành true
        //Set selected bang obj da chon
        selectItemCombobox(state, inforItem) {
            let inforStateCombobox = inforItem.key;
            let inforStateComboboxId = inforItem.id;
            if(inforStateCombobox == 'position') {
                for(let i=0; i<state.position.length; i++) {
                    if(state.position[i].PositionId == inforStateComboboxId) {
                        state.position[i].isSelect = true;
                        state.positionSelected = state.position[i];
                    }
                    else {
                        state.position[i].isSelect = false;
                    }
                }
            }
            if(inforStateCombobox == 'department') {
                for(let i=0; i<state.department.length; i++) {
                    if(state.department[i].DepartmentId == inforStateComboboxId) {
                        state.department[i].isSelect = true;
                        state.departmentSelected = state.department[i];
                    }
                    else {
                        state.department[i].isSelect = false;
                    }
                }
            }
            if(inforStateCombobox == 'gender') {
                for(let i=0; i<state.gender.length; i++) {
                    if(state.gender[i].GenderId == inforStateComboboxId) {
                        state.gender[i].isSelect = true;
                        state.genderSelected = state.gender[i];
                    }
                    else {
                        state.gender[i].isSelect = false;
                    }
                }
            }
            if(inforStateCombobox == 'workStatus') {
                for(let i=0; i<state.workStatus.length; i++) {
                    if(state.workStatus[i].WorkStatusId == inforStateComboboxId) {
                        state.workStatus[i].isSelect = true;
                        state.workStatusSelected = state.workStatus[i];
                    }
                    else {
                        state.workStatus[i].isSelect = false;
                    }
                }
            }
        },

    },
    actions: {
        //Goi api lay ma nhan vien
        getEmployeeCode({commit}) {
            axios
            .get("http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode")
            .then(function(res) {
                commit("getEmployeeCode", res.data);
                commit("addToastRight", {
                    message1: `Lấy mã nhân viên thành công`,
                    message2: ``,
                    message3: ``,
                    type: "success",
                });
            }) 
            .catch((res) => {
                commit("addToastRight", {
                    message1: `Lấy mã nhân viên thất bại`,
                    message2: ``,
                    message3: ``,
                    type: "error",
                });
                console.log(res);
            });
        },

        //Goi Api thuc hien lay du lieu
        getEmployees({commit}) {
            axios
            .get("http://cukcuk.manhnv.net/v1/Employees")
            .then((res) => {
                console.log(res.data);
                commit("getEmployees", res.data);
                commit('addToastTop', {
                    title: `Thông báo`,
                    message1: `Tải dữ liệu thành công!`,
                    message2: ``,
                    message3: ``,
                });
            }) 
            .catch((res) => {
                commit('addToastTop', {
                    title: `Thông báo`,
                    message1: `Tải dữ liệu thất bại!`,
                    message2: `Vui lòng kiểm tra kết nối của bạn`,
                    message3: `Hoặc liên hệ với quản trị viên hệ thống`,
                });
                console.log(res);
            });
        },

        //goi Api lay thong tin phong ban (department)
        getDepartment({commit}) {
            axios
            .get('http://cukcuk.manhnv.net/api/Department')
            .then((res) => {
                //Them cờ để chọn item
                for(let i=1; i<res.data.length; i++) {
                    res.data[i].isSelect = false;
                }
                //Mặc định chọn item đầu
                res.data[0].isSelect = true;
                //Chọn mặc định phòng ban đầu tiên 
                this.state.departmentSelected = res.data[0];
                commit('getDepartment', res.data);
                // commit("addToastRight", {
                //     message1: `Lấy thông tin phòng ban thành công`,
                //     message2: ``,
                //     message3: ``,
                //     type: "success",
                // });
            })
            .catch((res) => {
                commit("addToastRight", {
                    message1: `Lấy thông tin phòng ban thất bại`,
                    message2:``,
                    message3: ``,
                    type: "error",
                });
                console.log(res);
            });
        },

        //goi Api lay thong tin vi tri (position)
        getPosition({commit}) {
            axios
            .get('http://cukcuk.manhnv.net/v1/Positions')
            .then((res) => {
                //Them cờ để chọn item
                for(let i=0; i<res.data.length; i++) {
                    res.data[i].isSelect = false;
                }
                res.data[0].isSelect = true;
                //chọn mặc định vị trí đầu tiên
                this.state.positionSelected = res.data[0];
                commit('getPosition', res.data);
                // commit("addToastRight", {
                //     message1: `Lấy thông tin vị trí thành công`,
                //     message2: ``,
                //     message3: ``,
                //     type: "success",
                // });
            })
            .catch((res) => {
                commit("addToastRight", {
                    message1: `Lấy thông tin vị trí thất bại`,
                    message2:``,
                    message3: ``,
                    type: "error",
                });
                console.log(res);
            });
        },

        //Goi api xoa các nhân viên đã chọn (lấy ra từ state employeeRemove)
        removeEmployees({commit}) {
            for(let i=0; i<this.state.employeeRemove.length; i++) {
                let employeeId = this.state.employeeRemove[i].employeeId;
                let employeeCode = this.state.employeeRemove[i].employeeCode;
                //Goi api xoa nhan vien
                axios
                .delete('http://cukcuk.manhnv.net/v1/Employees/' +  employeeId)
                .then(() => {
                    commit("addToastRight", {
                        message1: `Xóa nhân viên mã`,
                        message2: employeeCode,
                        message3: "thành công",
                        type: "success",
                    });
                })
                .catch((res) => {
                    commit("addToastRight", {
                        message1: `Xóa nhân viên mã`,
                        message2: employeeCode,
                        message3: "thất bại",
                        type: "error"
                    });
                    console.log(res);
                });
            }
            //Lamf rong mang nhan vien can Xoa
            commit('emptyEmployeeRemove');
            //Load lai du lieu
            setTimeout(() =>{this.dispatch('getEmployees')}, 500);
        },

        //Goi api lay thong tin nhan vien bang id 
        getEmployeeById({commit}, employeeId) {
            axios
            .get(`http://cukcuk.manhnv.net/v1/Employees/${employeeId}`)
            .then((res) => {
                let result = res.data;

                //Format ngay thang dung de hien thi len form 
                let fieldDateFormat = ['CreatedDate', 'DateOfBirth', 'IdentityDate', 'ModifiedDate'];
                fieldDateFormat.forEach((fieldDate) => {
                    let dateTime = new Date(result[fieldDate]);
                    if (Number.isNaN(dateTime.getTime())) {
                        return "";
                    } else {
                        let day = dateTime.getDate(),
                            month = dateTime.getMonth() + 1,
                            year = dateTime.getFullYear();
                        day = day < 10 ? "0" + day : day;
                        month = month < 10 ? "0" + month : month;
                        result[fieldDate] = `${year}-${month}-${day}`;
                        // return `${year}-${month}-${day}`;
                    }
                })

                //Đổi item trong combobox đúng với  giá trị trả về -> thay đổi departmentSelected, positionSelected, ...
                //Đổi isSelect cho department và departmentSelected
                
                for(let i=0; i<this.state.department.length; i++) {
                    if(this.state.department[i].DepartmentId == result.DepartmentId) {
                        this.state.departmentSelected = this.state.department[i];
                        this.state.department[i].isSelect = true;
                    }
                    else {
                        this.state.department[i].isSelect = false;
                    }
                }
                //Đổi isSelect cho position và positionSelected
                for(let i=0; i<this.state.position.length; i++) {
                    if(this.state.position[i].PositionId == result.PositionId) {
                        this.state.positionSelected = this.state.position[i];
                        this.state.position[i].isSelect = true;
                    }
                    else {
                        this.state.position[i].isSelect = false;
                    }
                }
                //Đổi isSelect cho gender và genderSelected
                for(let i=0; i<this.state.gender.length; i++) {
                    if(this.state.gender[i].GenderId == result.Gender) {
                        this.state.genderSelected = this.state.gender[i];
                        this.state.gender[i].isSelect = true;
                    }
                    else {
                        this.state.gender[i].isSelect = false;
                    }
                }
                //Đổi isSelect cho workStatus và workStatusSelected
                for(let i=0; i<this.state.workStatus.length; i++) {
                    if(this.state.workStatus[i].WorkStatusId == result.WorkStatus) {
                        this.state.workStatusSelected = this.state.workStatus[i];
                        this.state.workStatus[i].isSelect = true;
                    }
                    else {
                        this.state.workStatus[i].isSelect = false;
                    }
                }

                commit("setEmployeeModal", result);
                commit("getEmployeeCode", result.EmployeeCode);
                commit("addToastRight", {
                    message1: `Lấy thông tin nhân viên mã`,
                    message2: result.EmployeeCode,
                    message3: `thành công`,
                    type: "success",
                });
            }) 
            .catch((error) => {
                commit("addToastRight", {
                    message1: `Lấy thông tin nhân viên`,
                    message2: `thất bại`,
                    message3: ``,
                    type: "error",
                });
                console.log(error);
            });
        },

        //Them nhan vien
        addEmployee({commit},employee) {
            console.log(employee);
            axios
            .post('http://cukcuk.manhnv.net/v1/Employees', employee)
            .then(() => {
                commit("addToastRight", {
                    message1: `Thêm nhân viên mã`,
                    message2: employee.EmployeeCode,
                    message3: "thành công",
                    type: "success",
                });
            })
            .catch((error) => {
                commit("addToastRight", {
                    message1: `Thêm nhân viên mã`,
                    message2: employee.EmployeeCode,
                    message3: "thất bại",
                    type: "error",
                });
                console.log(error);
            });
            //Dong form modal
            commit("hiddenModal");
            //Tai lai du lieu
            setTimeout(() =>{this.dispatch('getEmployees')}, 500);

            //Set lại formMode về none 
            commit('setFormModeNone');
        },

        // Sửa nhân viên
        editEmployee({commit}, employee) {
            axios
            .put(`http://cukcuk.manhnv.net/v1/Employees/${employee.EmployeeId}`, employee)
            .then(() => {
                commit("addToastRight", {
                    message1: `Sửa nhân viên mã`,
                    message2: employee.EmployeeCode,
                    message3: "thành công",
                    type: "success",
                });
            })
            .catch((error) => {
                commit("addToastRight", {
                    message1: `Sửa nhân viên mã`,
                    message2: employee.EmployeeCode,
                    message3: "thất bại",
                    type: "error",
                });
                console.log(error);
            })

            //Dong form modal
            commit("hiddenModal");
            //Tai lai du lieu
            setTimeout(() =>{this.dispatch('getEmployees')}, 500);

            //Set lại formMode về none 
            commit('setFormModeNone');
        },

        //Goi api filter
        filter({commit}, inforFilter) {
            console.log(inforFilter);
            axios
            .get('http://cukcuk.manhnv.net/v1/Employees/employeeFilter', {params: inforFilter})
            .then((res) => {
                commit('getEmployees', res.data);
                console.log(res.data);
                commit("addToastRight", {
                    message1: `Lọc nhân viên thành công`,
                    message2: ``,
                    message3: ``,
                    type: "success",
                });
            })
            .catch((error) => {
                commit("addToastRight", {
                    message1: `Lọc nhân viên thất bại`,
                    message2: ``,
                    message3: ``,
                    type: "error",
                });
                console.log(error);
            }) 
        }
    }
})

export default store