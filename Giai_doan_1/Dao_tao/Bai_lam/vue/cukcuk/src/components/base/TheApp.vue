<template>
    <div class="app grid-fullwidth"> 
        <div class="container grid-row">
            <TheNavbar/>
            <TheMain/>
        </div>
        <TheModal/>
        <ThePopup/>
        <TheToastTop/>
        <TheToastRight/>
    </div>
</template>

<style scoped>
    @import '../../css/common/main.css';
    @import '../../css/common/combobox.css';
</style>

<script>
import TheNavbar from '../layout/TheNavbar.vue'
import TheMain from '../layout/TheMain.vue'
import TheModal from './TheModal.vue'
import ThePopup from './ThePopup.vue'
import TheToastTop from './TheToastTop.vue'
import TheToastRight from './TheToastRight.vue'
export default {
    name: 'TheApp',
    components: {
        TheNavbar,
        TheMain,
        TheModal,
        ThePopup,
        TheToastTop,
        TheToastRight,
    }
}
</script>