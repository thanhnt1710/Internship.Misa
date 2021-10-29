<template>
    <div class="main grid-column-10">
        <TheHeader/>
        <EmployeeContent/>
        <EmployeeFooter/>
    </div>
</template>

<script>
import TheHeader from './TheHeader.vue'
import EmployeeContent from '../../views/dictionary/employee/EmployeeContent.vue'
import EmployeeFooter from '../../views/dictionary/employee/EmployeeFooter.vue'

export default {
    name: 'TheMain',
    components: {
        TheHeader, 
        EmployeeContent,
        EmployeeFooter,
    }
}
</script>


<style scoped>
    @import '../../css/common/main.css';
</style>
