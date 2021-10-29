<template>
    <div v-on:click="handleAddEmployee" class="modal"> 
        <div class="modal__overlay">

        </div>
        <div class="modal__content">
            <div class="modal__content-header">
                <div id="iconCancel" class="modal__content-header__cancel">
                    <i class="fas fa-times"></i>
                </div>
                <div class="modal__content-header__title">Thông tin nhân viên</div>
            </div>
            <div class="modal__content-body">
                <div class="left">
                    <div class="left__avatar">
                        <img src="../../assets/Resource/img/default-avatar.jpg" alt="" class="left__avatar-img">
                        <span>(Vui lòng chọn ảnh có định dạng .jpg, .jpeg, .png, .gif)</span>
                    </div>
                </div>
                <div class="right">
                    <div class="right__block right__informationgeneral">
                        <div class="right__block-title">
                            A. THÔNG TIN CHUNG
                            <div class="right__block-title-underline"></div>
                        </div>
                        <div class="right__block-detail">
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">
                                    Mã nhân viên
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right__block-detail-item__content">
                                    <input id="employeeCode" fieldName="EmployeeCode" name="label" type="text" class="right__block-detail-item__content--text" readonly required>
                                </div>
                                <div class="right__block-detail-item__auto">
                                    Trường này được thêm tự động
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">
                                    Họ và tên
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right__block-detail-item__content">
                                    <input id="fullName" fieldName="FullName" type="text" class="right__block-detail-item__content--text auto_focus" required>
                                </div>
                                <div class="right__block-detail-item__empty">
                                    Trường này không được để trống
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">Ngày sinh</label>
                                <div class="right__block-detail-item__content">
                                    <input id="dateOfBirth" fieldName="DateOfBirth" name="label" type="date" class="right__block-detail-item__content--date">
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">Giới tính</label>
                                <div class="combobox combobox-form">
                                    <button class="combobox__top right__block-detail-item__dropdown_btn">
                                        <input id="gender" fieldName="Gender" valueId="1">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="combobox__content right__block-detail-item__dropdown_content">
                                        <div valueId="1" class="combobox__content__current">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">
                                    Số CMTND/Căn cước
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right__block-detail-item__content">
                                    <input id="identityNumber" fieldName="IdentityNumber" type="text" class="right__block-detail-item__content--text text_only_number" required>
                                </div>
                                <div class="right__block-detail-item__error">
                                    Số căn cước không hợp lệ
                                </div>
                                <div class="right__block-detail-item__empty">
                                    Trường này không được để trống
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">Ngày cấp</label>
                                <div class="right__block-detail-item__content">
                                    <input id="identityDate" fieldName="IdentityDate" name="label" type="date" class="right__block-detail-item__content--date">
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">Nơi cấp</label>
                                <div class="right__block-detail-item__content">
                                    <input id="identityPlace" fieldName="IdentityPlace" type="text" class="right__block-detail-item__content--text">
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <!-- <label for="label" class="right__block-detail-item__label">
                                    Email
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right__block-detail-item__content">
                                    <input type="text" class="right__block-detail-item__content--text">
                                </div> -->
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">
                                    Email
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right__block-detail-item__content">
                                    <input id="email" fieldName="Email" type="email" placeholder="example@donmain.com" class="right__block-detail-item__content--text" required>
                                </div>
                                <div class="right__block-detail-item__error">
                                    Email không hợp lệ
                                </div>
                                <div class="right__block-detail-item__empty">
                                    Trường này không được để trống
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">
                                    Số điện thoại
                                    <span>(</span>
                                    <span class="required">*</span>
                                    <span>)</span>
                                </label>
                                <div class="right__block-detail-item__content">
                                    <input id="phoneNumber" fieldName="PhoneNumber" type="text" class="right__block-detail-item__content--text text_only_number" required>
                                </div>
                                <div class="right__block-detail-item__error">
                                    Số điện thoại không hợp lệ
                                </div>
                                <div class="right__block-detail-item__empty">
                                    Trường này không được để trống
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right__block right__informationjob">
                        <div class="right__block-title">
                            B. THÔNG TIN CÔNG VIỆC  
                            <div class="right__block-title-underline"></div>
                        </div>
                        <div class="right__block-detail">
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">Vị trí</label>
                                <div class="combobox combobox-form">
                                    <button class="combobox__top right__block-detail-item__dropdown_btn">
                                        <input class="positionName" fieldName="positionName" fieldId="PositionId" valueId="">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="position combobox__content right__block-detail-item__dropdown_content">
                                        <div valueId="" class="combobox__content__current">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">Phòng ban</label>
                                <div class="combobox combobox-form">
                                    <button class="combobox__top right__block-detail-item__dropdown_btn">
                                        <input class="departmentName" fieldName="DepartmentName" fieldId="DepartmentId" valueId="">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="department combobox__content right__block-detail-item__dropdown_content">
                                        <div valueId="" class="combobox__content__current">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">Mã số thuế cá nhân</label>
                                <div class="right__block-detail-item__content">
                                    <input id="personalTaxCode" fieldName="PersonalTaxCode" type="text" value="" class="right__block-detail-item__content--text text_only_number">
                                </div>
                                <div class="right__block-detail-item__error">
                                    Mã số thuế không hợp lệ
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">Mức lương cơ bản</label>
                                <div class="right__block-detail-item__content">
                                    <input id="salary" fieldName="Salary" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==20) return false;" type="number" class="right__block-detail-item__content--text">
                                </div>
                                <div class="right__block-detail-item__content--salary">(vnđ)</div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">Ngày gia nhập công ty</label>
                                <div class="right__block-detail-item__content">
                                    <input id="joinDate" fieldName="JoinDate" name="label" type="date" class="right__block-detail-item__content--date">
                                </div>
                            </div>
                            <div class="right__block-detail-item">
                                <label for="label" class="right__block-detail-item__label">Tình trạng công việc</label>
                                <div class="combobox combobox-form">
                                    <button class="combobox__top right__block-detail-item__dropdown_btn">
                                        <input id="workStatus" fieldName="WorkStatus" valueId="0">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="combobox__content right__block-detail-item__dropdown_content">
                                        <div valueId="0" class="combobox__content__current">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal__footer">
                <button id="btnCancel" class="modal__footer__cancel modal__footer-btn">Hủy</button>
                <button id="btnSave" class="modal__footer__save modal__footer-btn">
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
export default {
  name: "TheModal",
  data() {
    return {
      employeeCode: "",
      fullName: "",
      dateOfBirth: "",
      gender: "",
      identityNumber: "",
      identityDate: "",
      identityPlace: "",
      email: "",
      phoneNumber: "",
      positionName: "",
      departmentName: "",
      personalTaxCode: "",
      salary: "",
      joinDate: "",
      workStatus: "",
    };
  },
  computed: {
    displayModal() {
      return this.$store.getters.DISPLAY_MODAL;
    },
  },
  methods: {
    handleAddEmployee() {
      this.$store.commit("HIDDEN_MODAL");
      // this.$store.commit("getEmployeeCode");
    },
  },
};
</script>