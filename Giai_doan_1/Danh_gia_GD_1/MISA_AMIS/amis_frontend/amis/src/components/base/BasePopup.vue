<template>
    <div id="popup">

        <!-- Popup khi đóng form -->
        <div v-if="popupCancel.status" class="popup-cancel">
            <div class="popup-overlay"></div>
            <div class="popup">
                <div class="popup-content">
                    <div class="popup-content-wrapicon">
                        <div class="svg-img svg-img-48 popup-cancel-content-icon"></div>
                    </div>
                    <div class="popup-content-text">{{ popupCancel.message }}</div>
                </div>
                <div class="popup-footer">
                    <div class="popup-cancel-footer-left">
                        <button v-on:click="cancelPopupCancel" class="popup-footer-btn popup-cancel-footer-left-cancel">Hủy</button>
                    </div>
                    <div class="popup-cancel-footer-right">
                        <button v-on:click="noPopupCancel" class="popup-footer-btn popup-cancel-footer-right-no">Không</button>
                        <button v-on:click="yesPopupCancel" class="popup-footer-btn popup-cancel-footer-right-yes">Có</button>
                    </div>
                </div>
            </div> 
        </div>

        <!-- Popup khi validate -->
        <div v-if="popupValidate.status" class="popup-validate">
            <div class="popup-overlay"></div>
            <div class="popup">
                <div class="popup-content">
                    <div class="popup-content-wrapicon">
                        <div class="svg-img svg-img-48 popup-validate-content-icon"></div>
                    </div>
                    <div class="popup-content-text">{{ popupValidate.message }}</div>
                </div>
                <div class="popup-footer popup-validate-footer">
                    <button v-on:click="cancelPopupValidate" class="popup-footer-btn popup-validate-footer-cancel">Đóng</button>
                </div>
            </div>  
        </div>

        <!-- Popup khi xóa -->
        <div v-if="popupDelete.status" class="popup-delete">
            <div class="popup-overlay"></div>
            <div class="popup">
                <div class="popup-content">
                    <div class="popup-content-wrapicon">
                        <div class="svg-img svg-img-48 popup-delete-content-icon"></div>
                    </div>
                    <div class="popup-content-text">{{ popupDelete.message }}</div>
                </div>
                <div class="popup-footer">
                    <button v-on:click="noPopupDelete" class="popup-footer-btn popup-delete-footer-right-no">Không</button>
                    <button v-on:click="yesPopupDelete" class="popup-footer-btn popup-delete-footer-right-yes">Có</button>
                </div>
            </div> 
        </div>

        <!-- Popup check trùng -->
        <div v-if="popupDuplicate.status" class="popup-duplicate">
            <div class="popup-overlay"></div>
            <div class="popup">
                <div class="popup-content">
                    <div class="popup-content-wrapicon">
                        <div class="svg-img svg-img-48 popup-duplicate-content-icon"></div>
                    </div>
                    <div class="popup-content-text">{{ popupDuplicate.message }}</div>
                </div>
                <div class="popup-footer popup-duplicate-footer">
                    <button v-on:click="cancelPopupDuplicate" class="popup-footer-btn popup-duplicate-footer-cancel">Đồng ý</button>
                </div>
            </div>  
        </div>

    </div>
</template>

<style scoped>
    @import '../../css/common/popup_toast.css';
</style>

<script>
import { mapState } from 'vuex'
    export default {
        name: 'BasePopup',
        computed: {
            ...mapState({
                popupCancel: state => state.popupCancel,
                popupValidate: state => state.popupValidate,
                popupDelete: state => state.popupDelete,
                popupDuplicate: state => state.popupDuplicate,
            })
        },
        updated() {

        },
        methods: {
            //Sự kiện click popup cảnh báo đóng form chi tiết
            //Khi nhấn Hủy -> ẩn popup
            //Author: ntthanh (18/08/2021)
            cancelPopupCancel() {
                this.$store.commit('changePopupCancel',{
                    status: false,
                    message: '',
                })
            },
            //Khi nhấn Không -> ấn popup, đóng form, reset form
            //Author: ntthanh (18/08/2021)
            noPopupCancel() {
                this.$store.commit('changePopupCancel',{
                    status: false,
                    message: '',
                });
                this.$store.commit('changeModal', false);
                this.$store.commit('resetForm');//reset form
            },
            //Khi nhấn Có -> ẩn popup, thực hiện cất dữ liệu, reset form
            //Author: ntthanh (18/08/2021)
            async yesPopupCancel() {
                //Bật cờ đánh dấu lưu nhân viên
                await this.$store.commit('changeFlagSaveEmployee', true);

                await this.$store.commit('changePopupCancel',{
                    status: false,
                    message: '',
                });

                //Tắt cờ đánh dấu lưu nhân viên
                await this.$store.commit('changeFlagSaveEmployee', false);
            },

            //Sự kiện click popup thông báo validate
            //Nhấn Đóng -> ẩn popup, focus vào ô lỗi
            //Author: ntthanh (18/08/2021)
            cancelPopupValidate() {
                //Đóng popup
                this.$store.commit('changePopupValidate',{
                    status: false,
                    message: '',
                });
            },

            //Sự kiện click popup thông báo xóa nhân viên
            //Khi nhấn Không -> ẩn popup
            //Author: ntthanh (18/08/2021)
            noPopupDelete() {
                this.$store.commit('changePopupDelete',{
                    status: false,
                    message: '',
                });
            },
            //khi nhấn Có -> ẩn popup, thực hiện xóa nhân viên
            //Author: ntthanh (18/08/2021)
            yesPopupDelete() {
                this.$store.commit('changePopupDelete',{
                    status: false,
                    message: '',
                });
                this.$store.dispatch('removeEmployee');
            },

            //Sự kiên click popup thông báo trùng dữ liệu
            //Author: ntthanh (18/08/2021)
            cancelPopupDuplicate() {
                this.$store.commit('changePopupDuplicate',{
                    status: false,
                    message: '',
                });
            },
        }
    }
</script>