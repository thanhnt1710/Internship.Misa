<template>
    <div v-if="displayModal" v-on:mouseover="handleModal" class="modal"> 
        <div class="modal-overlay">

        </div>
        <div class="modal-content">
            <div class="modal-content-header">
                <div v-on:click="hiddenModal" id="iconCancel" class="modal-content-header-cancel">
                    <i class="fas fa-times"></i>
                </div>
                <div class="modal-content-header-title">Thông tin nhân viên</div>
            </div>
            <div class="modal-content-body">
                <div class="left">
                    <div class="left-avatar">
                        <img src="../../assets/Resource/img/default-avatar.jpg" alt="" class="left-avatar-img">
                        <span>(Vui lòng chọn ảnh có định dạng .jpg, .jpeg, .png, .gif)</span>
                    </div>
                </div>
                <div class="right">
                    <div class="right-block right-informationgeneral">
                        <div class="right-block-title">
                            A. THÔNG TIN CHUNG
                            <div class="right-block-title-underline"></div>
                        </div>
                        <div class="right-block-detail">
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">
                                    Mã nhân viên
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right-block-detail-item-content">
                                    <input v-model="EmployeeCode" id="employeeCode" fieldName="EmployeeCode" name="label" type="text" class="right-block-detail-item-content--text" readonly required>
                                </div>
                                <div class="right-block-detail-item-auto">
                                    Trường này được thêm tự động
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">
                                    Họ và tên
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right-block-detail-item-content">
                                    <input ref="validate" v-model="employeeModal.FullName" id="fullName" fieldName="FullName" type="text" class="right-block-detail-item-content--text auto_focus" required>
                                </div>
                                <div class="right-block-detail-item-empty">
                                    Trường này không được để trống
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">Ngày sinh</label>
                                <div class="right-block-detail-item-content">
                                    <input v-model="employeeModal.DateOfBirth" id="dateOfBirth" fieldName="DateOfBirth" name="label" type="date" class="right-block-detail-item-content--date">
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">Giới tính</label>
                                <div v-on:mouseleave="hiddenCombobox" class="combobox combobox-form">
                                    <button v-on:click="clickCombobox" class="combobox-top right-block-detail-item-dropdown_btn">
                                        <input 
                                            v-model="this.genderSelected.GenderName" 
                                            id="gender" 
                                            fieldName="Gender" 
                                            fieldId="Gender"
                                            v-bind:valueId="this.genderSelected.GenderId"
                                        >
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="combobox-content right-block-detail-item-dropdown_content">
                                        <div v-for="gender in this.genders" 
                                            v-bind:key="gender.GenderId" 
                                            v-bind:valueId="gender.GenderId"
                                            v-bind:class="{'combobox-content-current': gender.isSelect}"
                                            v-on:click="selectItemCombobox($event, 'gender', gender.GenderId)"
                                        >
                                            <i class="fas fa-check"></i>
                                            <span>{{ gender.GenderName }}</span>
                                        </div>
                                        <!-- <div valueId="1" class="combobox-content-current">
                                            <i class="fas fa-check"></i>
                                            <span>Nam</span>
                                        </div>
                                        <div valueId="0">
                                            <i class="fas fa-check"></i>
                                            <span>Nữ</span>
                                        </div>
                                        <div valueId="2">
                                            <i class="fas fa-check"></i>
                                            <span>Khác</span>
                                        </div> -->
                                    </div>
                                </div>
                                <!-- <BaseCombobox/> -->
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">
                                    Số CMTND/Căn cước
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right-block-detail-item-content">
                                    <input v-model="employeeModal.IdentityNumber" id="identityNumber" fieldName="IdentityNumber" type="text" class="right-block-detail-item-content--text text_only_number" required>
                                </div>
                                <div class="right-block-detail-item-error">
                                    Số căn cước không hợp lệ
                                </div>
                                <div class="right-block-detail-item-empty">
                                    Trường này không được để trống
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">Ngày cấp</label>
                                <div class="right-block-detail-item-content">
                                    <input v-model="employeeModal.IdentityDate" id="identityDate" fieldName="IdentityDate" name="label" type="date" class="right-block-detail-item-content--date">
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">Nơi cấp</label>
                                <div class="right-block-detail-item-content">
                                    <input v-model="employeeModal.IdentityPlace" id="identityPlace" fieldName="IdentityPlace" type="text" class="right-block-detail-item-content--text">
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <!-- <label for="label" class="right-block-detail-item-label">
                                    Email
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right-block-detail-item-content">
                                    <input type="text" class="right-block-detail-item-content--text">
                                </div> -->
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">
                                    Email
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right-block-detail-item-content">
                                    <input v-model="employeeModal.Email" id="email" fieldName="Email" type="email" placeholder="example@donmain.com" class="right-block-detail-item-content--text" required>
                                </div>
                                <div class="right-block-detail-item-error">
                                    Email không hợp lệ
                                </div>
                                <div class="right-block-detail-item-empty">
                                    Trường này không được để trống
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">
                                    Số điện thoại
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right-block-detail-item-content">
                                    <input v-model="employeeModal.PhoneNumber" id="phoneNumber" fieldName="PhoneNumber" type="text" class="right-block-detail-item-content--text text_only_number" required>
                                </div>
                                <div class="right-block-detail-item-error">
                                    Số điện thoại không hợp lệ
                                </div>
                                <div class="right-block-detail-item-empty">
                                    Trường này không được để trống
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right-block right-informationjob">
                        <div class="right-block-title">
                            B. THÔNG TIN CÔNG VIỆC  
                            <div class="right-block-title-underline"></div>
                        </div>
                        <div class="right-block-detail">
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">Vị trí</label>
                                <div v-on:mouseleave="hiddenCombobox" class="combobox combobox-form">
                                    <button v-on:click="clickCombobox" class="combobox-top right-block-detail-item-dropdown_btn">
                                        <input 
                                            v-model="this.positionSelected.PositionName"
                                            id="positionName" 
                                            fieldName="PositionName" 
                                            fieldId="PositionId" 
                                            v-bind:valueId="this.positionSelected.PositionId"
                                        >
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="position combobox-content right-block-detail-item-dropdown_content">
                                        <div v-for="position in this.positions" 
                                            v-bind:key="position.PositionId" 
                                            v-bind:valueId="position.PositionId"
                                            v-bind:class="{'combobox-content-current': position.isSelect}"
                                            v-on:click="selectItemCombobox($event, 'position', position.PositionId)"
                                        >
                                            <i class="fas fa-check"></i>
                                            <span>{{ position.PositionName }}</span>
                                        </div>
                                        <!-- <div valueId="" class="combobox-content-current">
                                            <i class="fas fa-check"></i>
                                            <span></span>
                                        </div>
                                        <div valueId="">
                                            <i class="fas fa-check"></i>
                                            <span></span>
                                        </div>
                                        <div valueId="">
                                            <i class="fas fa-check"></i>
                                            <span></span>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">Phòng ban</label>
                                <div v-on:mouseleave="hiddenCombobox" class="combobox combobox-form">
                                    <button v-on:click="clickCombobox"
                                        class="combobox-top right-block-detail-item-dropdown_btn">
                                        <input 
                                            v-model="this.departmentSelected.DepartmentName"
                                            id="departmentName" 
                                            fieldName="DepartmentName" 
                                            fieldId="DepartmentId" 
                                            v-bind:valueId="this.departmentSelected.DepartmentId"
                                        >
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="department combobox-content right-block-detail-item-dropdown_content"
                                    >
                                        <div v-for="department in this.departments" 
                                            v-bind:key="department.DepartmentId" 
                                            v-bind:valueId="department.DepartmentId"
                                            v-bind:class="{'combobox-content-current': department.isSelect}"
                                            v-on:click="selectItemCombobox($event, 'department', department.DepartmentId)"
                                        >
                                            <i class="fas fa-check"></i>
                                            <span>{{ department.DepartmentName }}</span>
                                        </div>
                                        <!-- <div valueId="" class="combobox-content-current">
                                            <i class="fas fa-check"></i>
                                            <span></span>
                                        </div>
                                        <div valueId="">
                                            <i class="fas fa-check"></i>
                                            <span></span>
                                        </div>
                                        <div valueId="">
                                            <i class="fas fa-check"></i>
                                            <span></span>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">Mã số thuế cá nhân</label>
                                <div class="right-block-detail-item-content">
                                    <input v-model="employeeModal.PersonalTaxCode" id="personalTaxCode" fieldName="PersonalTaxCode" type="text" value="" class="right-block-detail-item-content--text text_only_number">
                                </div>
                                <div class="right-block-detail-item-error">
                                    Mã số thuế không hợp lệ
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">Mức lương cơ bản</label>
                                <div class="right-block-detail-item-content">
                                    <input 
                                        v-model="employeeModal.Salary" 
                                        style="text-align: right; padding-right: 40px;"
                                        id="salary" fieldName="Salary" 
                                        pattern="/^-?\d+\.?\d*$/" 
                                        onKeyPress="if(this.value.length==20) return false;" 
                                        type="number" 
                                        class="right-block-detail-item-content--text"
                                    >
                                </div>
                                <div class="right-block-detail-item-content--salary">(vnđ)</div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">Ngày gia nhập công ty</label>
                                <div class="right-block-detail-item-content">
                                    <input v-model="employeeModal.JoinDate" id="joinDate" fieldName="JoinDate" name="label" type="date" class="right-block-detail-item-content--date">
                                </div>
                            </div>
                            <div class="right-block-detail-item">
                                <label for="label" class="right-block-detail-item-label">Tình trạng công việc</label>
                                <div v-on:mouseleave="hiddenCombobox" class="combobox combobox-form">
                                    <button v-on:click="clickCombobox" class="combobox-top right-block-detail-item-dropdown_btn">
                                        <input 
                                            v-model="this.workStatusSelected.WorkStatusName" 
                                            id="workStatus" 
                                            fieldName="WorkStatus" 
                                            fieldId="WorkStatus"
                                            v-bind:valueId="this.workStatusSelected.WorkStatusId">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="combobox-content right-block-detail-item-dropdown_content">
                                        <div v-for="work in this.workStatus" 
                                            v-bind:key="work.WorkStatusId" 
                                            v-bind:valueId="work.WorkStatusId"
                                            v-bind:class="{'combobox-content-current': work.isSelect}"
                                            v-on:click="selectItemCombobox($event, 'workStatus', work.WorkStatusId)"
                                        >
                                            <i class="fas fa-check"></i>
                                            <span>{{ work.WorkStatusName }}</span>
                                        </div>
                                        <!-- <div valueId="0" class="combobox-content-current">
                                            <i class="fas fa-check"></i>
                                            <span>Đang làm việc</span>
                                        </div>
                                        <div valueId="1">
                                            <i class="fas fa-check"></i>
                                            <span>Đã nghỉ</span>
                                        </div>
                                        <div valueId="2">
                                            <i class="fas fa-check"></i>
                                            <span>Khác</span>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button v-on:click="hiddenModal" id="btnCancel" class="modal-footer-cancel modal-footer-btn">Hủy</button>
                <button v-on:click="saveEmployee" id="btnSave" class="modal-footer-save modal-footer-btn">
                    <i class="far fa-save"></i>
                    Lưu
                </button>
            </div>
        </div>      
    </div>
