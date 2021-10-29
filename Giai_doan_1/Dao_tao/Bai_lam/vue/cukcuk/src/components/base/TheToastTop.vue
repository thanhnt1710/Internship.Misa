<template>
    <div v-if="toastTop" id="toast_top">
        <!-- <div class="toast_top-title">
            Nội dung thông báo
        </div>
        <div class="toast_top-content">
            Nội dung thông báo<br>Kiểm tra lại kết nối của bạn<br>Hoặc liên hệ với quản trị viên hệ thống
        </div>
        <div class="toast_top-footer">
            <button class="toast_top-footer">Đóng</button>
        </div> -->
    </div>
</template>

<style scoped>
    @import '../../css/common/popup_toast.css';
</style>

<script>
import { mapState } from 'vuex'
    export default {
        name: 'TheToastTop',
        computed: {
            ...mapState({
                toastTop: state => state.toastTop,
            })
        },
        updated() {
            let content = this.$store.state.toastTop[0];//Lay element đầu tiên trong mảng các thông báo
            if(content) {
                const main = document.getElementById('toast_top');
                this.$store.commit('removeToastTop');//Xóa đi element vừa lấy
                if(main) {
                    const toast_top = document.createElement('div');

                    //Auto remove toast_top
                    const autoRemoveId = setTimeout(() => {
                            main.removeChild(toast_top);
                    }, 4000);

                    //Chủ động ấn đóng 
                    toast_top.onclick = function(e) {
                        if(e.target.closest('.toast_top-footer-btn')) {
                            main.removeChild(toast_top);
                            clearTimeout(autoRemoveId);
                        }
                    }

                    toast_top.classList.add('toast_top'); 
                    toast_top.innerHTML = `
                        <div class="toast_top-title">
                            ${content.title}
                        </div>
                        <div class="toast_top-content">
                            ${content.message1}<br>${content.message2}<br>${content.message3}
                        </div>
                        <div class="toast_top-footer">
                            <button class="toast_top-footer-btn">Đóng</button>
                        </div>
                    `;
                    main.appendChild(toast_top);
                }
            }
            else {
                return;
            }
        }
    }
</script>