<template>
    <footer class="footer">
        <div class="footer-total">
            Tổng số: 
            <span>{{ filterPagingResult.TotalRecord }}</span>
            bản ghi
        </div>
        <div class="footer-pagination">
            <div v-on:mouseleave="hiddenPageSize" class="footer-pagination-display">
                <div class="footer-pagination-display-current" :class="{'footer-pagination-display-selected': showPageSize}">
                    <div type="text" class="footer-pagination-display-current-text">{{ currentPageSize }} bản ghi trên 1 trang</div>
                    <div v-on:click="handleShowPageSize" class="footer-pagination-display-wrapicon">
                        <div class="svg-img svg-img-16 footer-pagination-display-icon"></div>
                    </div>
                </div>
                <div v-if="showPageSize" class="footer-pagination-display-content">
                    <div class="footer-pagination-display-wrapcontent">
                        <div v-on:click="choosePageSize" value=10 class="footer-pagination-display-item" :class="{'footer-pagination-display-item-current': currentPageSize==10}">
                            <div class="footer-pagination-display-item-text">10 bản ghi trên 1 trang</div>
                        </div>
                        <div v-on:click="choosePageSize" value=20 class="footer-pagination-display-item" :class="{'footer-pagination-display-item-current': currentPageSize==20}">
                            <div class="footer-pagination-display-item-text">20 bản ghi trên 1 trang</div>
                        </div>
                        <div v-on:click="choosePageSize" value=30 class="footer-pagination-display-item" :class="{'footer-pagination-display-item-current': currentPageSize==30}">
                            <div class="footer-pagination-display-item-text">30 bản ghi trên 1 trang</div>
                        </div>
                        <div v-on:click="choosePageSize" value=50 class="footer-pagination-display-item" :class="{'footer-pagination-display-item-current': currentPageSize==50}">
                            <div class="footer-pagination-display-item-text">50 bản ghi trên 1 trang</div>
                        </div>
                        <div v-on:click="choosePageSize" value=100 class="footer-pagination-display-item" :class="{'footer-pagination-display-item-current': currentPageSize==100}">
                            <div class="footer-pagination-display-item-text">100 bản ghi trên 1 trang</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-pagination-detail">
                <div v-if="currentPages.length>0"
                    class="footer-pagination-detail-prev"
                    :class="{'footer-pagination-detail-first': currentPages[0].value==1 && currentPages[0].isSelect}"
                    v-on:click="prevPage"
                >Trước</div>
                <div v-if="currentPages.length>0" class="footer-pagination-detail-number">
                    <div 
                        v-for="page in currentPages"
                        :key="page.position ? page.position : page.value"
                        :class="{'footer-pagination-detail-number-current': page.isSelect, 'footer-pagination-detail-etc': !Number.isInteger(page.value)}"
                        v-on:click="changePage(page.value)"
                    >{{ page.value }}</div>
                </div>
                <div v-if="currentPages.length>0"
                    class="footer-pagination-detail-next"
                    :class="{'footer-pagination-detail-last': currentPages[currentPages.length-1].value==filterPagingResult.TotalPage && currentPages[currentPages.length-1].isSelect}"
                    v-on:click="nextPage"
                >Sau</div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
    @import '../../../css/common/footer.css';
    @import '../../../css/common/combobox.css'; 
</style>

<script>
import {mapState} from 'vuex'
    export default {
        name: 'EmployeeFooter',
        data() {
            return {
                //Số bản ghi 1 trang hiện tại
                currentPageSize: 10,
                
                //Trạng thái hiển thị chọn số bản ghi 1 trang
                showPageSize : false,
            }
        },
        computed: {
            ...mapState({
                filterPagingInfor: state => state.filterPagingInfor,
                filterPagingResult: state => state.filterPagingResult,
                currentPages: state => state.currentPages,
            }),
        },
        methods: {

            /**
             * Chuyển đến trang đã chọn
             * @param {Number} page trang đã chọn
             * Author: ntthanh (20/08/2021)
             */
            changePage(page){
                //Nếu bấm vào trang hiện tại hoặc bấm vào 3 dấu chấm thì k gọi api
                if(page-1 != this.filterPagingInfor.pageIndex && Number.isInteger(page)) {
                    //Thay đổi pageIndex đến trang 
                    this.$store.commit('changePageIndex', page-1);
                    //Gọi api lấy dữ liệu trang đã chọn
                    this.$store.dispatch('filterPaging');
                }
            },

            /**
             * Về trang liền trước
             * Author: ntthanh (20/08/2021)
             */
            prevPage() {
                //Số trang liền trước bằng số trang hiện tại trong pageIndex
                let page = this.filterPagingInfor.pageIndex;
                //Nếu trang hiện tại đã là trang đầu thì không làm gì cả
                if(this.filterPagingInfor.pageIndex != 0) {
                    //Thay đổi pageIndex đến trang đó
                    this.$store.commit('changePageIndex', page-1);
                    //Gọi api lấy dữ liệu trang đã chọn
                    this.$store.dispatch('filterPaging');
                }
            },

            /**
             * Sang trang tiếp theo 
             * Author: ntthanh (20/08/2021)
             */
            nextPage() {
                //Số trang kế tiếp bằng trang hiện tại trong pageIndex cộng thêm 2 
                let page = this.filterPagingInfor.pageIndex + 2;
                //Nếu trang hiện tại đã là trang cuối thì không làm gì cả
                if(page-1 < this.filterPagingResult.TotalPage) {
                    //Thay đổi pageIndex đến trang đó
                    this.$store.commit('changePageIndex', page-1);
                    //Gọi api lấy dữ liệu trang đã chọn
                    this.$store.dispatch('filterPaging');
                }
            },

            //Xử lý khi ấn để chọn hiển thị bản ghi trên 1 trang 
            //Author: ntthanh (20/08/2021)
            handleShowPageSize() {
                //Xử lý hiển thị form chọn
                this.showPageSize = !this.showPageSize;
            },

            /**
             * Xử lý khi bấm chọn 1 item thay đổi PageSize
             * @param {*} event sự kiện
             * Author: ntthanh (20/08/2021)
             */
            async choosePageSize(event) {
                let pageSize;
                if(event.target.closest('.footer-pagination-display-item').getAttribute('value')) {
                    pageSize = event.target.closest('.footer-pagination-display-item').getAttribute('value');
                }

                //Thay đổi giá trị trong input bằng giá trị vừa chọn
                //Đổi giá trị hiện tại trong form
                this.currentPageSize = pageSize;
                //Thay đổi PageSize trong store
                await this.$store.commit('changePageSize', pageSize);
                //Chọn trang đầu tiên -> thay đổi pageIndex trong store
                this.$store.commit('changePageIndex', 0);
                //Ẩn form chọn
                this.showPageSize = false;
                //Gọi api thực hiện phân trang 
                await this.$store.dispatch('filterPaging');
            },

            //Ẩn form khi rê  chuột ra ngoài
            //Author: ntthanh (20/08/2021)
            hiddenPageSize() {
                this.showPageSize = false;
            }
        }
    }
</script>