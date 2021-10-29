<template>
    <div v-if="toastRight" id="toast_right">
        <!-- <div class="toast_right toast_right--success">
            <div class="toast_right-wrap">
                <div class="toast_right-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="toast_right-content">
                    Thêm nhân viên mã MF90921 thành công
                </div>
            </div>
            <div v-on:click="hiddenToastRight" class="toast_right-icon toast_right-icon_close">
                <i class="fas fa-times"></i>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
    @import '../../css/common/popup_toast.css';
    
</style>

<script>
import { mapState } from 'vuex'
// import store from 'vuex'
    export default {
        name: 'TheToastRight',
        data() {
            return {
                
            }
        },
        computed: {
            ...mapState({
                toastRight: state => state.toastRight,
            })
            
        },
        updated() {
            let content = this.$store.state.toastRight[0];//Lay element đầu tiên trong mảng các thông báo
            if(content) {
                this.$store.commit('removeToastRight');//Xóa đi element vừa lấy
                const main = document.getElementById('toast_right');
                if(main) {
                    const toast_right = document.createElement('div');

                    //Auto remove toast_right
                    const autoRemoveId = setTimeout(() => {
                            main.removeChild(toast_right);
                    }, 4000);

                    //Chủ động nhấn đóng toast
                    toast_right.onclick = function(e) {
                        if(e.target.closest('.toast_right-icon')) {
                            main.removeChild(toast_right);
                            clearTimeout(autoRemoveId);
                        }
                    }

                    const icons = {
                        success: "fas fa-check-circle",
                        warning: "fas fa-exclamation-circle" ,
                        error: "fas fa-exclamation-triangle" 
                    }
                    const icon = icons[content.type];
    
                    toast_right.classList.add('toast_right', `toast_right--${content.type}`); 
                    toast_right.innerHTML = `
                        <div class="toast_right-wrap">
                            <div class="toast_right-icon">
                                <i class="${icon}"></i>
                            </div>
                            <div class="toast_right-content">
                                ${content.message1} ${content.message2} ${content.message3}
                            </div>
                        </div>
                        <div class="toast_right-icon toast_right-icon_close">
                            <i class="fas fa-times"></i>
                        </div>
                    `;
                    main.appendChild(toast_right);
                }
            }
            else {
                return;
            }
        },
        methods: {
        }
    }
</script>