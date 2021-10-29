<template>
    <div class="navbar grid-column-2">
        <div class="navbar-header">
            <a href="" class="navbar-header-link">
                <img src="../../assets/Resource/img/toggle.png" alt="" class="navbar-header-link-img">
            </a>
            <div class="narbar-header-logo">
                <a href="" class="narbar-header-logo-link">
                    <img src="../../assets/Resource/cukcuk-logo.png" alt="" class="narbar-header-logo-img">
                </a>
            </div>
        </div>
        <div class="navbar-content">
            <ul class="navbar-list">
                <li class="navbar-list-item">
                    <div class="navbar-list-item-icon">
                        <img src="../../assets/Resource/icon/document-online.png" alt="" class="">
                    </div>
                    <a href="" class="navbar-list-item-link">Tổng quan</a>
                </li>
                <li class="navbar-list-item">
                    <div class="navbar-list-item-icon">
                        <img src="../../assets/Resource/icon/report.png" alt="" class="">
                    </div>
                    <a href="" class="navbar-list-item-link">Báo cáo</a>
                </li>
                <li class="navbar-list-item">
                    <div class="navbar-list-item-icon">
                        <img src="../../assets/Resource/icon/dashboard.png" alt="" class="">
                    </div>
                    <a href="" class="navbar-list-item-link">Mua hàng</a>
                </li>
                <li class="navbar-list-item navbar-list-item-current">
                    <div class="navbar-list-item-icon">
                        <img src="../../assets/Resource/icon/dic-employee.png" alt="" class="">
                    </div>
                    <a href="" class="navbar-list-item-link">Danh mục nhân viên</a>
                </li>
                <li class="navbar-list-item">
                    <div class="navbar-list-item-icon">
                        <img src="../../assets/Resource/icon/dic-employee.png" alt="" class="">
                    </div>
                    <a href="" class="navbar-list-item-link">Danh mục khách hàng</a>
                </li>
                <li class="navbar-list-item">
                    <div class="navbar-list-item-icon">
                        <img src="../../assets/Resource/icon/setting.png" alt="" class="">
                    </div>
                    <a href="" class="navbar-list-item-link">Thiết lập hệ thống</a>
                </li>
            </ul>
        </div>
        <div class="navbar-btn">
            <i class="navbar-btn-moveleft fas fa-chevron-left"></i>
            <i class="navbar-btn-moveright fas fa-chevron-right"></i>
        </div>
    </div>
</template>

<style scoped>
    @import '../../css/common/navbar.css';
</style>

<script>
    export default {
        name:"TheNavbar"
    }
</script>
