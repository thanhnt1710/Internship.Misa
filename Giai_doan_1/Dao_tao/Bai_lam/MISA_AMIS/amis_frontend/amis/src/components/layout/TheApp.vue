<template>
    <div class="app grid-fullwidth"> 
        <div class="container grid-row">
            <TheNavbar/>
            <div class="main grid-column-right">
                <TheHeader/>
                <TheMain/>
            </div>
        </div>
        <BasePopup/>
        <BaseToastTop/>
        <BaseToastRight/>
    </div>
</template>

<style scoped>
    @import '../../css/common/main.css';
    @import '../../css/common/combobox.css';
</style>

<script>
import TheHeader from '../layout/TheHeader.vue'
import TheNavbar from '../layout/TheNavbar.vue'
import TheMain from '../layout/TheMain.vue'
// import TheModal from './TheModal.vue'
import BasePopup from '../base/BasePopup.vue'
import BaseToastTop from '../base/BaseToastTop.vue'
import BaseToastRight from '../base/BaseToastRight.vue'
export default {
    name: 'TheApp',
    components: {
        TheHeader,
        TheNavbar,
        TheMain,
        BasePopup,
        BaseToastTop,
        BaseToastRight,
    }
}
</script>