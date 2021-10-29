<template>
    <div class="combobox" v-bind:class="comboboxInfor.classCombobox">
        <button class="combobox__top" v-bind:class="comboboxInfor.classBtn">
            <input v-model="employeeModal.Gender" id="gender" fieldName="Gender" valueId="1">
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
</template>

<script>
export default {
    name: "BaseCombobox",
    props: {
        // data: Array,
        comboboxInfor: Object,
    },
}
</script>

<style scoped>
/* @import "../../css/common/combobox.css";
@import "../../css/common/modal.css";
@import "../../css/page/employee.css"; */
</style>