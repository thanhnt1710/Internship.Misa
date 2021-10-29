<template>
    <div class="modal"
        @keydown.ctrl.83.exact.prevent.stop="saveEmployee"
        @keydown.ctrl.shift.83.exact.prevent.stop="saveAndAddEmployee"
        @keydown.27="handleCancelForm"
    > 
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-content-header">
                <div class="modal-content-header-left">
                    <div class="modal-content-header-left-wrap">
                        <div class="modal-content-header-left-wrap-title">Thông tin nhân viên</div>
                        <div class="checkbox">
                            <span class="checkbox-wrap checkbox-selected">
                                <div class="svg-img checkbox-icon"></div>
                            </span>
                            <div class="checkbox-text">Là khách hàng</div>
                        </div>
                        <div class="checkbox">
                            <span class="checkbox-wrap">
                                <div class="svg-img checkbox-icon"></div>
                            </span>
                            <div class="checkbox-text">Là nhà cung cấp</div>
                        </div>
                    </div>
                </div>
                <div class="modal-content-header-right">
                    <div class="modal-content-header-right-wrap">
                        <div class="svg-img svg-img-24 modal-content-header-right-help"></div>
                        <div v-on:click="handleCancelForm" class="svg-img svg-img-24 modal-content-header-right-cancel"></div>
                    </div>
                </div>
            </div>
            <div class="modal-content-body">
                <div class="modal-content-body-top">
                    <div class="modal-content-body-top-column modal-content-body-top-left">
                        <div class="modal-content-body-top-row">
                            <div class="modal-content-body-top-row-wrap">
                                <div class="form-item form-item-code">
                                    <div class="form-item-label">
                                        Mã
                                        <span>*</span>
                                    </div>
                                    <div class="form-item-content">
                                        <input 
                                            ref="employeeCode"
                                            v-model="employeeModal.EmployeeCode"
                                            fieldName="EmployeeCode"
                                            fieldValidate="employeeCode"
                                            maxlength="20"
                                            class="form-item-input"
                                            required
                                            title=""
                                            @blur="blurInput($refs.employeeCode)"
                                            @mouseover.stop="hoverInputValidate"
                                            @mouseleave="mouseleaveInputValidate"
                                        >
                                        <div v-if="!validateFormState.employeeCode" class="tooltip-validate tooltip-validate-code">Mã không được để trống</div>
                                    </div>
                                </div>
                                <div class="form-item form-item-name">
                                    <div class="form-item-label">
                                        Tên
                                        <span>*</span>
                                    </div>
                                    <div class="form-item-content">
                                        <input 
                                            ref="employeeName"
                                            v-model="employeeModal.EmployeeName"
                                            fieldName="EmployeeName"
                                            fieldValidate="employeeName"
                                            maxlength="100"
                                            class="form-item-input"
                                            required
                                            title=""
                                            @blur="blurInput($refs.employeeName)"
                                            @mouseover.stop="hoverInputValidate"
                                            @mouseleave="mouseleaveInputValidate"
                                        >
                                        <div v-if="!validateFormState.employeeName" class="tooltip-validate tooltip-validate-name">Tên không được để trống</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-content-body-top-row">
                            <div class="modal-content-body-top-row-wrap">
                                <div class="form-item">
                                    <div class="form-item-label">
                                        Đơn vị
                                        <span>*</span>
                                    </div>
                                    <div class="form-item-content">
                                        <div class="form-item-content-input">
                                            <input 
                                                ref="departmentName"
                                                :value="inputDepartmentCurrent"
                                                placeholder="Chọn đơn vị"
                                                fieldName="DepartmentName"
                                                fieldValidate="departmentName"
                                                fieldId="DepartmentId"
                                                maxlength="255"
                                                class="form-item-input"
                                                required
                                                title=""
                                                autocomplete="off"
                                                @keydown="keyboardInput"
                                                @input="handleCombobox"
                                                @focus="focusInput"
                                                @blur="blurInput($refs.departmentName)"
                                                @mouseover="hoverInputValidate"
                                                @mouseleave="mouseleaveInputValidate"
                                            >
                                            <div v-on:click="handleShowComboboxDepartment" class="form-item-content-input-wrapicon">
                                                <div class="svg-img svg-img-16 form-item-content-input-icon"></div>
                                            </div>
                                        </div>
                                        <div v-if="showComboboxDepartment" class="form-item-content-combobox">
                                            <div
                                                v-for="department in departmentCurrent"
                                                class="combobox-item"
                                                :key="department.DepartmentId" 
                                                :class="{'combobox-item-current': department.isSelect}"
                                                v-on:click="selectItemCombobox($event, department.DepartmentId)"
                                            >
                                                <span class="combobox-item-text">{{ department.DepartmentName }}</span>
                                            </div>
                                        </div>
                                        <div v-if="!validateFormState.departmentName" class="tooltip-validate tooltip-validate-department">Vui lòng chọn một đơn vị cụ thể</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-content-body-top-row">
                            <div class="modal-content-body-top-row-wrap">
                                <div class="form-item">
                                    <div class="form-item-label">
                                        Chức danh
                                    </div>
                                    <div class="form-item-content">
                                        <input 
                                            ref="employeePosition"
                                            v-model="employeeModal.EmployeePosition"
                                            fieldName="EmployeePosition"
                                            maxlength="255"
                                            class="form-item-input"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-content-body-top-column modal-content-body-top-right">
                        <div class="modal-content-body-top-row">
                            <div class="modal-content-body-top-row-wrap">
                                <div class="form-item form-item-dateofbirth">
                                    <div class="form-item-label">
                                        Ngày sinh
                                    </div>
                                    <div class="form-item-content">
                                        <date-picker 
                                            ref="dateOfBirth"
                                            v-model="employeeModal.DateOfBirth"
                                            fieldName="DateOfBirth"
                                            type="date"
                                            valueType="YYYY-MM-DD"
                                            format="DD/MM/YYYY"
                                            placeholder="DD/MM/YYYY"
                                            :disabled-date="(date)=> date>new Date()"
                                            lang="lang"
                                        ></date-picker>
                                    </div>
                                </div>
                                <div class="form-item form-item-gender">
                                    <div class="form-item-label">
                                        Giới tính
                                    </div>
                                    <div class="form-item-content form-item-content-gender">
                                        <label class="form-item-content-gender-label">
                                            <input 
                                                name="radio"
                                                type="radio" 
                                                value=0 
                                                :checked="employeeModal.Gender==0" 
                                                @change="changeGender" 
                                            >
                                            <span class="form-item-content-gender-checkmark"></span>
                                            <span class="form-item-content-gender-text">Nam</span>
                                        </label>
                                        <label id="genderFemale" class="form-item-content-gender-label">
                                            <input 
                                                name="radio"
                                                type="radio" 
                                                value=1 
                                                :checked="employeeModal.Gender==1" 
                                                @change="changeGender" 
                                            >
                                            <span class="form-item-content-gender-checkmark"></span>
                                            <span class="form-item-content-gender-text">Nữ</span>
                                        </label>
                                        <label id="genderOther" class="form-item-content-gender-label">
                                            <input 
                                                name="radio"
                                                type="radio" 
                                                value=2 
                                                :checked="employeeModal.Gender!=0 && employeeModal.Gender!=1"  
                                                @change="changeGender" 
                                            >
                                            <span class="form-item-content-gender-checkmark"></span>
                                            <span class="form-item-content-gender-text">Khác</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-content-body-top-row">
                            <div class="modal-content-body-top-row-wrap">
                                <div class="form-item form-item-identitynumber">
                                    <div class="form-item-label">
                                        Số CMND
                                    </div>
                                    <div class="form-item-content">
                                        <input 
                                            ref="identityNumber"
                                            v-model="employeeModal.IdentityNumber"
                                            fieldName="IdentityNumber"
                                            maxlength="20"
                                            class="form-item-input"
                                        >
                                    </div>
                                </div>
                                <div class="form-item form-item-identitydate">
                                    <div class="form-item-label">
                                        Ngày cấp
                                    </div>
                                    <div class="form-item-content">
                                        <date-picker 
                                            ref="identityDate"
                                            v-model="employeeModal.IdentityDate"
                                            fieldName="IdentityDate"
                                            type="date"
                                            valueType="YYYY-MM-DD"
                                            format="DD/MM/YYYY"
                                            placeholder="DD/MM/YYYY"
                                            :disabled-date="(date)=> date>new Date()"
                                            lang="lang"
                                        ></date-picker>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-content-body-top-row">
                            <div class="modal-content-body-top-row-wrap">
                                <div class="form-item">
                                    <div class="form-item-label">
                                        Nơi cấp
                                    </div>
                                    <div class="form-item-content">
                                        <input 
                                            ref="identityPlace"
                                            v-model="employeeModal.IdentityPlace"
                                            fieldName="IdentityPlace"
                                            maxlength="255"
                                            class="form-item-input"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-content-body-bottom">
                    <div class="modal-content-body-bottom-row">
                        <div class="modal-content-body-bottom-row-wrap-long">
                            <div class="form-item">
                                <div class="form-item-label">
                                    Địa chỉ
                                </div>
                                <div class="form-item-content">
                                    <input 
                                        ref="address"
                                        v-model="employeeModal.Address"
                                        fieldName="Address"
                                        maxlength="255"
                                        class="form-item-input"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-content-body-bottom-row">
                        <div class="modal-content-body-bottom-row-wrap-short">
                            <div class="form-item">
                                <div class="form-item-label">
                                    ĐT di động
                                </div>
                                <div class="form-item-content">
                                    <input 
                                        ref="phoneNumber"
                                        v-model="employeeModal.PhoneNumber"
                                        fieldName="PhoneNumber"
                                        maxlength="20"
                                        class="form-item-input"
                                    >
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-item-label">
                                    ĐT cố định
                                </div>
                                <div class="form-item-content">
                                    <input 
                                        ref="telephoneNumber"
                                        v-model="employeeModal.TelephoneNumber"
                                        fieldName="TelephoneNumber"
                                        maxlength="20"
                                        class="form-item-input"
                                    >
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-item-label">
                                    Email
                                </div>
                                <div class="form-item-content">
                                    <input 
                                        ref="email"
                                        v-model="employeeModal.Email"
                                        fieldName="Email"
                                        maxlength="50"
                                        class="form-item-input"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-content-body-bottom-row">
                        <div class="modal-content-body-bottom-row-wrap-short">
                            <div class="form-item">
                                <div class="form-item-label">
                                    Tài khoản ngân hàng
                                </div>
                                <div class="form-item-content">
                                    <input 
                                        ref="bankAccountNumber"
                                        v-model="employeeModal.BankAccountNumber"
                                        fieldName="BankAccountNumber"
                                        maxlength="20"
                                        class="form-item-input"
                                    >
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-item-label">
                                    Tên ngân hàng
                                </div>
                                <div class="form-item-content">
                                    <input 
                                        ref="bankName"
                                        v-model="employeeModal.BankName"
                                        fieldName="BankName"
                                        maxlength="255"
                                        class="form-item-input"
                                    >
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-item-label">
                                    Chi nhánh
                                </div>
                                <div class="form-item-content">
                                    <input 
                                        ref="bankBranchName"
                                        v-model="employeeModal.BankBranchName"
                                        fieldName="BankBranchName"
                                        maxlength="255"
                                        class="form-item-input"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-content-footer">
                <div class="modal-content-footer-left">
                    <button v-on:click="cancelForm" id="btnCancel" class="btn">Hủy</button>
                </div>
                <div class="modal-content-footer-right">
                    <div class="modal-content-footer-right-wrap">
                        <button v-on:click="saveEmployee" id="btnSave" class="btn">Cất</button>
                        <button v-on:click="saveAndAddEmployee" id="btnSaveAndAdd" class="btn">Cất và Thêm</button>
                    </div>
                </div>
            </div>
        </div>      
    </div>
