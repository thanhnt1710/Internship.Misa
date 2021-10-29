<template>
    <div class="navbar grid-column-left">
        <div class="navbar-header">
            <a href="" class="svg-img svg-img-24 navbar-header-link"></a>
            <div class="narbar-header-logo">
                <router-link to="/" class="narbar-header-logo-link">
                    <img src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg" class="narbar-header-logo-img">
                </router-link>
            </div>
        </div>
        <div class="navbar-content">
            <ul class="navbar-list">
                <li class="navbar-list-item">
                    <router-link to="/overview" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -30px -1629px;" alt=""></div>
                        <span>Tổng quan</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/cash" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -74px -1629px;" alt=""></div>
                        <span>Tiền mặt</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/deposit" href="" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -118px -1629px;" alt=""></div>
                        <span>Tiền gửi</span>
                    </router-link>
                </li>
                <li class="navbar-list-item navbar-list-item-current">
                    <router-link to="/employees" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -162px -1661px !important;" alt=""></div>
                        <span>Nhân viên</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/buy" href="" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -162px -1629px;" alt=""></div>
                        <span>Mua hàng</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/sell" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -205px -1629px;" alt=""></div>
                        <span>Bán hàng</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/bill" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -250px -1629px;" alt=""></div>
                        <span>Quản lý hóa đơn</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/stock" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -292px -1629px;" alt=""></div>
                        <span>Kho</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/tool" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -336px -1629px;" alt=""></div>
                        <span>Công cụ dụng cụ</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/assets" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -379px -1629px;" alt=""></div>
                        <span>Tài sản cố định</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/tax" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -424px -1629px;" alt=""></div>
                        <span>Thuế</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/price" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -468px -1629px;" alt=""></div>
                        <span>Giá thành</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/general" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -511px -1629px;" alt=""></div>
                        <span>Tổng hợp</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/budget" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -379px -1661px;" alt=""></div>
                        <span>Ngân sách</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/report" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -548px -1629px;" alt=""></div>
                        <span>Báo cáo</span>
                    </router-link>
                </li>
                <li class="navbar-list-item">
                    <router-link to="/finance" class="navbar-list-item-link">
                        <div class="svg-img svg-img-24 navbar-list-item-icon" style="background-position: -206px -1662px;" alt=""></div>
                        <span>Phân tích tài chính</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    @import '../../css/common/navbar.css';
</style>

<script>
    export default {
        name:"TheNavbar", 
        methods: {
        }
    }
</script>
