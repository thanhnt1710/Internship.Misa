<template>
  <div class="content">
    <div class="title">
        <div class="title-name">Nhân viên</div>
        <button v-on:click="addEmployee" id="btnAdd" class="title-btn">
            <div>Thêm mới nhân viên</div>
        </button>
    </div>
    <div class="wrap-content">
      <div class="content-header">
          <div class="search">
              <input 
                ref="employeeFilter"
                type="text" 
                placeholder="Tìm theo mã, tên, số điện thoại"
                @blur="blurSearch"
                @focus="focusSearch"
                @keyup.enter="search"
              >
              <div v-on:click="search" class="svg-img svg-img-16 search-icon"></div>
          </div>
          <div v-on:click="refresh" id="btnRefresh" class="refresh">
            <div class="svg-img svg-img-24 refresh-icon"></div>
          </div>
      </div>
      <div class="content-detail">
          <table class="content-detail-table" cellspacing="0">
              <thead>
                  <tr>
                      <th class="content-detail-table-overlay"></th>
                      <th class="checkbox">
                        <span class="checkbox-wrap checkbox-selected">
                          <div class="svg-img checkbox-icon"></div>
                        </span>
                      </th>
                      <th fieldName="EmployeeCode">Mã nhân viên</th>
                      <th fieldName="EmployeeName">Tên nhân viên</th>
                      <th fieldName="DepartmentName">Tên đơn vị</th>
                      <th fieldName="EmployeePosition">Chức danh</th>
                      <th fieldName="DateOfBirth" formatType="ddmmyyyy">Ngày sinh</th>
                      <th fieldName="Gender" formatType="Gender">Giới tính</th>
                      <th fieldName="IdentityNumber">Số CMND</th>
                      <th fieldName="IdentityDate" formatType="ddmmyyyy">Ngày cấp</th>
                      <th fieldName="IdentityPlace">Nơi cấp</th>
                      <th fieldName="PhoneNum ber">ĐT di động</th>
                      <th fieldName="TelephoneNumber">ĐT cố định</th>
                      <th fieldName="Email">Email</th>
                      <th fieldName="BankAccountNumber">Số tài khoản</th>
                      <th fieldName="BankName">Tên ngân hàng</th>
                      <th fieldName="BankBranchName">Chi nhánh ngân hàng</th>
                      <th fieldName="Address">Địa chỉ</th>
                      <th class="content-detail-table-function">Chức năng</th>
                  </tr>
              </thead>
              <tbody v-show="!loading">
                <tr v-for="employee in this.$store.state.employees" 
                    :employeeCode="employee.EmployeeCode" 
                    :key="employee.EmployeeId" 
                    v-on:dblclick="editEmployee(employee.EmployeeId)"
                >
                  <td class="content-detail-table-overlay"></td>
                  <td class="checkbox">
                    <span class="checkbox-wrap">
                      <div class="svg-img checkbox-icon"></div>
                    </span>
                  </td>

                  <td :title="employee.EmployeeCode">
                    <span>{{ employee.EmployeeCode }}</span>
                  </td>

                  <td :title="employee.EmployeeName">
                    <span>{{ employee.EmployeeName }}</span>
                  </td>

                  <td :title="employee.DepartmentName">
                    <span>{{ employee.DepartmentName }}</span>
                  </td>

                  <td :title="employee.EmployeePosition">
                    <span>{{ employee.EmployeePosition }}</span>
                  </td>

                  <td :title="formatDate(employee.DateOfBirth)" :style="{ 'text-align': 'center', 'padding': 0 }">
                    <span>{{ formatDate(employee.DateOfBirth) }}</span>
                  </td>

                  <td :title="formatGender(employee.Gender)">
                    <span>{{ formatGender(employee.Gender) }}</span>
                  </td>

                  <td :title="employee.IdentityNumber">
                    <span>{{ employee.IdentityNumber }}</span>
                  </td>

                  <td :title="formatDate(employee.IdentityDate)" :style="{ 'text-align': 'center', 'padding': 0 }">
                    <span>{{ formatDate(employee.IdentityDate) }}</span>
                  </td>

                  <td :title="employee.IdentityPlace">
                    <span>{{ employee.IdentityPlace }}</span>
                  </td>

                  <td :title="employee.PhoneNumber">
                    <span>{{ employee.PhoneNumber }}</span>
                  </td>

                  <td :title="employee.TelephoneNumber">
                    <span>{{ employee.TelephoneNumber }}</span>
                  </td>

                  <td :title="employee.Email">
                    <span>{{ employee.Email }}</span>
                  </td>

                  <td :title="employee.BankAccountNumber">
                    <span>{{ employee.BankAccountNumber }}</span>
                  </td>

                  <td :title="employee.BankName">
                    <span>{{ employee.BankName }}</span>
                  </td>

                  <td :title="employee.BankBranchName">
                    <span>{{ employee.BankBranchName }}</span>
                  </td>

                  <td :title="employee.Address">
                    <span>{{ employee.Address }}</span>
                  </td>

                  <td class="content-detail-table-function">
                    <div class="function">
                      <div class="function-wrap">
                        <button v-on:click="editEmployee(employee.EmployeeId)" class="function-btn function-btn-edit">
                          <div class="function-btn-edit-text">Sửa</div>
                        </button>
                        <button v-on:click="showFunction" v-click-outside="hideFunction" class="function-btn function-btn-dropdown">
                          <div class="svg-img function-dropdown-icon"></div>
                          <div class="function-dropdown-content">
                            <div v-on:click="replicaEmployee(employee.EmployeeId)" class="function-dropdown-item">
                              <div class="function-dropdown-item-text">Nhân bản</div>
                            </div>
                            <div v-on:click="removeEmployee(employee.EmployeeId, employee.EmployeeCode)" class="function-dropdown-item">
                              <div class="function-dropdown-item-text">Xóa</div>
                            </div>
                            <div class="function-dropdown-item">
                              <div class="function-dropdown-item-text">Ngừng sử dụng</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
          </table> 
      </div>
       <div v-show="loading" id="loading">
          <div class="loading-overlay"></div>
          <div class="loading-icon">
              <object :data="loaderUrl"></object>
          </div>
        </div>
    </div>
  </div> 
  
