<template>
    <footer class="footer">
        <div class="footer-display">
            Hiển thị 
            <span>1-10/1000</span>
            nhân viên
        </div>
        <div class="footer-pagination">
            <img src="../../../assets/Resource/icon/btn-firstpage.svg" alt="" class="footer-pagination-btn">
            <img src="../../../assets/Resource/icon/btn-prev-page.svg" alt="" class="footer-pagination-btn">
            <div class="footer-pagination-number">
                <a href="" class="footer-pagination-number-current">1</a>
                <a href="">2</a>
                <a href="">3</a>
                <a href="">4</a>
                <a href="">5</a>
            </div>
            <img src="../../../assets/Resource/icon/btn-next-page.svg" alt="" class="footer-pagination-btn">
            <img src="../../../assets/Resource/icon/btn-lastpage.svg" alt="" class="footer-pagination-btn">
        </div>
        <div class="footer-displayonce">
            <span>10</span> nhân viên/trang
        </div>
    </footer>
</template>

<style scoped>
    @import '../../../css/page/employee.css';
    @import '../../../css/common/combobox.css'; 
</style>

<script>
    export default {
      name: 'EmployeeFooter',
    }
</script>