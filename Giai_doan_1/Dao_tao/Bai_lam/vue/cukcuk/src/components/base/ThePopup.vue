<template>
    <div v-if="popUp" id="popup">
        <!-- <div class="popup">
            <div class="popup-title">
                Nội dung cảnh báo
            </div>
            <div class="popup-content">
                <div class="popup-content-icon">
                    <i style="color: red" class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="popup-content-text">Nội dung cảnh báo Nội dung cảnh báo Nội dung cảnh báo Nội dung cảnh báo Nội dung cảnh báo</div>
            </div>
            <div class="popup-footer">
                <button class="popup-footer-cont">Tiếp tục nhập</button>
                <button style="background-color: green" class="popup-footer-cancel">Đóng</button>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
    @import '../../css/common/popup_toast.css';
</style>

<script>
import { mapState } from 'vuex'
    export default {
        name: 'ThePopup',
        computed: {
            ...mapState({
                popUp: state => state.popUp,
            })
        },
        updated() {
            let content = this.$store.state.popUp[0];//Lay element đầu tiên trong mảng các thông báo
            if(content) {
                const main = document.getElementById('popup');
                this.$store.commit('removePopUp');//Xóa đi element vừa lấy
                if(main) {
                    let html = `
                        <div class="popup">
                            <div class="popup-title">
                                ${content.title}
                            </div>
                            <div class="popup-content">
                                <div class="popup-content-icon">
                                    <i style="color: ${content.color}" class="fas fa-exclamation-triangle"></i>
                                </div>
                                <div class="popup-content-text">${content.message1}<br>${content.message2}</div>
                            </div>
                            <div class="popup-footer">
                                <button class="popup-footer-cont">${content.content_btn1}</button>
                                <button style="background-color: ${content.color}" class="popup-footer-cancel">${content.content_btn2}</button>
                            </div>
                        </div>
                    `;
                    main.innerHTML = html;        
                }
                //Nếu nhấn hủy
                document.querySelector('.popup').onclick = function(e) {
                    if(e.target.closest('.popup-footer-cont')) {
                        main.innerHTML = '';//Xoa popup khoi DOM
                    }
                }

                //Nếu nhấn btn thứ 2, kiểm tra xem xóa, hay đóng form, ... bằng cờ đính kèm content 
                document.querySelector('.popup-footer-cancel').onclick = () => {
                    if(content.flag == "flagRemoveEmployee") {// Neu an de xoa
                        this.$store.commit('changeFlagPopUp', content.flag);//Bật cờ xóa
                        main.innerHTML = '';//Xoa popup khoi DOM
                    }
                    if(content.flag == "flagHiddenModal") {//Neu ấn để dóng form 
                        this.$store.commit('hiddenModal');
                        this.$store.commit('resetForm');//reset form
                        main.innerHTML = '';//Xoa popup khoi DOM
                    }
                }
            }
            else {
                return
            }
        },
        mounted() {
        },
        methods: {
            
        }
    }
</script>