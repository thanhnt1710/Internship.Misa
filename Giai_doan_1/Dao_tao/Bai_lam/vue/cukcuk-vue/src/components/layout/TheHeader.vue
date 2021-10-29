<template>
    <header class="header">
        <div class="header__dropdown">
            <div class="header__dropdown-top">
                <button class="header__dropdown-btn">Nhà hàng Biển Đông</button>
                <i class="header__dropdown-icon fas fa-chevron-down"></i>
            </div>

            <div class="header__dropdown-content">
                <a class="header__dropdown__item" href="#">Nhà hàng Biển Nam</a>
                <a class="header__dropdown__item header__dropdown__item_selected" href="#">Nhà hàng Biển Đông</a>
                <a class="header__dropdown__item" href="#">Nhà hàng Biển Bắc</a>
            </div>                     
        </div>
        <div class="header__infouser">
            <div class="header__inforuser-name">
                <a class="header__inforuser-name__link">
                    <img src="../../assets/Resource/icon/avatar-default.png" alt="" class="header__inforuser-name__avatar">
                </a>
                <span>Nguyen Van ABC</span>
            </div>
            <div class="header__inforuser-option">
                <img src="../../assets/Resource/icon/option.png" alt="" class="header__inforuser-option-icon">
                <div class="header__inforuser-option-content">
                    <a href="" class="header__inforuser-option-content__item">Chi tiết tài khoản </a>
                    <a href="" class="header__inforuser-option-content__item">Thông báo</a>
                    <a href="" class="header__inforuser-option-content__item">Sửa thông tin</a>
                    <a href="" class="header__inforuser-option-content__item">Đăng xuất</a>
                </div>
            </div>

        </div>
    </header>
</template>

<style scoped>
    @import '../../css/common/header.css';
</style>

<script>
    export default {
      name: 'TheHeader',
    }
</script>