</template>

<style scoped>
@import "../../css/common/modal.css";
@import "../../css/common/combobox.css";
</style>

<script>
// import axios from "axios"
import $ from 'jquery'
import { mapState } from 'vuex'
// import { mapMutations } from 'vuex'
// import { set } from 'vue/types/umd'
// import BaseCombobox from './BaseCombobox.vue'

export default {
    name: "TheModal",
    // components: {
    //     BaseCombobox,
    // },
    data() {
        return {
            
        };
    },
    created() {
        
    },
    computed: {
        ...mapState({
            employeeModal: state => state.employeeModal,
            EmployeeCode: state => state.employeeCode,
            displayModal: state => state.displayModal,
            departments: state => state.department,
            positions: state => state.position,
            genders: state => state.gender,
            workStatus: state => state.workStatus,
            departmentSelected: state => state.departmentSelected,
            positionSelected: state => state.positionSelected,
            genderSelected: state => state.genderSelected,
            workStatusSelected: state => state.workStatusSelected,
        }),

    },
    updated() {
    },
    methods: {
        hiddenModal() {
            this.$store.commit('addPopUp', { 
                title: "Thông báo",
                message1: "Bạn có chắc muốn tắt hộp thoại không?",
                message2: "Mọi dữ liệu vừa nhập sẽ bị xóa!", 
                content_btn1: "Tiết tục nhập", 
                content_btn2: "Đóng", 
                color: "red",
                flag: "flagHiddenModal",
            });
        },
        // Validate khi blur
        handleModal: function() {
            //An thong bao khiu blur truong Ma nhan vien
            $("input[readonly]").blur(function () {
                $(this)
                .parent()
                .siblings(".right-block-detail-item-auto")
                .css("display", "none");
            })

            $("input[readonly]").click(function () {
                $(this)
                .parent()
                .siblings(".right-block-detail-item-auto")
                .css("display", "block");
            })

            //Validate (Kiem tra tung truong sau khi blur)
            /**
             * Kiem tra ca truong khong duoc de trong (input[required])
             * Author: ntthanh (8/7/2021)
             */
            $("input[required]").blur(function () {
                var value = $(this).val();
                if (!value) {
                    $(this).css("border", "1px solid red");
                    $(this)
                    .parent()
                    .siblings(".right-block-detail-item-empty")
                    .css("display", "block");
                    $(this).attr("validate", false);
                } else {
                    $(this).removeAttr("style");
                    $(this)
                    .parent()
                    .siblings(".right-block-detail-item-empty")
                    .css("display", "none");
                    $(this).attr("validate", true);
                }
            });

            /**
             * Kiem tra cac truong phai la so nhu so dien thoai, so CCCD,...
             * Author: ntthanh (8/7/2021)
             */
            $("input.text_only_number").blur(function () {
                var value = $(this).val();
                if (!$.isNumeric(value)) {
                    $(this).css("border", "1px solid red");
                    $(this)
                    .parent()
                    .siblings(".right-block-detail-item-error")
                    .css("display", "block");
                } else {
                    $(this).removeAttr("style");
                    $(this)
                    .parent()
                    .siblings(".right-block-detail-item-error")
                    .css("display", "none");
                }
            });

            /**
             * Kiem tra Email dung dinh dang
             * Author: ntthanh (8/7/2021)
             */
            $('input[type="email"]').blur(function () {
                var email = $(this).val();
                var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regex.test(String(email).toLowerCase())) {
                    $(this).css("border", "1px solid red");
                    $(this)
                    .parent()
                    .siblings(".right-block-detail-item-error")
                    .css("display", "block");
                    $(this).attr("validate", false);
                } else {
                    $(this).removeAttr("style");
                    $(this)
                    .parent()
                    .siblings(".right-block-detail-item-error")
                    .css("display", "none");
                    $(this).attr("validate", true);
                }
            });

            //Khi focus vao the input[readonly] ma nhan vien -> hien cac thong bao
            $("input[readonly]").click(function () {
                $(this)
                .parent()
                .siblings(".right-block-detail-item-auto")
                .css("display", "block");
            });

            //Khi focus vao the input[required] -> an di cac thong bao
            $("input[required]").click(function () {
                $(this)
                    .parent()
                    .siblings(".right-block-detail-item-empty")
                    .css("display", "none");
                $(this)
                    .parent()
                    .siblings(".right-block-detail-item-error")
                    .css("display", "none");
            });

            //Khi focus vao input.text_only_number -> an di cac thong bao
            $("input.text_only_number").click(function () {
                $(this)
                    .parent()
                    .siblings(".right-block-detail-item-empty")
                    .css("display", "none");
                $(this)
                    .parent()
                    .siblings(".right-block-detail-item-error")
                    .css("display", "none");
            });
        },

        //Khi an luu du lieu
        saveEmployee() {
            //Validate du lieu
            var inputValidate = $('input[required], input[type="email"]');
            $.each(inputValidate, function (index, input) {
                $(input).trigger("blur");
            });
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                this.$store.commit('addToastTop', {
                    title: `Thông báo`,
                    message1: `Dữ liệu không hợp lệ!`,
                    message2: `Vui lòng kiểm tra lại`,
                    message3: ``,
                });
                return;
            }

            //Thu thap du lieu duoc nhap vao -> build thanh obj
            //Lay tât ca cac truong nhap lieu
            var fieldInput = $(".modal input[fieldName]");
            var fieldInputId = $(".modal input[valueId]");
            var employee = {};
            $.each(fieldInput, function () {
                var propertyName = $(this).attr("fieldName");
                var value = $(this).val();
                employee[propertyName] = value;
            });
            //Them id cac truong can id (vi tri, phong ban, gioi tinh)
            $.each(fieldInputId, function() {
                var propertyName = $(this).attr("fieldId");
                var value = $(this).attr('valueId');
                if(!isNaN(value)) {
                    employee[propertyName] = parseInt(value);
                }
                else {
                    employee[propertyName] = value;
                }
            });

            //Them employeeId vao obj employee neu la sua
            if(this.$store.state.formMode == 'edit') {
                employee['EmployeeId'] = this.employeeModal.EmployeeId;
                
            }

            //Goi Server thuc hien luu du lieu
            //Trước khi gọi, kiểm tra gọi để thêm mới (Add) hay sưa (Edit)
            if(this.$store.state.formMode == 'add') {// Neu la them moi -> POST
                this.$store.dispatch('addEmployee', employee);
            }
            
            // neu la sua -> PUT
            if(this.$store.state.formMode == 'edit') {// Neu la them moi -> PUT
                this.$store.dispatch('editEmployee', employee);
            }
        },

        //click hien Combobox
        clickCombobox(e) {
        let combobox = e.target.closest('.combobox');
        //Hien thi combobox
        combobox.querySelector('.combobox-content').style.display = 'block';
        //Hien Border 
        combobox.style.border = '1px solid var(--default-color)';
        },

        //An combobox
        hiddenCombobox(e) {
        let comboboxContent = e.target.querySelector('.combobox-content');
        //An Border 
        comboboxContent.closest('.combobox').style.border = 'var(--border)';
        // An combobox
        comboboxContent.style.display = 'none';
        },
        
        //Khi chon item combobox
        selectItemCombobox(e, key, id) {
            e.target.closest('.combobox-content').style.display = 'none';
            //obj luu thong tin thay doi store
            let inforItem = {
                key: key,// position, department, workStatus, gender
                id: id,
            }
            //Thay doi item select trong store
            this.$store.commit('selectItemCombobox', inforItem);
            
        }
    },
};
</script>