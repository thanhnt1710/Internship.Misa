<template>
    <header class="header">
        <div class="header-dropdown">
            <div class="header-dropdown-top">
                <button class="header-dropdown-btn">Nhà hàng Biển Đông</button>
                <i class="header-dropdown-icon fas fa-chevron-down"></i>
            </div>

            <div class="header-dropdown-content">
                <a class="header-dropdown-item" href="#">Nhà hàng Biển Nam</a>
                <a class="header-dropdown-item header-dropdown-item_selected" href="#">Nhà hàng Biển Đông</a>
                <a class="header-dropdown-item" href="#">Nhà hàng Biển Bắc</a>
            </div>                     
        </div>
        <div class="header-infouser">
            <div class="header-inforuser-name">
                <a class="header-inforuser-name-link">
                    <img src="../../assets/Resource/icon/avatar-default.png" alt="" class="header-inforuser-name-avatar">
                </a>
                <span>Nguyen Van ABC</span>
            </div>
            <div class="header-inforuser-option">
                <img src="../../assets/Resource/icon/option.png" alt="" class="header-inforuser-option-icon">
                <div class="header-inforuser-option-content">
                    <a href="" class="header-inforuser-option-content-item">Chi tiết tài khoản </a>
                    <a href="" class="header-inforuser-option-content-item">Thông báo</a>
                    <a href="" class="header-inforuser-option-content-item">Sửa thông tin</a>
                    <a href="" class="header-inforuser-option-content-item">Đăng xuất</a>
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