</template>

<style scoped>
@import "../../../css/page/employee.css";
@import "../../../css/common/combobox.css";
@import "../../../css/common/loading.css";
@import "../../../css/common/checkbox.css";
</style>

<script>
// import $ from 'jquery'
import {mapState} from 'vuex'
// import {mapMutations} from 'vuex'
// import { mapActions } from 'vuex'
import { Format } from '../../../js/common/common'
import vClickOutside from 'v-click-outside'

export default {
  name: "EmployeeContent",
  mixins: [Format],
  components: {

  },
  data() {
    return {
      remove: [],//Mang luu cac key tr se bi xoa

      //Loading
      loaderUrl: require('../../../assets/loading.svg'),

      //Xủ lý đóng context menu
      hideFunction: {
        handler: this.handlerHideFunction,//Xử lý đóng tại hàm này
        middleware: this.middlewareHideFunction,//Hàm trên đc thực thi khi hàm này trả về true
        events: ['dblclick', 'click'],
        isActive: true,
        detectIFrame: true
      }
    }
  },
  directives: {//Thư viện click outsize
    clickOutside: vClickOutside.directive
  },
  created() {
    //Lấy mã nhân viên mới
    this.$store.dispatch('getEmployeeCode');
    //Lấy thông tin đơn vị 
    this.$store.dispatch('getDepartment');
    //Lấy dữ liệu lọc phân trang để hiển thị
    this.$store.dispatch('filterPaging');
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      filterPagingInfor: state => state.filterPagingInfor,
      filterPagingResult: state => state.filterPagingResult,
    }),
  },
  props: {

  },
  methods: {

    //Xử lý khi ấn btn mũi tên trong chức năng
    showFunction(e) {
      //Thẻ td chứa toàn bộ ô chức năng đó
      let tagFunction = e.target.closest('.content-detail-table-function');
      //Thẻ chứa context menu 
      let tagContextMenu = tagFunction.querySelector('.function-dropdown-content');
      //Thẻ icon context menu 
      let tagIconContextMenu = tagFunction.querySelector('.function-dropdown-icon')

      //Nếu đang ẩn thì hiện và có border
      if(tagContextMenu.style.display == 'none' || tagContextMenu.style.display == '') {
        tagContextMenu.style.display = 'block';
        tagFunction.style.zIndex = "2";
        tagIconContextMenu.classList.add("function-dropdown-icon-selected");
      }
      else {//Nếu đang hiện thì ẩn và bỏ border
        tagContextMenu.style.display = 'none';
        tagFunction.style.removeProperty('z-index');
        tagIconContextMenu.classList.remove("function-dropdown-icon-selected");
      }
    },

    //hàm xử lý đóng contextmenu
    handlerHideFunction (e) {
      if(e.target.closest('.app')) {
        //NodeList thẻ td chứa toàn bộ các ô chức năng
        let tagFunctions = e.target.closest('.app').querySelectorAll('tbody .content-detail-table-function');
        //duyệt qua các thẻ td
        for (const tagFunction of tagFunctions) {
          //Thẻ chứa context menu của td đang duyệt
          let tagContextMenu = tagFunction.querySelector('.function-dropdown-content');
          let tagIconContextMenu = tagFunction.querySelector('.function-dropdown-icon');
          //Nếu đang hiện thì ẩn và bỏ border icon
          if(tagContextMenu.style.display == 'block') {
            tagContextMenu.style.display = 'none';
            tagFunction.style.removeProperty('z-index');
            tagIconContextMenu.classList.remove("function-dropdown-icon-selected");
          }
        }
      }
    },

    //Hàm điều kiện có thực thi hàm handlerHideFunction hay không
    //return: true -> gọi hàm handlerHideFunction
    //return: false -> bỏ qua
    middlewareHideFunction(e) {
      //Nếu click ra ngoài vùng contextmenu và không ấn vào btn mũi tên context menu -> trả về true
      return !e.target.closest('.function-dropdown-content') && !e.target.className.includes('function-dropdown-icon');
    },

    //Khi them moi
    addEmployee() {
      this.$store.commit('resetForm');
      this.$store.dispatch('getEmployeeCode');//Lấy mã nhân viên mới
      this.$store.commit('setFormModeAdd');//Xét formMode là thêm nhân viên 
      setTimeout(() => {
        this.$store.commit('changeModal', true);//Hiện modal
      }, 200)
    },

    //Khi dbclick hoặc ấn Sửa để sửa thông tin
    editEmployee(employeeId) {
      this.$store.dispatch('getEmployeeById', employeeId);
      this.$store.commit('setFormModeEdit'); //Set formMode là sửa nhân viên 
      this.$store.commit('changeModal', true);//Hiện modal
    },

    //Khi ấn nhân bản
    replicaEmployee(employeeId) {
      this.$store.dispatch('getEmployeeCode');//Lấy mã nhân viên mới
      this.$store.dispatch('getEmployeeById', employeeId);
      this.$store.commit('setFormModeReplica'); //Set formMode là nhân bản nhân viên 
      this.$store.commit('resetForm');
      this.$store.commit('changeModal', true);
    },

    //Khi ấn xóa
    removeEmployee(employeeId, employeeCode) {
        let employeeRemove = {
          employeeId: employeeId,
          employeeCode: employeeCode,
        };
        this.$store.commit('setEmployeeRemove', employeeRemove);
        this.$store.commit('changePopupDelete',{
          status: true,
          message: `Bạn có chắc chắn muốn xóa nhân viên <${employeeCode}> không?`,
        });
    },

    //Tai lai du lieu
    refresh() {
      //Khi reload chuyển về trang đầu
      this.$store.commit('changePageIndex', 0);
      //Gọi api lấy dữ liệu trang đã chọn
      this.$store.dispatch('filterPaging');
    },

    //khi focus ô input tìm kiếm -> hiện border 
    focusSearch(e) {
      e.target.closest('.search').style.border = '1px solid var(--default-color)';
    },

    //blur ô input tìm kiếm -> ẩn border
    blurSearch(e) {
      e.target.closest('.search').style.border = '1px solid #babec5';
    },

    //lọc 
    search() {
      if(!this.$refs.employeeFilter.value.trim() == '') {//Nếu k nhập k thì k gọi api
        //Commit thông tin lên store
        this.$store.commit('changeEmployeeFilter', this.$refs.employeeFilter.value);
        //thực hiện lọc
        this.$store.dispatch('filterPaging');
      }
    },
  },
};
</script>