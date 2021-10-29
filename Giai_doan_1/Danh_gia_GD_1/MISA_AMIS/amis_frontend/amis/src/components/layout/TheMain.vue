<template>
    <div class="main-content">
        <EmployeeContent/>
        <EmployeeDetail v-if="modal"/>
        <EmployeeFooter/>
    </div>
</template>

<script>
import EmployeeContent from '../../views/dictionary/employee/EmployeeContent.vue'
import EmployeeDetail from '../../views/dictionary/employee/EmployeeDetail.vue'
import EmployeeFooter from '../../views/dictionary/employee/EmployeeFooter.vue'
import { mapState } from 'vuex'

export default {
    name: 'TheMain',
    components: {
        EmployeeContent,
        EmployeeDetail,
        EmployeeFooter,
    },
    computed: {
        ...mapState({
            modal: state => state.modal,
        }),
    },
}
</script>


<style scoped>
    @import '../../css/common/main.css';
</style>