</template>

<style scoped>
@import "../../../css/common/modal.css";
@import "../../../css/common/combobox.css";
@import "../../../css/common/checkbox.css";
</style>

<script>
// import axios from "axios"
//import $ from 'jquery'
import { mapState } from 'vuex'
//import Datepicker from 'vuejs-datepicker';
//import {en, vi} from 'vuejs-datepicker/dist/locale'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/vi'
import {Format} from '../../../js/common/common.js'

import ENUMS from '../../../js/resource/enums'
// import { mapMutations } from 'vuex'
// import { set } from 'vue/types/umd'
// import BaseCombobox from './BaseCombobox.vue'

export default {
    name: "EmployeeDetail",
    mixins: [Format],
    components: {
        DatePicker
    },
    data() {
        return {
            //Tiếng việt cho vue2-datepicker
            lang: 'vi',

            //Trạng thái hiển thị combobox đơn vị nhân viên
            showComboboxDepartment : false,

            //Đánh dấu forcus vào ô đầu tiên khi mở form
            forcusFirstTime: false,

            ////obj thông tin nhân viên khi form vừa bật lên
            employeeFormBefore:{},
        };
    },
    computed: {
        ...mapState({
            employeeModal: state => state.employeeModal,
            departmentSelected: state => state.departmentSelected,
            departmentCurrent: state => state.departmentCurrent,
            inputDepartmentCurrent: state => state.inputDepartmentCurrent,
            popupDuplicate: state => state.popupDuplicate,
            popupValidate: state => state.popupValidate,
            validateFormState: state => state.validateFormState,
            flagSaveEmployee: state => state.flagSaveEmployee,
        }),
    },
    watch: {
        /**
         * Nếu popupDuplicate trong store thay đổi chạy hàm này
         * Author: ntthanh (20/08/2021)
         */
        "popupDuplicate": function() {
            if(this.popupDuplicate.status == false) {// Khi popup đóng chạy focus ô lỗi 
                this.$refs.employeeCode.focus();
            }
        },

        /**
         * Nếu popupValidate trong store thay đổi chạy hàm này -> focus lỗi (tìm lần lượt)
         * Author: ntthanh (20/08/2021)
         */
        "popupValidate": function() {
            if(this.validateFormState.employeeCode == false && this.popupValidate.status == false) {
                this.$refs.employeeCode.style.border = "1px solid red";//Hiện border đỏ
                this.$refs.employeeCode.focus();
            }
            else {
                if(this.validateFormState.employeeName == false && this.popupValidate.status == false) {
                    this.$refs.employeeName.focus();
                }
                else {
                    if(this.validateFormState.departmentName == false && this.popupValidate.status == false) {
                        this.$refs.departmentName.focus();
                    }
                }
            }
        },

        /**
         * Nếu flagSaveEmployee trong store thay đổi chạy hàm này
         * Author: ntthanh (20/08/2021)
         */
        "flagSaveEmployee": function() {
            if(this.flagSaveEmployee) {//Nếu cờ đánh dấu lưu bật thì thực hiện lưu
                this.saveEmployee();
            }
        }
        
    },
    mounted() {
        //Khi mở form luôn focus ô đầu tiên
        this.$refs.employeeCode.focus();

        //Khi form vừa bật lên, lưu thông tin form vào employeeFormBefore
        this.employeeFormBefore = this.buildObjectForm();
    },
    methods: {
        /**
         * Khi thay đổi radio giới tính -> cập nhật giá trị lên store
         * @param {*} event sự kiện 
         * Author: ntthanh (20/08/2021)
         */
        changeGender(event) {
            let valueGender = event.target.value;
            this.$store.commit('setGenderEmployeeModal', valueGender);
        },

        /**
         * hover input hiện thông báo validate
         * @param {*} event sự kiện 
         * Author: ntthanh (20/08/2021)
         */
        hoverInputValidate(e) {
            let tagTooltip = e.target.closest('.form-item-content').querySelector('.tooltip-validate');
            if(tagTooltip) {
                tagTooltip.style.visibility = 'visible';
            }
        },

        /**
         * rê chuột ra ẩn thông báo
         * @param {*} event sự kiện 
         * Author: ntthanh (20/08/2021)
         */
        mouseleaveInputValidate(e) {
            let tagTooltip = e.target.closest('.form-item-content').querySelector('.tooltip-validate');
            if(tagTooltip) {
                tagTooltip.style.visibility = 'hidden';
            }
        },

        /**
         * Khi blur input -> validate, xử lý chọn combobox đơn vị
         * @param {*} el thẻ blur 
         * Author: ntthanh (20/08/2021)
         */
        blurInput(el) {
            //Giá trị input
            let value = el.value;

            //Những trường bắt buộc, không được để trống
            if(el.required == true) {
                //Nếu là đơn vị (department)
                if(el.getAttribute('fieldValidate') == 'departmentName') {
                    //Đóng form
                    this.showComboboxDepartment = false;

                    //Kiểm tra xem dữ liệu hiện tại nhập vào có trùng với tên nào trong mảng departmentCurrent không
                    //Nếu có select vào item có tên đó
                    //Nếu không (do không nhập hoặc do nhập sai tên nhưng không chọn mà blur ngay) -> xóa hết ô input và báo lỗi
                    
                    //mảng department đang hiển thị 
                    let departmentCurrent =this.departmentCurrent;

                    //Cờ đánh dấu trùng tên hay không
                    let duplicateNameDepartment = false;

                    //Duyệt mảng
                    departmentCurrent.map(department => {
                        //Kiểm tra xem dữ liệu hiện tại nhập vào có trùng với tên nào trong mảng departmentCurrent không
                        if(value.trim() == department.DepartmentName.trim()) {//trùng
                            duplicateNameDepartment = true;

                            //select vào item có tên đó
                            this.$store.commit('selectItemCombobox', department.DepartmentId);

                            //Ẩn border đỏ
                            el.removeAttribute("style");

                            //Đánh dấu validate hợp lệ 
                            this.$store.commit('changeValidateFormState', {
                                fieldName: 'departmentName',
                                status: true,
                            });
                        }
                    })
                    //nếu duyệt hết mà không trùng tên (do không nhập hoặc do nhập sai tên nhưng không chọn mà blur ngay) -> xóa hết ô input và báo lỗi
                    if(!duplicateNameDepartment) {
                        this.$store.commit('changeInputDepartmentCurrent', '');

                        //Hiện border đỏ
                        el.style.border = "1px solid red";

                        //Đánh dấu validate có lỗi
                        this.$store.commit('changeValidateFormState', {
                            fieldName: 'departmentName',
                            status: false,
                        });
                    }
                }
                //2 trường còn lại
                else {
                    if(value == '') {//Nếu k có giá trị nhập vào
                        //Hiện border đỏ
                        el.style.border = "1px solid red";

                        //Đánh dấu validate có lỗi
                        this.$store.commit('changeValidateFormState', {
                            fieldName: el.getAttribute("fieldValidate"),
                            status: false,
                        });
                    }
                    else {
                        //Ẩn border đỏ
                        el.removeAttribute("style");

                        //Đánh dấu validate hợp lệ 
                        this.$store.commit('changeValidateFormState', {
                            fieldName: el.getAttribute("fieldValidate"),
                            status: true,
                        });
                    }
                }
            }

        },

        //Nếu ấn hủy đong form luôn
        async cancelForm() {
            await this.$store.commit('changeModal', false);
            await this.$store.commit('resetForm');//reset form
        },

        /**
         * Validate dữ liệu trong form 
         * return{
         *  false -> hiện thông báo lỗi
         *  true -> validate k có lỗi -> trả về obj thông tin trong form
         * } 
         * author: ntthanh(20/08/2021)
         */
        validateForm() {
            //Mảng tên các ref cần validate
            let arrayRefsValidate = [
                "employeeCode",
                "employeeName",
                "departmentName",
            ];
            //Validate dữ liệu
            for(const ref of arrayRefsValidate) {
                // this.$refs[ref].focus();
                // this.$refs[ref].blur();
                this.blurInput(this.$refs[ref]);
                if(!this.validateFormState[ref]) {
                    setTimeout(() => {
                        this.$store.commit('changePopupValidate', {
                            status: true,
                            message: this.$refs[ref].closest('.form-item-content').querySelector('.tooltip-validate').textContent,
                        });
                    })
                    return false;
                }
            }

            //Nếu duyệt hết mà không có lỗi trả về true
            return true;
        },
        
        /**
         * build thông tin trong form thành obj
         * return: obj employee 
         * author: ntthanh(20/08/2021)
         */
        buildObjectForm() {
            //Thu thap du lieu duoc nhap vao -> build thanh obj

            //Obj lưu thông tin  
            var employee = {};

            //Mảng ten các ref trừ giới tính
            var arrayRefName = [];
            for(var refName in this.$refs){
                arrayRefName.push(refName);
            }

            arrayRefName.forEach(refName => {//Duyệt qua từng ref
                //Thẻ chứa 
                var tagProperty = this.$refs[refName];
                //Tên thuộc tính 
                var propertyName;
                //Giá trị mỗi thuộc tính 
                var propertyValue;

                if(tagProperty) {
                    //Nếu là ngày tháng
                    if(refName.includes('Date') || refName.includes('date')){
                        propertyName = tagProperty.$el.getAttribute('fieldName');
                        propertyValue = tagProperty.value;
                        if(propertyValue == "" || propertyValue == undefined) propertyValue = null;
                        employee[propertyName] = propertyValue;
                    }
                    else {
                        //Còn lại 
                        propertyName = tagProperty.getAttribute('fieldName');
                        if(propertyName) {
                            propertyValue = tagProperty.value;
                            employee[propertyName] = propertyValue;
                            if(refName == 'departmentName') {//Nếu là đơn vị cần thêm id
                                propertyName = tagProperty.getAttribute('fieldId');
                                if(Object.values(this.departmentSelected).length !== 0 ) {//Nếu obj rỗng thì không thêm id
                                    propertyValue = this.departmentSelected.DepartmentId;//lấy trong store id hiện tại
                                    employee[propertyName] = propertyValue;
                                }
                            } 
                        }
                    } 
                }

            })

            //Thêm trường giới tính lấy từ store (do khi thay đổi trong form sẽ đồng bộ thay đổi trong store)
            if(this.employeeModal.Gender == '') {//Nếu trong store chưa có gì
                employee['Gender'] = 0; //Mặc định chọn 0 -> Nam
            }
            else {
                employee['Gender'] = this.employeeModal.Gender;
            }

            //Them employeeId vao obj employee neu la sua
            if(this.$store.state.formMode == ENUMS.FORM_MODE_EDIT) {
                employee['EmployeeId'] = this.employeeModal.EmployeeId;
            }

            // //Kiểm tra xem cần commit store hay biuld obj
            // if(commitEmployeeFormBefore) {
            //     this.$store.commit('setEmployeeFormBefore', employee);
            // } 
            //else {
                return employee;
            //}
        },

        /**
         * Xử lý khi ấn cất
         * author: ntthanh(20/08/2021)
         */
        saveEmployee() {
            //Goi hàm validate form
            let validateForm = this.validateForm();
            if(validateForm) {//Nếu validate thành công ms thực hiện
                let employee = this.buildObjectForm();//gọi hàm build dữ liệu thành obj
                //Thông tin form chi tiết gửi cho store để lưu dữ liệu
                let formInfor = {
                    employee: employee,
                    mode: ENUMS.FORM_SAVED,//Cất 
                }

                //Goi Server thuc hien luu du lieu
                //Trước khi gọi, kiểm tra gọi để thêm mới (Add) hay nhân bản (Add) hay sưa (Edit) 
                if(this.$store.state.formMode == ENUMS.FORM_MODE_ADD || this.$store.state.formMode == ENUMS.FORM_MODE_REPLICA) {// Neu la them moi hoặc nhân bản -> POST
                    this.$store.dispatch('addEmployee', formInfor);
                }
                
                // neu la sua -> PUT
                if(this.$store.state.formMode == ENUMS.FORM_MODE_EDIT) {// Neu la them moi -> PUT
                    this.$store.dispatch('editEmployee', formInfor);
                }
            }
        },

        /**
         * Khi ấn cất và Thêm
         * author: ntthanh(20/08/2021)
         */
        saveAndAddEmployee() {
            //Goi hàm validate form
            let validateForm = this.validateForm();
            if(validateForm) {//Nếu validate thành công ms thực hiện
                let employee = this.buildObjectForm();//gọi hàm build lữ liệu thành obj
    
                //Thông tin form chi tiết gửi cho store để lưu dữ liệu
                let formInfor = {
                    employee: employee,
                    mode: ENUMS.FORM_SAVED_ADD,//Cất và thêm 
                }
    
                //Goi Server thuc hien luu du lieu
                //Trước khi gọi, kiểm tra gọi để thêm mới (Add) hay nhân bản (Add) hay sưa (Edit) 
                if(this.$store.state.formMode == ENUMS.FORM_MODE_ADD || this.$store.state.formMode == ENUMS.FORM_MODE_REPLICA) {// Neu la them moi hoặc nhân bản -> POST
                    this.$store.dispatch('addEmployee', formInfor);
                }
                
                // neu la sua -> PUT
                if(this.$store.state.formMode == ENUMS.FORM_MODE_EDIT) {// Neu la them moi -> PUT
                    this.$store.dispatch('editEmployee', formInfor);
                }
            }
        },

        /**
         * Xử lý khi ấn để hiển combobox
         * author: ntthanh(20/08/2021)
         */
        handleShowComboboxDepartment() {
            this.showComboboxDepartment = !this.showComboboxDepartment;
        },
        
        /**
         * khi chọn 1 item combobox 
         * @param {$event} e  bắt sự kiên 
         * @param {string} id khóa chính
         * author: ntthanh(20/08/2021)
         */
        selectItemCombobox(e,departmentId) {
            //ẩn combobox
            this.showComboboxDepartment = false;
            //Thay doi item select trong store
            this.$store.commit('selectItemCombobox', departmentId);
            //Gán giá trị input là giá trị vừa chọn

            //Ẩn border đỏ
            e.target.closest('.form-item-content').querySelector('.form-item-input').removeAttribute("style");

            //Đánh dấu validate hợp lệ 
            this.$store.commit('changeValidateFormState', {
                fieldName: 'departmentName',
                status: true,
            });
        },

        //Khi forcus input đơn vị
        focusInput() {
            this.showComboboxDepartment = true;
        },

        /**
         * Xử lý khi nhập combobox
         * @param {*} e sự kiện 
         * author: ntthanh(20/08/2021)
         */
        async handleCombobox(e) {
            let me = this;
            //Mở form
            me.showComboboxDepartment = true;

            //Giá trị nhập hiện tại trong form 
            let valueInput = e.target.value;
            //Gán giá trị đó cho inputDepartmentCurrent để cập nhật lên màn hình
            this.$store.commit('changeInputDepartmentCurrent', valueInput);
            
            //Mảng tất cả giá trị đơn vị (department) lưu trong store department 
            let departments = this.$store.state.department;

            //Trước khi lọc cần xóa hết các phần tử hiện tại trong store departmentCurrent để thêm từ đầu
            await me.$store.commit('emptyDepartmentCurrent');

            //Duyệt qua tất cả phần tử trong mảng trên, lấy tên đơn vị so sánh với giá trị hiện tại đang nhập
            //Nếu trùng thì cho phần tử đó vào mảng các obj đơn vị đang hiển thị trong store departmentCurrent để hiển thị lên
            await departments.map(department => {
                //Tên đơn vị đang được duyệt qua
                let departmentName = department.DepartmentName;

                //So sánh: true -> trùng, false -> không trùng
                if(me.removeVietnameseTones(departmentName).toLowerCase().includes(me.removeVietnameseTones(valueInput).toLowerCase())) {
                    //Nếu trùng -> cho phần tử đó vào mảng các obj đơn vị đang hiển thị trong store departmentCurrent để hiển thị lên
                    this.$store.commit('addDepartmentCurrent', department);
                } 
            });

        },

        /**
         * Xử lý bàn phím combobox đơn vị
         * Xử lý khi nhập combobox
         * @param {*} e sự kiện 
         * author: ntthanh(20/08/2021)
         */
        keyboardInput(e) {

            //Mảng các giá trị đơn vị (department) hiển thị hiện tại 
            let departmentCurrent = this.$store.state.departmentCurrent;

            //Obj đơn vị đang được chọn
           let departmentSelected = this.$store.state.departmentSelected;

            //Nhấn mũi tên xuống
            if(e.keyCode == 40){
                //Kiểm tra xem trong mảng departmentCurrent có department đang chọn không 
                //Nếu có thì lấy phần tử tiếp theo, nếu đó là cuối cùng thì lấy tử đầu
                //Nếu không có lấy phần tử đầu tiên 

                //biến đánh dấu xem trong mảng departmentCurrent có department đang chọn không 
                let haveDepartmentSelected = false;//mạc định là không

                //Duyệt mảng departmentCurrent
                departmentCurrent.map((department, index) => {
                    //Nếu có phần tử đang được chọn
                    if(department.DepartmentId == departmentSelected.DepartmentId) {
                        haveDepartmentSelected = true;//Gán là có phần tử đang chọn trong mảng
                        //nếu là phần tử cuối cùng -> chọn phần tử đầu tiên
                        if(index == departmentCurrent.length-1) {
                            this.$store.commit('selectItemCombobox', departmentCurrent[0].DepartmentId); 
                            return;
                        }
                        //Nếu không chọn phần tử tiếp theo
                        else {
                            this.$store.commit('selectItemCombobox', departmentCurrent[index+1].DepartmentId);
                            return;
                        }
                    }
                })
                //Nếu duyệt hết mà không có phần tử đang chọn -> chọn phần tử đâu tiên
                if(!haveDepartmentSelected) {
                    this.$store.commit('selectItemCombobox', departmentCurrent[0].DepartmentId);
                    return;
                }
            }
            //Nhấn mũi tên lên 
            if(e.keyCode == 38) {
                //Kiểm tra xem trong mảng departmentCurrent có department đang chọn không 
                //Nếu có thì lấy phần tử trước đó, nếu đó là đầu tiên thì lấy phần tử cuối
                //Nếu không có thì không làm gì 

                //Duyệt mảng departmentCurrent
                departmentCurrent.map((department, index) => {
                    //Nếu có phần tử đang được chọn
                    if(department.DepartmentId == departmentSelected.DepartmentId) {
                        //nếu đó là đầu tiên thì lấy phần tử cuối
                        if(index == 0) {
                            this.$store.commit('selectItemCombobox', departmentCurrent[departmentCurrent.length-1].DepartmentId); 
                            return;
                        }
                        //Nếu không chọn phần tử liền trước
                        else {
                            this.$store.commit('selectItemCombobox', departmentCurrent[index-1].DepartmentId);
                            return;
                        }
                    }
                })
                //Nếu duyệt hết mà không có phần tử đang chọn -> không làm gì
            }
            //Nhấn enter 
            if(e.keyCode == 13) {
                //Đóng mở form
                this.showComboboxDepartment = !this.showComboboxDepartment;
            }
            
        },

        /**
         * Xử lý khi nhấn nút x trong form
         * author: ntthanh(20/08/2021)
         */
        handleCancelForm() {
            //Kiểm tra xem form có thay đổi không 
            //Nếu không thay đổi -> đóng form luôn
            //So sánh bằng data hiện tại trên form và data khi form vừa mở lên 
            if(JSON.stringify(this.buildObjectForm()) == JSON.stringify(this.employeeFormBefore)) {
                this.$store.commit('changeModal', false);
                //reset form 
                this.$store.commit('resetForm');//reset form
            }
            //Nếu có thay đổi -> hiện thông báo
            else {
                this.$store.commit('changePopupCancel', {
                    status: true,
                    message: 'Dữ liệu đã bị thay đổi. Bạn có muốn cất không?',
                });
            }
        },


        /**
		 * Chuyen tieng viet co dau thanh khong dau
		 * @param {string} str chuoi can chuyen
         * author: ntthanh(20/08/2021)
		 * @returns string - chuỗi đã chuyển
		 */
		removeVietnameseTones(str) {
			str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
			str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
			str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
			str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
			str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
			str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
			str = str.replace(/đ/g,"d");
			str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
			str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
			str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
			str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
			str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
			str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
			str = str.replace(/Đ/g, "D");
			// Some system encode vietnamese combining accent as individual utf-8 characters
			// Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
			str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
			str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
			// Remove extra spaces
			// Bỏ các khoảng trắng liền nhau
			str = str.replace(/ + /g," ");
			str = str.trim();
			// Remove punctuations
			// Bỏ dấu câu, kí tự đặc biệt
			str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\?|\/|,|\.|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
			return str;
		}
    },
};
</script>