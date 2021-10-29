<template>
  <div v-on:mouseover="handleEmployeeContent" class="content">
    <div class="title">
        <div class="title-name">Danh sách nhân viên</div>
        <button v-on:click="addEmployee" id="btnAdd" class="title-btn">
            <img src="../../../assets/Resource/icon/add.png" alt="" class="title-btn-img">
            <div>Thêm nhân viên</div>
        </button>
    </div>
    <div class="search">
        <div class="search-left">
            <div class="search-left-search search-left-format">
                <img v-on:click="filter" src="../../../assets/Resource/icon/search.png" alt="">
                <input type="text" placeholder="Tìm kiếm theo mã, Tên hoặc Số điện thoại">
            </div>
            <div v-on:mouseleave="hiddenCombobox" class="combobox combobox-search search-left-department search-left-format">
                <button v-on:click="clickCombobox" class="combobox-top search-left-format-current">
                    <input 
                      v-model="this.$store.state.departmentSelected.DepartmentName"
                      v-on:keyup="keyboardCombobox($event)"
                      class="departmentName" 
                      fieldName="DepartmentName" 
                      fieldId="DepartmentId" 
                      v-bind:valueId="this.$store.state.departmentSelected.DepartmentId"
                    >
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="department combobox-content search-left-format-content">
                  <div v-for="department in this.departments" 
                      v-bind:key="department.DepartmentId" 
                      v-bind:valueId="department.DepartmentId"
                      v-bind:class="{'combobox-content-current': department.isSelect}"
                      v-on:click="selectItemCombobox($event, 'department', department.DepartmentId)"
                  >
                      <i class="fas fa-check"></i>
                      <span>{{ department.DepartmentName }}</span>
                  </div>
                </div>
            </div>
            <div v-on:mouseleave="hiddenCombobox" class="combobox combobox-search search-left-position search-left-format">
                <button v-on:click="clickCombobox" class="combobox-top search-left-format-current">
                    <input 
                      v-model="this.$store.state.positionSelected.PositionName"
                      class="positionName" 
                      fieldName="PositionName" 
                      fieldId="PositionId" 
                      v-bind:valueId="this.$store.state.positionSelected.PositionId"
                    >
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="position combobox-content search-left-format-content">
                  <div v-for="position in this.positions" 
                      v-bind:key="position.PositionId" 
                      v-bind:valueId="position.PositionId"
                      v-bind:class="{'combobox-content-current': position.isSelect}"
                      v-on:click="selectItemCombobox($event, 'position', position.PositionId)"
                  >
                      <i class="fas fa-check"></i>
                      <span>{{ position.PositionName }}</span>
                  </div>
                </div>
            </div>
        </div>
        <div class="search-right">
            <button v-on:click="removeEmployee" id="btnRemove" class="search-right-btn">
                <i class="far fa-trash-alt"></i>
            </button>
            <button v-on:click="refresh" id="btnRefresh" class="search-right-btn">
                <img src="../../../assets/Resource/icon/refresh.png" alt="" class="search-right-btn-img">
            </button>
        </div>
    </div>
    <div class="contentdetail">
        <table class="contentdetail-table" cellspacing="0">
            <thead>
                <tr>
                    <!-- <th></th>
                    <th>#</th> -->
                    <th fieldName="EmployeeCode" formatType="">Mã nhân viên</th>
                    <th fieldName="FullName" formatType="">Họ và tên</th>
                    <th fieldName="GenderName" formatType="Gender">Giới tính</th>
                    <th fieldName="DateOfBirth" formatType="ddmmyyyy">Ngày sinh</th>
                    <th fieldName="PhoneNumber" formatType="">Số điện thoại</th>
                    <th fieldName="Email" formatType="">Email</th>
                    <th fieldName="PositionName" formatType="">Vị trí</th>
                    <th fieldName="DepartmentName" formatType="">Phòng ban</th>
                    <th fieldName="Salary" formatType="Money">Tiền lương</th>
                    <th fieldName="Address" formatType="">Địa chỉ</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="employee in this.$store.state.employees" 
                  v-bind:employeeId="employee.EmployeeId" 
                  v-bind:employeeCode="employee.EmployeeCode" 
                  v-bind:key="employee.EmployeeId" 
                  v-on:click="toggleRemove(employee.EmployeeId)" 
                  v-bind:class="{'remove': remove.includes(employee.EmployeeId)}" 
                  v-on:dblclick="editEmployee(employee.EmployeeId)"
              >
                <td v-bind:title="employee.EmployeeCode">
                  {{ employee.EmployeeCode }}
                </td>
                <td v-bind:title="employee.FullName">{{ employee.FullName }}</td>
                <td v-bind:title="formatGender(employee.Gender)">{{ formatGender(employee.Gender) }}</td>
                <td 
                  v-bind:title="formatDDMMYYY(employee.DateOfBirth)"
                  v-bind:style="{ 'text-align': 'center' }"
                >
                  {{ formatDDMMYYY(employee.DateOfBirth) }}
                </td>
                <td 
                  v-bind:title="employee.PhoneNumber"
                  v-bind:style="{ 'text-align': 'center' }"
                >
                  {{ employee.PhoneNumber }}
                </td>
                <td v-bind:title="employee.Email">{{ employee.Email }}</td>
                <td v-bind:title="employee.PositionName">
                  {{ employee.PositionName }}
                </td>
                <td v-bind:title="employee.DepartmentName">
                  {{ employee.DepartmentName }}
                </td>
                <td 
                  v-bind:title="formatMoney(employee.Salary)"
                  v-bind:style="{ 'text-align': 'right' }"
                >{{ formatMoney(employee.Salary) }}</td>
                <td v-bind:title="employee.Address">{{ employee.Address }}</td>
              </tr>
            </tbody>
        </table>
    </div>
  </div> 
  
