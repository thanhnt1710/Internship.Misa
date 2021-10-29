<template>
    <div class="navbar grid__column-2">
        <div class="navbar__header">
            <a href="" class="navbar__header-link">
                <img src="../../assets/Resource/img/toggle.png" alt="" class="navbar__header-link__img">
            </a>
            <div class="narbar__header-logo">
                <a href="" class="narbar__header-logo__link">
                    <img src="../../assets/Resource/cukcuk-logo.png" alt="" class="narbar__header-logo__img">
                </a>
            </div>
        </div>
        <div class="navbar__content">
            <ul class="navbar__list">
                <li class="navbar__list-item">
                    <div class="navbar__list-item__icon">
                        <img src="../../assets/Resource/icon/document-online.png" alt="" class="">
                    </div>
                    <a href="" class="navbar__list-item-link">Tổng quan</a>
                </li>
                <li class="navbar__list-item">
                    <div class="navbar__list-item__icon">
                        <img src="../../assets/Resource/icon/report.png" alt="" class="">
                    </div>
                    <a href="" class="navbar__list-item-link">Báo cáo</a>
                </li>
                <li class="navbar__list-item">
                    <div class="navbar__list-item__icon">
                        <img src="../../assets/Resource/icon/dashboard.png" alt="" class="">
                    </div>
                    <a href="" class="navbar__list-item-link">Mua hàng</a>
                </li>
                <li class="navbar__list-item navbar__list-item__current">
                    <div class="navbar__list-item__icon">
                        <img src="../../assets/Resource/icon/dic-employee.png" alt="" class="">
                    </div>
                    <a href="" class="navbar__list-item-link">Danh mục nhân viên</a>
                </li>
                <li class="navbar__list-item">
                    <div class="navbar__list-item__icon">
                        <img src="../../assets/Resource/icon/dic-employee.png" alt="" class="">
                    </div>
                    <a href="" class="navbar__list-item-link">Danh mục khách hàng</a>
                </li>
                <li class="navbar__list-item">
                    <div class="navbar__list-item__icon">
                        <img src="../../assets/Resource/icon/setting.png" alt="" class="">
                    </div>
                    <a href="" class="navbar__list-item-link">Thiết lập hệ thống</a>
                </li>
            </ul>
        </div>
        <div class="navbar__btn">
            <i class="navbar__btn-moveleft fas fa-chevron-left"></i>
            <i class="navbar__btn-moveright fas fa-chevron-right"></i>
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