</template>

<style scoped>
@import "../../../css/page/employee.css";
@import "../../../css/common/combobox.css";
</style>

<script>
// import $ from 'jquery'
import {mapState} from 'vuex'
// import {mapMutations} from 'vuex'
// import { mapActions } from 'vuex'
import { Format } from '../../../js/common/common'
export default {
  name: "EmployeeContent",
  mixins: [Format],
  components: {

  },
  data() {
    return {
      remove: [],//Mang luu cac key tr se bi xoa
    }
  },
  created() {
    this.$store.dispatch('getDepartment');
    this.$store.dispatch('getPosition');
    this.$store.dispatch('getEmployees');
  },
  computed: {
    ...mapState({
      departments: state => state.department,
      positions: state => state.position,
    }),
  },
  props: {

  },
  methods: {
    //Khi them moi
    addEmployee() {
      this.$store.dispatch('getEmployeeCode');
      this.$store.commit('setFormModeAdd');//Xét formMode là thêm nhân viên 
      this.$store.commit('resetForm');//reset form
      this.$store.commit('showModal');
    },

    //Khi dbclick de sua thong tin
    editEmployee(employeeId) {
      this.$store.dispatch('getEmployeeById', employeeId);
      this.$store.commit('setFormModeEdit'); //Set formMode là sửa nhân viên 
      setTimeout(() => {// Đợi lấy dữ liệu về build lên form 
        this.$store.commit('showModal');
      }, 100); 
    },
    toggleRemove(Id) {
      const index = this.remove.indexOf(Id);
      if (index > -1) {
        this.remove.splice(index, 1);
      }  
      else {
        this.remove.push(Id);
      }
    },
    removeEmployee(event) {
      let removes = event.target.closest('.content').querySelectorAll('.remove');
      if(removes.length > 0) {
        this.$store.commit('addPopUp', { 
          title: "Cảnh báo",
					message1:	"Bạn có chắc muốn xóa những nhân viên đã chọn không?",
					message2:	"Mọi dữ liệu về những nhân viên này sẽ bị xóa vĩnh viễn!",
					content_btn1:	"Hủy", 
					content_btn2:	"Xóa", 
					color:	"red",
          flag: "flagRemoveEmployee",
        });
      }
      else {
        this.$store.commit('addToastTop',{
          title: `Thông báo`,
          message1: `Chưa chọn ai để xóa!`,
          message2: `Vui lòng kiểm tra lại`,
          message3: ``
        });
      }
    },
    //Xu ly xoa nhan vien
    handleEmployeeContent() {
      if(this.$store.state.flagPopUp.flagRemoveEmployee) {
        let removes = document.querySelectorAll('.remove');
        let employees = [];//Mang thong tin cac nhan vien se xoa
        for(let i=0; i<removes.length; i++) {
          let employeeId = removes[i].getAttribute('employeeId');
          let employeeCode = removes[i].getAttribute('employeeCode');
          let employee = {
            'employeeId': employeeId,
            'employeeCode' : employeeCode
          }
          employees.push(employee);
        }
        this.$store.commit('addEmployeeRemove', employees);//Them thong tin nv se xoa vao store
        this.$store.dispatch('removeEmployees');//Xoa 

        this.$store.commit('changeFlagPopUp', 'flagRemoveEmployee');//Tắt cờ xóa
      }
    },
    //Tai lai du lieu
    refresh() {
      this.$store.dispatch('getEmployees');
    },

    //click hien Combobox
    clickCombobox(e) {
      let combobox = e.target.closest('.combobox');
      //Hien thi combobox
      combobox.querySelector('.combobox-content').style.display = 'block';
      //Hien Border 
      combobox.style.border = '1px solid var(--default-color)';
    },

    //An combobox
    hiddenCombobox(e) {
      let comboboxContent = e.target.querySelector('.combobox-content');
      //An Border 
      comboboxContent.closest('.combobox').style.border = 'var(--border)';
      // An combobox
      comboboxContent.style.display = 'none';
    },
    
    //Khi chon item combobox
    selectItemCombobox(e, key, id) {
        e.target.closest('.combobox-content').style.display = 'none';
        //obj luu thong tin thay doi store
        let inforItem = {
          key: key,// position, department, ...
          id: id,
        }
        //Thay doi item select trong store
        this.$store.commit('selectItemCombobox', inforItem);
    }, 

    keyboardCombobox(e) {
      console.log(e.keyCode);
    },

    //filter
    filter() {
      let inforFilter = {
        pageSize: 20, 
        pageNumber: 1, 
        employeeFilter: 'NV',
        departmentId: this.$store.state.departmentSelected.DepartmentId,
        positionId: this.$store.state.positionSelected.PositionId,
      };
      this.$store.dispatch('filter', inforFilter);
    },
  },
};
</script>